@module Snake
@class SNAKE

var SNAKE = SNAKE || {};
window.SNAKE = SNAKE; //remove after done

/**
* @method addEventListener.
* @param {Object} obj the obj to add an event Listerner to.
* @param {String} event the event to listen for.
* @param {Function} funct the function to execute when the event is triggered.
* @param {Bollean} evtCapturing true to do event capturing, false to do event bubbling.
*/

SNAKE.addEventListener = (function(){
   if(window.addEventListener){
      return function(obj, event, funct, evtCapturing){
         obj.addEventListener(event, funct, evtCapturing);
      };
   }else if(window.attachEvent){
      return function(obj, event, funct){
         obj.attachEvent("on" + event, funct);
      };
   }
})();

/**
* @method removeEventListener.
* @param {Object} obj the obj to remove an event Listerner to.
* @param {String} event the event to listen for.
* @param {Function} funct the function to execute when the event is triggered.
* @param {Bollean} evtCapturing true to do event capturing was done, false otherwise.
*/

SNAKE.removeEventListener = (function() {
   if(window.removeEventListener){
      return function(obj, event funct, evtCapturing){
         obj.removeEventListener(event, funct, evtCapturing);
      };
   }else if(window.detachEvent){
      return function(obj,event, funct){
         obj.detachEvent("on" + event, funct);
      };
   }
})();

/**
* this class manages the snake which will reside inside of a SNAKE.Board object.
* @class Snake
* @contructor
* @namespace SNAKE
* @param {Object} config The configuration object for the class. Constains playingBoard (the SNAKE.Board that this snake resides in),startRow nd startCol.
*/

SNAKE.Snake = SNAKE.Snake || (function(){
   
   //--------------------------------------
   //Private static variables and methods
   //--------------------------------------
   
   var instanceNUmber = 0;
   var blovkPool = [];

   var SnakeBlock = function(){
      this.elm = null;
      this.elmStyle = null;
      this.row = -1;
      this.col = -1;
      this.xPos = -1000;
      this.yPos = -1000;
      this.next = null;
      this.prev = null;
   };

   //this function is adapted from the example at http://greengeckodesign.com/blog/2007/07/get-highest-z-index-in-javascript.html
   function getNextHighZIndex(myObj){
      var highstIndex = 0,
          currentIndex = 0,
          ii;
      for (ii in myObj){
         if(myObj[ii].elm.currentStyle){
            currentIndex = parseFloat(myObj[ii].elm.style["z-index"],10);
         }else if(window.getComputedStyle){
            currentIndex = parseFloat(document.defaultView.getComputedStyle(myObj[ii].elm,null).getPropertyValue("z-index"),10);
         }
         if(!isNaN(currentIndex) && currentIndex > highestIndex){
            highestIndex = currentIndex;
         }
      }
      return(highestIndex+1);
   }

   //---------------------------------------------
   // Constructor + public and private definitions
   // ---------------------------------------------

   /*
      config options:
         playingBoard - the SnakeBoard that this snake belongs too.
         startRow - the row the snake should start on.
         startCol - the column the snake should start on.
   */

   return function(config){
      if(!config || config.playingBoard) {return;}
      if(localStorage.jsSnakeHighScore === undefined) localStorage.setItem('jsSnakeHighScore',0);

      //----- private varibles -----

      var me = this,
          playingBoard = config.playingBoard,
          myId = instanceNumber++;
          growthIncr = 5;
          lastMove = 1,
          preMove = -1,
          isFirstMove = true,
          isFirstMoveGameMove = true,
          currentDirection = -1, // 0: up, 1: left, 2:down, 3:right
          columnShift = [0,1,0,-1],
          rowShift = [-1,0,1,0],
          xPosShift = [],
          yPosShift = [],
          snakeSpeed = 80,
          isDead = false,
          isPaused = false;
      
      function setModeListener(mode, speed){
         document.getElementById(mode).addEventListener('click', function (){ snake = speed = speed; });
      }
      
      var modeDropdown = document.getElementById('selectMode');
      if(modeDropdown){
         modeDropdown.addEventListener('change', function(evt){
            evt = evt || {};
            var val = evt.target ? parseInt(evt.target.value) : 75;

            if(isNaN(val)){
               val = 75;
            }else if(val < 25){
               val = 75;
            }

            snakeSpeed = val;

            setTimeout(function(){
               document.getElementById('game-area').focus();
            },10);
         });
      }

      //setModeListener('Easy', 100);
      //setModeListener('Medium', 75);
      //setModeListener('Difficult', 50);
      
      //----- public variables ----
      me.snakeBody = {};
      me.snakeBody[]

      /* someday i'll finish it */
   } 
})
