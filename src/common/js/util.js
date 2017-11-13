import moment from 'moment';

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding (s, len) {
  len = len - (s + '').length;
  for (var i = 0; i < len; i++) {
    s = '0' + s;
  }
  return s;
}
function Filter (str) {
  var RexStr = /<|>|"|'|&/g
  str = str.replace(RexStr, function (MatchStr) {
    switch (MatchStr) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case '\'':
        return '&#39;';
      case '&':
        return '&amp;';
      default:
        break;
    }
  })
  return str;
}

export default {
  getQueryStringByName: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    var context = '';
    if (r !== null) context = r[2];
    reg = null;
    r = null;
    return context === null || context === '' || context === 'undefined' ? '' : context;
  },
  formatDate: {
    format: function (date, pattern) {
      if (!date) return ''
      if (typeof date === 'number' || typeof date === 'string') {
        date = new Date(date)
      }
      pattern = pattern || DEFAULT_PATTERN;
      try {
        return pattern.replace(SIGN_REGEXP, function ($0) {
          switch ($0.charAt(0)) {
            case 'y':
              return padding(date.getFullYear(), $0.length);
            case 'M':
              return padding(date.getMonth() + 1, $0.length);
            case 'd':
              return padding(date.getDate(), $0.length);
            case 'w':
              return date.getDay() + 1;
            case 'h':
              return padding(date.getHours(), $0.length);
            case 'm':
              return padding(date.getMinutes(), $0.length);
            case 's':
              return padding(date.getSeconds(), $0.length);
          }
        });
      } catch (e) {
        return date
      }
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP);
      var matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length === matchs2.length) {
        var _date = new Date(1970, 0, 1);
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i]);
          var sign = matchs1[i];
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int);
              break;
            case 'M':
              _date.setMonth(_int - 1);
              break;
            case 'd':
              _date.setDate(_int);
              break;
            case 'h':
              _date.setHours(_int);
              break;
            case 'm':
              _date.setMinutes(_int);
              break;
            case 's':
              _date.setSeconds(_int);
              break;
          }
        }
        return _date;
      }
      return null;
    }
  },
  // 过滤直接移除HTML标签 formData: Object
  xssRemove (formData) {
    var regEx = /<[^>]*>/g;
    for (let i in formData) {
      if (typeof formData[i] === 'string') formData[i] = formData[i].replace(regEx, '')
    }
    return formData
  },
  // 过滤替换特殊字符 formData: Object
  xssFilter (formData) {
    for (let i in formData) {
      if (formData[i] === '') { // 适应后端接口奇葩需求，删除空值对象
        delete formData[i]
        continue
      }
      if (typeof formData[i] === 'string') formData[i] = Filter(formData[i])
    }
    return formData
  },
  formatTime (time, format = 'YYYY-MM-DD') {
    if (time) {
      return moment(time).format(format);
    }
    return time;
  },
  formatJson (json, options) {
    var reg = null
    var formatted = ''
    var pad = 0
    var PADDING = '    ' // one can also use '\t' or a different number of spaces

    // optional settings
    options = options || {};
    // remove newline where '{' or '[' follows ':'
    // options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    // use a space after a colon
    // options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

    // begin formatting...
    if (typeof json !== 'string') {
      // make sure we start with the JSON as a string
      json = JSON.stringify(json);
    } else {
      // is already a string, so parse and re-stringify in order to remove extra whitespace
      json = JSON.parse(json);
      json = JSON.stringify(json);
    }

    // add newline before and after curly braces
    reg = /([{}])/g;
    json = json.replace(reg, '\r\n$1\r\n');

    // add newline before and after square brackets
    reg = /([[]])/g;
    json = json.replace(reg, '\r\n$1\r\n');

    // add newline after comma
    reg = /(,)/g;
    json = json.replace(reg, '$1\r\n');

    // remove multiple newlines
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');

    // remove newlines before commas
    reg = /\r\n,/g;
    json = json.replace(reg, ',');

    // optional formatting...
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
      reg = /:\r\n{/g;
      json = json.replace(reg, ':{');
      reg = /:\r\n\[/g;
      json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
      reg = /:/g;
      json = json.replace(reg, ': ');
    }
    let jsonArr = json.split('\r\n')
    for (var node of jsonArr) {
      var i = 0;
      var indent = 0;
      var padding = '';
      if (node.match(/\{$/) || node.match(/\[$/)) {
        indent = 1;
      } else if (node.match(/\}/) || node.match(/\]/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else {
        indent = 0;
      }
      for (i = 0; i < pad; i++) {
        padding += PADDING;
      }
      formatted += padding + node + '\r\n';
      pad += indent;
    }
    return formatted;
  },
  cookie: {
    set: function (name, value, days) {
      let d = new Date();
      let hostname = window.location.hostname
      let hostArr = hostname.split('.')
      let domain = hostArr.length < 3 ? hostname : (hostArr.splice(0, 1), hostArr.join('.'))
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
      window.document.cookie = name + '=' + value + ';path=/;domain=' + domain + ';expires=' + d.toGMTString();
    },
    get: function (name) {
      let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? v[2] : null;
    },
    delete: function (name) {
      this.set(name, '', -1);
    }
  },
// formtype: {
//  text: 单行文本
//  textarea: 多行文本
//  number: 数字
//  datetime: 日期
//  combo: 下拉框
//  image: 图片
//  separator: 分割线
//  subform: 子表单
//  usergroup: 成员多选
//  deptgroup: 部门多选
//  username: 填报人姓名
//  usertel: 填报人手机号
// // combocheck: 下拉复选框
// // radiogroup: 单选按钮组
// // checkboxgroup: 复选框组
// }
  renderForm: {
    WPconfig: {},
    WPfactory: {
      text: () => {

      }
    }
  }
};
