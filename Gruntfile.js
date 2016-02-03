module.exports = function(grunt) {

  grunt.initConfig({
    routesDir: 'routes',
    distRoutesDir: 'dist/routes',
    modelsDir: 'model',
    distModelsDir: 'dist/model',
    nodeModules: 'node_modules',
    distNodeModules: 'dist/node_modules',
    distDir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    machine: grunt.file.readJSON('machine.json'),
    nodemon: {
      dev: {
          script: './bin/www'
      }
    },
    clean: {
        build: {
            src: [ '<%= distDir %>']
        },
    },
    copy: {
      main: {
            files: [
                 {
                       cwd: '<%= routesDir %>',
                       expand: true,
                       src: ['**/*.js'],
                       dest: '<%= distRoutesDir %>'
                 },
                 {
                       cwd: '<%= modelsDir %>',
                       expand: true,
                       src: ['**/*.js'],
                       dest: '<%= distModelsDir %>'
                 },
                 {
                       cwd: 'bin',
                       expand: true,
                       src: ['www'],
                       dest: '<%= distDir %>/bin/'
                 },
                 {
                       cwd: '<%= nodeModules %>',
                       expand: true,
                       src: [ '*/**','!grunt*/**','!restler*/**',
                                        '!serve-favicon*/**',
                                        '!nodeunit*/**',
                                        '!jade*/**'],
                       dest: '<%= distNodeModules %>'
                 },
                 {
                       expand: true,
                       src: ['*.js','!Grunt*','!karma*'],
                       dest: '<%= distDir %>'
                 }
           ]
      }
    },
    sshconfig: {
       "host": grunt.file.readJSON('machine.json')
    },
    sftp: {
       deploy : {
           files: {
                "./" : "dist/**"
           },
           options: {
                config: "host",
                path: '/home/<%= machine.username %>/<%= pkg.name %>',
                srcBasePath: "dist/",
                createDirectories: true
           }
       }
    },
    sshexec : {
       backupDocs: {
          command: [
              'mv <%= pkg.name %>/documentos backupDocumentos',
          ],
          options: {
                config: "host",
                ignoreErrors: true
          }
       },
       restoreDocs: {
          command: [
               'mv backupDocumentos <%= pkg.name %>/documentos'
          ],
          options: {
                config: "host",
                ignoreErrors: true
          }
       },
       remove : {
          command: "rm -rf <%= pkg.name %>",
          options: {
                config: "host",
                ignoreErrors: true
          }
       },
       start: {
           command: [
                 'cd <%= pkg.name %>',
                 'forever start ./bin/www'].
           join(' && '),
           options: {
                config: "host",
                ignoreErrors: true
           }
       },
       stop: {
           command: [
                 'cd <%= pkg.name %>',
                 'forever stop ./bin/www'].
           join(' && '),
           options: {
                config: "host",
                ignoreErrors: true
           }
       },
       make: {
            command: "mkdir <%= pkg.name %>",
            options: {
                 config: "host",
                 ignoreErrors: true
            }
       },
       change: {
            command: "cd <%= pkg.name %>",
            options: {
                 config: "host",
                 ignoreErrors: true
            }
       }
    },
    nodeunit: {
        all: ['tests/**/*test.js','tests/**/*Test.js'],
        options: {
            reporter: 'junit',
            reporterOptions: {
                output: 'testsOutput'
            }
         }
    },
    bumpup: {
         options: {
              updateProps: {
                 pkg: 'package.json'
              }
         },
         file: 'package.json'
    },
    shell: {
           'git-add':{
                  command: 'git --no-pager add .',
                  options: {
                      stdout: true,
                      stderr: true
                  }
           },
           'git-commit':{
                  command: 'git --no-pager commit -m "versão <%= pkg.version %>"',
                  options: {
                      stdout: true,
                      stderr: true
                  }
           },
           'git-tag':{
                  command: 'git --no-pager tag <%= pkg.version %>',
                  options: {
                      stdout: true,
                      stderr: true
                  }
           },
           'git-push':{
                  command: 'git push notasPJEGitHubServer <%= pkg.version %>',
                  options: {
                      stdout: true,
                      stderr: true
                  }
           }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ssh');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-bumpup');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default',['nodemon']);

  grunt.registerTask('run', ['nodemon']);

  grunt.registerTask('build','builds notasPJEServer', ['clean','copy','bumpup']);

  grunt.registerTask('deploy','sends app to the server', ['sshexec:stop','sshexec:backupDocs','sshexec:remove',
    'sshexec:make','sshexec:change','sftp:deploy','sshexec:restoreDocs','sshexec:start']);

  grunt.registerTask('start', 'start remote', ['sshexec:start']);

  grunt.registerTask('stop', 'stop remote', ['sshexec:stop']);

  grunt.registerTask('backup', 'backup documents',['sshexec:backupDocs']);

  grunt.registerTask('restore', 'reset documents',['sshexec:restoreDocs']);

  grunt.registerTask('test','unit tests',['nodeunit']);

  grunt.registerTask('version',['bumpup']);

  grunt.registerTask('console',['shell']);

};