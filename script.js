wow = new WOW({
		boxClass:     'wow',      // default
		animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       true,       // default
    live:         true        // default
});
wow.init();

var Confettiful = function Confettiful(el) {
  this.el = el;
  this.containerEl = null;

  this.confettiFrequency = 3;
  this.confettiColors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];
  this.confettiAnimations = ['slow', 'medium', 'fast'];

  this._setupElements();
  this._renderConfetti();
};

Confettiful.prototype._setupElements = function () {
  var containerEl = document.createElement('div');
  var elPosition = this.el.style.position;

  if (elPosition !== 'relative' || elPosition !== 'absolute') {
    this.el.style.position = 'relative';
  }

  containerEl.classList.add('confetti-container');

  this.el.appendChild(containerEl);

  this.containerEl = containerEl;
};

Confettiful.prototype._renderConfetti = function () {var _this = this;
  this.confettiInterval = setInterval(function () {
    var confettiEl = document.createElement('div');
    var confettiSize = Math.floor(Math.random() * 3) + 7 + 'px';
    var confettiBackground = _this.confettiColors[Math.floor(Math.random() * _this.confettiColors.length)];
    var confettiLeft = Math.floor(Math.random() * _this.el.offsetWidth) + 'px';
    var confettiAnimation = _this.confettiAnimations[Math.floor(Math.random() * _this.confettiAnimations.length)];

    confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
    confettiEl.style.left = confettiLeft;
    confettiEl.style.width = confettiSize;
    confettiEl.style.height = confettiSize;
    confettiEl.style.backgroundColor = confettiBackground;

    confettiEl.removeTimeout = setTimeout(function () {
      confettiEl.parentNode.removeChild(confettiEl);
    }, 3000);

    _this.containerEl.appendChild(confettiEl);
  }, 25);
};

window.confettiful = new Confettiful(document.querySelector('.js-container'));

$(function(){
  BDay()
    .party($('.container'))

    .balloon('M', '#de691a', '2s')
    .balloon('I', '#8882ca', '2.5s')
    .balloon('G', '#66cc86', '3s')
    .balloon('U', '#cac85e', '3.5s')
    .balloon('E', '#ce8355', '4s')
    .balloon('L', '#9d0b0b', '4.4s');

});

var Bounce = (function() {
  'use strict';

  var speed = 100;

  function Bounce(node)
  {
    // enforces new
    if (!(this instanceof Bounce)) {
      return new Bounce(node);
    }

    var object = this;
    this.step = function() {
      object.bounce();
    }
    this.node = node;
    this.bounce();
  }

  Bounce.prototype.bounce = function()
  {
    return;
    // Hate CSS :(
    var animate = { 
      top: "+=1"
    };
    this.node.animate(animate, speed, 'swing', this.step);
  };

  return Bounce;

}());

var Balloon = (function() {
  'use strict';

  function Balloon()
  {
    if (!(this instanceof Balloon)) {
      return new Balloon();
    }

    this.node = $('<div />')
      .addClass('balloon')
      .append(
        $('<span />')
      )
    ;
    Bounce(this.node);
  }

  Balloon.prototype.color = function(color)
  {
    this.node.css('background-color', color);
    return this;
  };

  Balloon.prototype.set = function(type)
  {
    this.node.find('span').html(type);
    return this;
  };

  Balloon.prototype.center = function()
  {
    var text = this.node.find('span');
    text.css({
      left: pixelify(this.node, text, 'width'),
      top: pixelify(this.node, text, 'height')
    });
  }
  
  Balloon.prototype.on = function(node)
  {
    node.append(this.node);
    this.center();
    return this;
  };

  Balloon.prototype.transform = function(speed)
  {
    this.node.css('animation-duration', speed);
    return this;
  };

  return Balloon;

}());

var BDay = (function() {
  'use strict';

  var instance;
  
  function BDay()
  {
    if (instance) {
      return instance;
    }
    if (!(this instanceof BDay)) {
      return new BDay();
    }
    instance = this;
  }

  BDay.prototype.party = function(node)
  {
    instance.node = node
      .css('visible', 'hidden')
      .html('')
    ;
    return instance;
  };
  
  BDay.prototype.balloon = function(char, color, speed)
  {
    Balloon()
      .set(char)
      .color(color)
      .transform(speed)
      .on(instance.node)
     ;
    return instance;
  };

  BDay.prototype.celebrate = function(who)
  {
    var $window = $(window);
    instance.node
      .append(
        $('<h1 />').html(who)
      )
      .css({
        left: pixelify($window, instance.node, 'width'),
        top: pixelify($window, instance.node, 'height')
      })
      .show()
    ;
    return instance;
  };

  return BDay;

}());

function pixelify(container, node, type)
{
  var size = container[type]() - node[type]();
  return (size / 2) + 'px';
}