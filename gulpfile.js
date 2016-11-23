//
// gulp-compile-c-cpp-java
// A script that automatically compile a .c or .cpp or .java file from a folder
//
// Created by Remi Lelaidier on 12/10/2016
// Contributor : Ghostfly
// Email : r.lelaidier@hotmail.fr
//

// Dependencies
var gulp = require('gulp'); // Gulp
var colors = require('colors'); // npm install colors -> Colors in the terminal
var exec = require('child_process').exec;
var fs = require("fs"); // Node Filesystem

var dirname = __dirname; // Current working directory
var srcFolder = dirname + "/src/";                                          // your src directory
var binFolder = dirname + "/bin/";                                          // your bin directory
var gcc = "gcc ";                                                           // the c compilator
var gpp = "g++ ";                                                           // the c++ compilator
var javac = "javac ";                                                       // the java compilator

gulp.task('compile',function () {
    var arrayFiles = fs.readdirSync(dirname + "/src/");
    for(var i = 0; i < arrayFiles.length; i++){
        var name = arrayFiles[i].replace(".c", "");
        console.log("Compilation de : ".green + name);
        var buildCommand = gcc + srcFolder + arrayFiles[i] + " -o " + binFolder + name;
        exec(buildCommand);
    }
});

// The watcher
gulp.task('watch', function() {
    /*---- C Language ----*/
    gulp.watch(srcFolder + '*.c').on('change',function (file) {
        var fileName = file.path;
        fileName = fileName.replace(".c", "");
        fileName = fileName.replace(srcFolder, "");
        var buildCommand = gcc + srcFolder + fileName + ".c -o " + binFolder + fileName;
        exec(buildCommand, function (error, stdout, stderr) {
            var errFormat = stderr.replace(dirname + "/src/", "");
            console.log(fileName.green + ".c" + " compilé" );
            console.log(stdout);
            console.log(errFormat);
            if(errFormat.length !== 0){
                console.log("Erreur : ".red + errFormat);
            }
        });
    });

    /*---- C++ Language ----*/
    gulp.watch(srcFolder + '*.cpp').on('change', function (file) {
        var filename = file.path;
        filename = filename.replace(".cpp", "");
        filename = filename.replace(srcFolder, '');
        var buildCommand = gpp + srcFolder + filename + ".cpp -o " + binFolder + filename;
        exec(buildCommand, function(error, stdout, stderr){
            console.log(buildCommand);
            console.log(stdout);
            console.log(stderr);
        });
    });

    /*---- JAVA Language ----*/
    /*gulp.watch(srcFolder + '*.java', ['compile']).on('change', function(file) {
        var filename = file.path;
        filename = filename.replace(".java", "");
        filename = filename.replace(srcFolder, '');
        var buildCommand = javac + srcFolder + filename + ".java"
    });*/
});

gulp.task('default',['compile', 'watch'],function(){});