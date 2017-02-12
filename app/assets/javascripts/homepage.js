//opens full screen overlay
function openOverlay() {
  $("#homepage-overlay").css('height', '100%');
}

//closes full screen overlay
function closeOverlay() {
  $("#homepage-overlay").css('height', '0%');
}

//displays text and link on hover for homepage columns
function columns() {
  var Expand = (function() {
    var tile = $('.strips__strip');
    var tileLink = $('.strips__strip > .strip__content');
    var tileText = tileLink.find('.strip__inner-text');
    var stripClose = $('.strip__close');
    
    var expanded  = false;

    var open = function() {
        
      var tile = $(this).parent();

        if (!expanded) {
          tile.addClass('strips__strip--expanded');
          // add delay to inner text
          tileText.css('transition', 'all .5s .3s cubic-bezier(0.23, 1, 0.32, 1)');
          stripClose.addClass('strip__close--show');
          stripClose.css('transition', 'all .6s 1s cubic-bezier(0.23, 1, 0.32, 1)');
          expanded = true;
        } 
      };
    
    var close = function() {
      if (expanded) {
        tile.removeClass('strips__strip--expanded');
        // remove delay from inner text
        tileText.css('transition', 'all 0.15s 0 cubic-bezier(0.23, 1, 0.32, 1)');
        stripClose.removeClass('strip__close--show');
        stripClose.css('transition', 'all 0.2s 0s cubic-bezier(0.23, 1, 0.32, 1)')
        expanded = false;
      }
    }

      if ($(window).width() < 761) {
        var bindActions = function() {
          tileLink.on('click', open);
          stripClose.on('click', close);
        };
        $('.strip__content').css('background-image', 'url("http://lorempixel.com/760/900/")');
      } else {
        var bindActions = function() {
          tileLink.mouseenter(open);
          tileLink.mouseleave(close);
        };
      }

      var init = function() {
        bindActions();
      };

      return {
        init: init
      };
  }());

  Expand.init();
}

/* Set the width of the side navigation to 250px */
function openNav() {
  $("#mySidenav").css('width', '250px');
    // document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  $("#mySidenav").css('width', '0px');
    // document.getElementById("mySidenav").style.width = "0";
}

$(document).ready(function() {
  //open overlay on ready
  openOverlay();
  columns();    
});