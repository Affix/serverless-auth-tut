var $ = {
  addClass: function(elem, name) {
    var classes = elem.className.split(' '),
      cIndex = classes.indexOf(name);
    if (cIndex === -1) {
      classes.push(name);
    }
    elem.className = classes.join(' ');
    return this;
  },

  removeClass: function(elem, name) {
    var classes = elem.className.split(' '),
      cIndex;

    function recursive() {
      cIndex = classes.indexOf(name);
      if (cIndex >= 0) {
        classes.splice(cIndex, 1);
        recursive();
      }
    }
    recursive();
    elem.className = classes.join(' ');
    return this;
  },

  inputFocus: function(input, label) {
    var _this = this;
    input.addEventListener('focus', function() {
      _this.addClass(label, 'active')
        .addClass(label, 'transition')
        .removeClass(label, 'inactive');
    });
    return this;
  },

  inputBlur: function(input, label) {
    var _this = this;
    input.addEventListener('blur', function() {
      if (this.value === '') {
        _this.addClass(label, 'inactive')
          .addClass(label, 'transition')
          .removeClass(label, 'active');
      }
    });
    return this;
  }

};

window.onload = function() {
  var labels = document.getElementsByTagName('label'),
    id = '',
    label,
    input,
    type;
  for (var i = 0, x = labels.length; i < x; i++) {
    label = labels[i];
    id = label.getAttribute('for') || '';
    input = document.getElementById(id);
    type = input.getAttribute('type') || input.tagName;
    type = type.toLowerCase();

    if (input && (type === 'password' || type === 'text')) {
      $.inputFocus(input, label)
        .inputBlur(input, label);
      if (input.value === '') {
        $.addClass(label, 'inactive');
      } else {
        $.addClass(label, 'active');
      }
    }
  }
}();
