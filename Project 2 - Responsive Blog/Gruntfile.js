/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'gm',
          sizes: [
            {
            /*
            Change these:

            width: ,
            suffix: ,
            quality:
            */
            name:"sm",
            suffix:"_1x",
            quality:60,
            width:600
          },
          {
          /*
          Change these:

          width: ,
          suffix: ,
          quality:
          */
          name:"sm",
          suffix:"_2x",
          quality:60,
          width:1200
        },
        {
        /*
        Change these:

        width: ,
        suffix: ,
        quality:
        */
        name:"md",
        suffix:"_1x",
        quality:60,
        width:900
        },
        {
        /*
        Change these:

        width: ,
        suffix: ,
        quality:
        */
        name:"md",
        suffix:"_2x",
        quality:60,
        width:1800
        },
        {
        /*
        Change these:

        width: ,
        suffix: ,
        quality:
        */
        name:"lg",
        suffix:"_1x",
        quality:60,
        width:1440
        },
        {
        /*
        Change these:

        width: ,
        suffix: ,
        quality:
        */
        name:"lg",
        suffix:"_2x",
        quality:60,
        width:2880
        }
        ]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'images/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['images'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'images_src/fixed/*.{gif,jpg,png}',
          dest: 'images/'
        }]
      },
    },

    sass: {
      build: {
        files: [{
          src: 'scss/styles.scss',
          dest: 'css/main.css'
        }]
      },
    },
  });

  //load tasks
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-sass');

  //register tasks
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images', 'sass']);

};
