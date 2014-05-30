module.exports = function(grunt) {
	require('matchdep').filterDev('grunt-*').forEach( grunt.loadNpmTasks );

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
				
			scripts: {
				
				options: {
					separator: '\r\n', //separates scripts
					stripBanners: true
				},
				
				src: [
					'js/jquery-1.11.1.min.js',
	
					/* Models */
					'js/models/GSnake.js',
					'js/models/Snake.js',
					'js/models/Leaderboard.js',
					
					/* Controllers */
					'js/controllers/Game.js',
					
					'js/app.js',
					
				], 
				dest: 'js/script.js' //where to output the script
			}
			
		},
		uglify: {
			scripts: {
				files: {
					'js/script.min.js': ['js/script.js'] //save over the newly created script
				}
			}
			
		},
		cssmin: {
			combine: {
				files: {
			 		'css/style.min.css': [
						'css/style.css'
					]
				}
			}
		},
		jsduck: {
			main: {
				// source paths with your code
				src: [
					'js/models/*.js',
					'js/controllers/*.js'
				],
				
				// docs output dir
				dest: 'docs'
			}
		},
		watch: {
			/*
			sass: {
				files: ['css/*.scss' ],
				tasks: ['sass']
				
			},
			*/
			concatScripts: {
				files: ['./js/*' ],
				tasks: ['concat', 'uglify']
				
			}
		}

	});

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify', 'cssmin', /* 'jsduck'/*,  'watch']*/]);

};
