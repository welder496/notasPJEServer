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
                       src: [ '*/**','!grunt*/**'],
                       dest: '<%= distNodeModules %>'
                 },
                 {
                       expand: true,
                       src: ['*.js','!Grunt*'],
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
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ssh');

  grunt.registerTask('default',['nodemon']);

  grunt.registerTask('run', ['nodemon']);

  grunt.registerTask('build','builds notasPJEServer', ['clean','copy']);

  grunt.registerTask('deploy','sends app to the server', ['sshexec:stop','sshexec:backupDocs','sshexec:remove',
    'sshexec:make','sshexec:change','sftp:deploy','sshexec:restoreDocs','sshexec:start']);

  grunt.registerTask('start', 'start remote', ['sshexec:start']);

  grunt.registerTask('stop', 'stop remote', ['sshexec:stop']);

  grunt.registerTask('backup', 'backup documents',['sshexec:backupDocs']);

  grunt.registerTask('restore', 'reset documents',['sshexec:restoreDocs']);

};