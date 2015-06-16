module.exports = function( grunt ) {

	// Project configuration
	grunt.initConfig( {
		pkg:    grunt.file.readJSON( 'package.json' ),
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n'
			},
			wp_user_manager: {
				src: [
					'assets/js/src/wp_user_manager.js'
				],
				dest: 'assets/js/wp_user_manager.js'
			},
			wp_user_manager_admin: {
				src: [
					'assets/js/src/wp_user_manager_admin.js'
				],
				dest: 'assets/js/wp_user_manager_admin.js'
			}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'assets/js/src/**/*.js',
				'assets/js/test/**/*.js'
			],
			options: {
				curly:   true,
				eqeqeq:  true,
				immed:   true,
				latedef: true,
				newcap:  true,
				noarg:   true,
				sub:     true,
				undef:   true,
				boss:    true,
				eqnull:  true,
				globals: {
					exports: true,
					module:  false
				}
			}		
		},
		uglify: {
			all: {
				files: {
					'assets/js/wp_user_manager.min.js': ['assets/js/wp_user_manager.js'],
					'assets/js/wp_user_manager_admin.min.js': ['assets/js/wp_user_manager_admin.js']
				},
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * <%= pkg.homepage %>\n' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
						' * Licensed GPLv2+' +
						' */\n',
					mangle: {
						except: ['jQuery']
					}
				}
			}
		},
		test:   {
			files: ['assets/js/test/**/*.js']
		},
		
		sass:   {
			all: {
				files: {
					'assets/css/wp_user_manager.css': 'assets/css/sass/wp_user_manager.scss',
					'assets/css/wp_user_manager_frontend.css': 'assets/css/sass/wp_user_manager_frontend.scss'
				}
			}
		},
		addtextdomain: {
	        target: {
	            files: {
	                src: [
	                    '*.php',
	                    '**/*.php',
	                    '!.sass-cache/**',
	                    '!assets/**',
	                    '!images/**',
	                    '!node_modules/**',
	                    '!tests/**'
	                ]
	            }
	        }
	    },
		makepot: {
            target: {
                options: {
                	exclude: [
	                    'assets/.*', 'images/.*', 'node_modules/.*', 'tests/.*'   
	                ],
                    domainPath: '/languages',
                    mainFile: 'wp-user-manager.php',
                    potFilename: 'wpum.pot',
                    potHeaders: {
                        poedit: true,                 // Includes common Poedit headers.
                        'x-poedit-keywordslist': true // Include a list of all possible gettext functions.
                    }, 
                    type: 'wp-plugin'
                }
            }
        },
		cssmin: {
			options: {
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n'
			},
			minify: {
				expand: true,
				
				cwd: 'assets/css/',				
				src: ['*.css', '!*.min.css'],
				
				dest: 'assets/css/',
				ext: '.min.css'
			}
		},
		watch:  {
			
			sass: {
				files: ['assets/css/sass/*.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					debounceDelay: 500
				}
			},
			
			scripts: {
				files: ['assets/js/src/**/*.js', 'assets/js/vendor/**/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					debounceDelay: 500
				}
			}
		},
		clean: {
			main: ['release/<%= pkg.version %>']
		},
		copy: {
			// Copy the plugin to a versioned release directory
			main: {
				src:  [
					'**',
					'!node_modules/**',
					'!release/**',
					'!.git/**',
					'!.sass-cache/**',
					'!css/src/**',
					'!js/src/**',
					'!img/src/**',
					'!Gruntfile.js',
					'!package.json',
					'!.gitignore',
					'!.gitmodules'
				],
				dest: 'release/<%= pkg.version %>/'
			}		
		},
		compress: {
			main: {
				options: {
					mode: 'zip',
					archive: './release/wp_user_manager.<%= pkg.version %>.zip'
				},
				expand: true,
				cwd: 'release/<%= pkg.version %>/',
				src: ['**/*'],
				dest: 'wp_user_manager/'
			}		
		}
	} );
	
	// Load other tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
	grunt.loadNpmTasks( 'grunt-wp-i18n' );
	
	// Default task.
	grunt.registerTask( 'default', ['concat', 'uglify', 'sass', 'cssmin', 'makepot'] );
	grunt.registerTask( 'textdomain', ['addtextdomain'] );
	grunt.registerTask( 'do_pot', ['makepot'] );
	grunt.registerTask( 'build', ['default', 'clean', 'copy', 'compress'] );

	grunt.util.linefeed = '\n';
};