'use strict';
/*
Game controller 
*
* @author George Holmes II
*/

(function ($) {
	
	/**
	*
	* G-Snake gameplay functionality	
	*
	* @class Game
	*/
	var Game;
	
	 
	/**
	* Game constructor.
	* @constructor Game
	* @return {null}
	*/
	Game = function () {
		
		var self = this;
		
		/**
		* @property {Number} currentScore
		* Current score
		*/
		self.currentScore = null;
		
		/**
		* @property {Object} addSegmentInterval
		* Interval of adding a new snake segment
		*/
		self.addSegmentInterval = null;
		
		
		/**
		* @property {Object} moveInterval
		* Interval of snake movement
		*/
		self.moveInterval = null;
		
		/**
		* @property {Object} scoreUI
		* jQuery DOM element of current score
		*/
		self.scoreUI = $("#current-score");
		
		/**
		* @property {Object} fieldUI
		* jQuery DOM element of snake field
		*/
		self.fieldUI = $("#field");
		
		/**
		* @property {Object} notificationUI
		* jQuery DOM element of notifications box
		*/
		self.notificationUI = $("#notifications");
		
		/**
		* @property {Object} startButtonUI
		* jQuery DOM element of start new game button
		*/
		self.startButtonUI = $("#start-button");
		
		/**
		* @property {Object} highScoresUI
		* jQuery DOM element of list of high scores
		*/
		self.highScoresUI = $("#high-scores-list");
		
		/**
		* @property {Object} snake
		* Snake
		*/
		self.snake = null;
		
		/**
		* @method init
		* Initialize the game
		*
		*/
		self.init = function () {
			self.notificationUI.html("Press start to play!");
			updateHighScoresView();
			setEventHandlers();
		};
		
		/**
		* @method start
		* Start a new game
		*
		*/
		self.start = function () {
			self.startButtonUI.hide();
			self.notificationUI.hide()
			self.updateScore(0);
			
			self.snake = new GSnake.Snake(self.fieldUI);
			self.snake.create();
			
			/* Start interval to add segments to snake */
			self.addSegmentInterval = setInterval(function () {
				self.snake.addSegment();
				self.updateScore(self.currentScore + 10);
			}, 1500);
			
			/* Start snake movement */
			self.moveInterval = setInterval(function () {
				self.snake.move(self.fieldUI);	
				
				/* Check for collisions */
				var collided = self.snake.checkForCollision(self.fieldUI);
				
				if (collided == true)
				{
					self.end();	
				}
				
			}, 120);
		};
		
		/**
		* @method end
		* End game
		*
		*/
		self.end = function () {
			
			self.notificationUI.show().html("Game Over. <br> Press Start to play a new game.");
			var leaderboard = new GSnake.Leaderboard();
			leaderboard.saveScore(self.currentScore);
			self.startButtonUI.show();
			self.updateScore("");
			self.snake.destroy();
			self.snake = null;
			updateHighScoresView();
			
			clearInterval(self.addSegmentInterval);
			clearInterval(self.moveInterval);
		};
		
		/**
		* @method updateScore
		* End game
		* @param {Number} score
		*/
		self.updateScore = function (score) {
			self.scoreUI.html(score);
			self.currentScore = score;
		};
		
		/**
		* @method updateHighScoresView
		*
		* Update high scores list view
		*
		* @private
		*/
		function updateHighScoresView () {
			var leaderboard = new GSnake.Leaderboard();
			var highScores = leaderboard.getScores();
			var highScoresHtml = "";
			
			for (var i = 0; i < highScores.length; i++)
			{
				highScoresHtml	+= "<li>" + highScores[i] + "</li>";
			}
			
			self.highScoresUI.html(highScoresHtml);
		}
		
		/**
		* @method setEventHandlers
		*
		* Add event handlers for all controls
		*
		* @private
		*/
		function setEventHandlers () {
			self.startButtonUI.click(function (e) {
				e.preventDefault();
				self.start();
			});
			
			$(document).keydown(function (e) {
				if (!self.snake)
				{
					return;
				}
				self.snake.changeDirection(e.keyCode);	
			});
		}
		
	};
	
	window.GSnake.Game = Game;
	
})(jQuery);