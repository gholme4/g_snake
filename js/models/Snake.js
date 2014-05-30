'use strict';
/*
Snake model 
*
* @author George Holmes II
*/

(function ($) {
	
	/**
	* Create snake and change it's direction
	*
	* @class Snake
	*/
	var Snake;
	
	 
	/**
	* Snake constructor.
	* @constructor Snake
	*
	* @param {Object} field 
	* Game.fieldUI object
	*
	* @return {null}
	*/
	Snake = function (field) {
		
		var self = this;
		
		/**
		* @property {Number} segments
		* Length of snake body
		*/
		self.segments = 0;
		
		/**
		* @property {String} direction
		* Current direction that snake is moving
		*/
		self.direction = "left";
		
		/**
		* @method create
		* Creates a snake for a new game
		*
		*/
		self.create = function () {
			var fieldWidth = field.width();
			var fieldHeight = field.height();
			
			field.append('<div class="snake head"></div>');
			$('.snake.head').css("left", (fieldWidth/2) + "px").css("top", (fieldHeight/2) + "px");
			
			self.segments = 1;
			
		};
		
		/**
		* @method destroy
		* Remove snake when game has ended
		*
		*/
		self.destroy = function () {
			$(".snake").fadeOut(100).remove();
		};
		
		/**
		* @method addSegment
		* Add new segment to snake's body
		*
		*/
		self.addSegment = function () {
			self.segments++;
		};
		
		/**
		* @method changeDirection
		* Change the direction the snake is moving
		*
		* @param {Number} direction
		*
		*/
		self.changeDirection = function (direction) {
			switch (direction) {
				case 37: 
					self.direction = "left";
					break;
				case 38:
					self.direction = "up";
					break;
				case 39:
					self.direction = "right";
					break;
				case 40:
					self.direction = "down";
					break;
			}
		};
		
		/**
		* @method move
		* Move the snake
		*
		* @param {Object} fieldUI
		* Game.fieldUI object
		*
		*/
		self.move = function (fieldUI) {
			
			/* Get the position of the snake head  and set it's next position */
			var newLeft = $(".snake.head").position().left;
			var newTop = $(".snake.head").position().top;
			
			switch (self.direction) {
				case "up": 
						newTop = newTop - 10;
					break;	
				
				case "down": 
						newTop = newTop + 10;
					break;
				
				case "left": 
						newLeft = newLeft - 10;
					break;
				
				case "right": 
						newLeft = newLeft + 10;
						
					break;
			}		
			
			
			var snakeBody = $(".snake");
			
			/* Iterate over each snake segment to move it */
			snakeBody.each(function (i,el) {
				
				var currentLeft = $(el).position().left;
				var currentTop = $(el).position().top;
				
				$(el).css("top", newTop + "px");
				$(el).css("left", newLeft + "px");
				
				/* Here we set the coordinates of the next segment in the snake */
				newLeft = currentLeft;
				newTop = currentTop;
					
				/* This is the last snake segment in the DOM so this is the time to add a new segment */
				if (i == (snakeBody.length - 1))
				{
					var lLeft = $(el).position().left;
					var lTop = $(el).position().top;
					
					/* Check if new snake segement needs to be added */
					if (snakeBody.length < self.segments)
					{
						var newSegment = $('<div class="snake body"></div>').css("left", newLeft + "px").css("top", newTop + "px");
						fieldUI.append(newSegment);
					}
				}
			
			});
			
			
			
		};
		
		/**
		* @method checkForCollision
		* Returns true if snake has collided with field border or its body
		*
		* @param {Object} fieldUI
		* Game.fieldUI object
		*
		* @return {Boolean}
		*/
		self.checkForCollision = function (fieldUI) {
			var didCollide = false;
			
			var left = $(".snake.head").position().left;
			var top = $(".snake.head").position().top;
			
			if (left > fieldUI.width() || left < 0 || top > fieldUI.height() || top < 0)
			{
				didCollide = true;	
			}
			
			var snakeBody = $(".snake");
			
			/* Iterate over each snake segment to check its coordinates with every other segment */
			snakeBody.each(function (i,el) {
				
				var currentLeft = $(el).position().left;
				var currentTop = $(el).position().top;
				
				snakeBody.each(function (_i,_el) {
					
					if (i == _i)
					{
						return;	
					}
					
					var _currentLeft = $(_el).position().left;
					var _currentTop = $(_el).position().top;
					
					if (currentLeft == _currentLeft && currentTop == _currentTop)
					{
						didCollide = true;	
					}
				
				});
			
			});
			
			return didCollide;
		};
		
	
	};
	
	window.GSnake.Snake = Snake;
	
})(jQuery);