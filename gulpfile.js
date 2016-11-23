//
// gulp-compile-c-cpp-java
// A script that automatically compile a .c or .cpp or .java file from a folder
//
// Created by Remi Lelaidier on 12/10/2016
// Email : r.lelaidier@hotmail.fr
//

// Dependancies
var gulp = require('gulp');
var exec = require('child_process').exec;

// TODO get current directory
var srcFolder = "/home/leetspeakv2/Travail/MIAGE/S5/SISR/TP/TP2/src/";      // your src directory
var binFolder = "/home/leetspeakv2/Travail/MIAGE/S5/SISR/TP/TP2/bin/";      // your exe directory
var gcc = "gcc ";                                                           // the c compilator
var gpp = "g++ ";                                                           // the c++ compilator
var javac = "javac ";                                                       // the java compilator

// empty task is necessary
gulp.task('compile',function () {});

// The watcher
gulp.task('watch', function() {

    /*---- C Language ----*/
    gulp.watch(srcFolder + '*.c', ['compile']).on('change',function (file) {
        var fileName = file.path;
        fileName = fileName.replace(".c", "");
        fileName = fileName.replace(srcFolder, "");
        var buildCommand = gcc + srcFolder + fileName + ".c -o " + binFolder + fileName;
        exec(buildCommand, function (error, stdout, stderr) {
            console.log(buildCommand);
            console.log(stdout);
            console.log(stderr);
        });
    });

    /*---- C++ Language ----*/
    gulp.watch(srcFolder + '*.cpp', ['compile']).on('change', function (file) {
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

gulp.task('default',['watch'],function(){});
