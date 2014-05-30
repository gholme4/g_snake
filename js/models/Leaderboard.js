'use strict';
/*
Leaderboard model 
*
* @author George Holmes II
*/

(function ($) {
	/**
	* Manipulates the list of high scores
	*
	* @class Leaderboard
	*/
	var Leaderboard;
	
	 
	/**
	* Leaderboard constructor.
	* @constructor Leaderboard
	*
	* @return {null}
	*/
	Leaderboard = function () {
		var self = this;
		
		/**
		* @property {Array} scores
		*/
		self.scores = [];
		
		/**
		* @method getScores
		* Get list of high scores
		*
		* @return {Array}
		*/
		self.getScores = function () {
			var scoresArray = [];
			var serializedScores = localStorage.getItem("gsnake_scores");
			
			if (serializedScores)
			{
				scoresArray = JSON.parse(serializedScores);	
			}
			
			return scoresArray;
		};
		
		/**
		* @method saveScore
		* Save new score
		*
		* @param {Number} score
		*
		* @return {Array}
		*/
		self.saveScore = function (score) {
			if (score == 0)
			{
				return;
			}
			
			var scoresArray = [];
			var serializedScores = localStorage.getItem("gsnake_scores");
			
			/* No scores have been stored in local storage so create key for them  and add new score to it */
			if (!serializedScores)
			{
				localStorage.setItem("gsnake_scores", JSON.stringify([score]));
			}
			else
			{
				/* Get high scores and add new score to the array. Sort the array to determine if new score should be stored */
				scoresArray = JSON.parse(serializedScores);
				scoresArray.push(score);
				scoresArray.sort(sortNumber);
				
				if (scoresArray.length > 10 )
				{
					scoresArray.length = 10;
				}
				
				
				localStorage.setItem("gsnake_scores", JSON.stringify(scoresArray));
			}
			
			return scoresArray;
		};
		
		function sortNumber(a,b) {
		    return b - a;
		}
		
	};
	
	
	window.GSnake.Leaderboard = Leaderboard;
	
	
})(jQuery);