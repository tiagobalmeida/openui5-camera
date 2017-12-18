module.exports = function(grunt) {

	grunt.initConfig({

		dir: {
			src: 'src',
			dest: 'dist',
			demo: 'test/demo',
			bower_components: 'bower_components'
		},

		watch: {
			options: {
				livereload: true
			},
			css: {
				files: ['<%= dir.src %>/**/*.less', '<%= dir.src %>/**/*.css'],
				tasks: ['build']
			},
			js: {
				files: ['<%= dir.src %>/**/*.js'],
				tasks: ['build']
			}
		},

		copy: {
			main: {
				expand: true,
				cwd: '<%= dir.dest %>/',
				src: ['**'],
				dest: '<%= dir.demo %>/thirdparty/',
			},
		},

		clean: {
			dist: '<%= dir.dest %>/**'
		},

		eslint: {
            options: {
                configFile: './.eslintrc'
            },

            demo: ['<%= dir.demo %>']
        },

		connect: {
			options: {
				port: 8080,
				hostname: '*'
			},
			src: {},
			dist: {}
		},

		openui5_connect: {
			options: {
				resources: [
					'<%= dir.bower_components %>/openui5-sap.ui.core/resources',
					'<%= dir.bower_components %>/openui5-sap.m/resources',
					'<%= dir.bower_components %>/openui5-sap.ui.layout/resources',
					'<%= dir.bower_components %>/openui5-themelib_sap_belize/resources'
				]
			},
			src: {
				options: {
					appresources: '<%= dir.demo %>'
				}
			},
			dist: {
				options: {
					appresources: '<%= dir.demo %>'
				}
			}
		},

		openui5_preload: {
		    library: {
		        options: {
		            resources: [
		                { cwd: '<%= dir.src %>' }
		            ],
		            dest: '<%= dir.dest %>',
		            compatVersion: '1.44',
		            compress: false
		        },
		        libraries: 'openui5/camera'
		    }
		}
	});

	// These publins provide necessary tasks
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-openui5');
	grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks("grunt-contrib-watch");

    // Server task
	grunt.registerTask('serve', function(target) {
		grunt.task.run('openui5_connect:' + (target || 'src') + ':keepalive');
	});

	// Linting task
	grunt.registerTask('lint', ['eslint']);

	// Build task
	grunt.registerTask('build', ['clean', 'openui5_preload', 'copy']);

	// Default task
	grunt.registerTask('default', [
		'lint',
		'clean',
		'build',
		'serve'
	]);

};
