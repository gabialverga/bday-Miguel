$(document).ready(function(){ 
                    //list item interaction
                    var listSwipeStarted        = 0,
                        startSwipeX             = 0,
                        newSwipePosX            = 0,
                        currentListItem         = "",
                        listItem                = $(".listItem");


                    $("body").on( "touchstart", ".listItem", function(e) {
                        currentListItem = $(this).index();

                        //get starting position
                        startSwipeX = e.originalEvent.touches[0].pageX;

                        //swipe hint
                        listItem.eq(currentListItem).addClass("slideHint");

                        listSwipeStarted = 1;

                    }).on( "mousedown", ".listItem", function(e) {
                        currentListItem = $(this).index();

                        //get starting position
                        startSwipeX = e.pageX;

                        //swipe hint
                        listItem.eq(currentListItem).addClass("slideHint");

                        listSwipeStarted = 1;

                    }).on( "mousemove", function(e) {
                        e.preventDefault();

                        if (listSwipeStarted === 1){
                            newSwipePosX    = e.pageX - startSwipeX;
                        }

                        listItem.eq(currentListItem).velocity({  
                            translateX: newSwipePosX
                        }, { queue: false, duration: 10 }); 
                    }).on( "touchmove", function(e) {
                        e.preventDefault();

                        if (listSwipeStarted === 1){   
                            newSwipePosX = e.originalEvent.touches[0].pageX - startSwipeX;
                        }

                        listItem.eq(currentListItem).velocity({  
                            translateX: newSwipePosX
                        }, { queue: false, duration: 10 }); 
                    }).on( "touchend mouseup", function(e) {
                        e.preventDefault();

                        listItem.eq(currentListItem).removeClass("slideHint");

                        if (newSwipePosX >= 120){
                            //shrink away the list item
                            listItem.eq(currentListItem).velocity({  
                                height: 0
                            }, { queue: false, duration: 600, easing: [0.4, 0, 0.2, 1] }).velocity({  
                                translateX: "100%"
                            }, { queue: false, duration: 200, easing: [0.4, 0, 0.2, 1] });

                        } else if (newSwipePosX <= -120){
                            //shrink away the list item
                            listItem.eq(currentListItem).velocity({  
                                height: 0
                            }, { queue: false, duration: 600, easing: [0.4, 0, 0.2, 1] }).velocity({  
                                translateX: "-100%"
                            }, { queue: false, duration: 200, easing: [0.4, 0, 0.2, 1] });
                        } else{
                            //reset position
                            listItem.eq(currentListItem).velocity({  
                                translateX: 0,
                            }, { queue: false, duration: 200, easing: [0.4, 0, 0.2, 1] });  
                        }

                        //reset swipe position
                        newSwipePosX            = 0;
                        listSwipeStarted        = 0;
                    });
                });

                //force refresh of confetti
                $(".congratsButton").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                    var canvas = document.getElementById("confeti");
                    canvas.style.display='none';
                    canvas.offsetHeight;
                    canvas.style.display='';
                }).click(function(){
                    var canvas = document.getElementById("confeti");
                    canvas.style.display='none';
                    canvas.offsetHeight;
                    canvas.style.display='';
                });

                (function() {
                  var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, drawCircle2, drawCircle3, i, range, xpos;

                  NUM_CONFETTI = 60;

                  COLORS = [[255, 255, 255], [240, 83, 85], [255, 255, 255], [240, 83, 85], [0, 277, 235]];

                  PI_2 = 2 * Math.PI;

                  canvas = document.getElementById("confeti");

                  context = canvas.getContext("2d");

                  window.w = 900;

                  window.h = 675;

                  window.resizeWindow = function() {
                    window.w = canvas.width = window.innerWidth;
                    return window.h = canvas.height = window.innerHeight;
                  };

                  window.addEventListener('resize', resizeWindow, false);

                  window.onload = function() {
                    return setTimeout(resizeWindow, 0);
                  };

                  range = function(a, b) {
                    return (b - a) * Math.random() + a;
                  };

                  drawCircle = function(x, y, r, style) {
                    context.beginPath();
                    context.moveTo(x, y);
                    context.bezierCurveTo(x - 17, y + 14, x + 13, y + 5, x - 5, y + 22);
                    context.lineWidth = 3;
                    context.strokeStyle = style;
                    return context.stroke();
                  };

                  drawCircle2 = function(x, y, r, style) {
                    context.beginPath();
                    context.moveTo(x, y);
                    context.lineTo(x + 10, y + 10);
                    context.lineTo(x + 10, y);
                    context.closePath();
                    context.fillStyle = style;
                    return context.fill();
                  };

                  drawCircle3 = function(x, y, r, style) {
                    context.beginPath();
                    context.moveTo(x, y);
                    context.lineTo(x + 10, y + 10);
                    context.lineTo(x + 10, y);
                    context.closePath();
                    context.fillStyle = style;
                    return context.fill();
                  };

                  xpos = 0.9;

                  document.onmousemove = function(e) {
                    return xpos = e.pageX / w;
                  };

                  window.requestAnimationFrame = (function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                      return window.setTimeout(callback, 100 / 20);
                    };
                  })();

                  Confetti = (function() {
                    function Confetti() {
                      this.style = COLORS[~~range(0, 5)];
                      this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
                      this.r = ~~range(2, 6);
                      this.r2 = 2 * this.r;
                      this.replace();
                    }

                    Confetti.prototype.replace = function() {
                      this.opacity = 0;
                      this.dop = 0.03 * range(1, 4);
                      this.x = range(-this.r2, w - this.r2);
                      this.y = range(-20, h - this.r2);
                      this.xmax = w - this.r;
                      this.ymax = h - this.r;
                      this.vx = range(0, 2) + 8 * xpos - 5;
                      return this.vy = 0.7 * this.r + range(-1, 1);
                    };

                    Confetti.prototype.draw = function() {
                      var ref;
                      this.x += this.vx;
                      this.y += this.vy;
                      this.opacity += this.dop;
                      if (this.opacity > 1) {
                        this.opacity = 1;
                        this.dop *= -1;
                      }
                      if (this.opacity < 0 || this.y > this.ymax) {
                        this.replace();
                      }
                      if (!((0 < (ref = this.x) && ref < this.xmax))) {
                        this.x = (this.x + this.xmax) % this.xmax;
                      }
                      drawCircle(~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
                      drawCircle3(~~this.x * 0.5, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
                      return drawCircle2(~~this.x * 1.5, ~~this.y * 1.5, this.r, this.rgb + "," + this.opacity + ")");
                    };

                    return Confetti;

                  })();

                  confetti = (function() {
                    var j, ref, results;
                    results = [];
                    for (i = j = 1, ref = NUM_CONFETTI; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
                      results.push(new Confetti);
                    }
                    return results;
                  })();

                  window.step = function() {
                    var c, j, len, results;
                    requestAnimationFrame(step);
                    context.clearRect(0, 0, w, h);
                    results = [];
                    for (j = 0, len = confetti.length; j < len; j++) {
                      c = confetti[j];
                      results.push(c.draw());
                    }
                    return results;
                  };

                  step();

                }).call(this);
