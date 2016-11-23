//
// gulp-compile-c-cpp-java
// A script that automatically compile a .c or .cpp or .java file from a folder
//
// Created by Remi Lelaidier on 12/10/2016
// Contributor : Ghostfly
// Email : r.lelaidier@hotmail.fr
//

// Dependancies
var gulp = require('gulp');
var exec = require('child_process').exec;
var fs = require("fs");
var colors = require("colors/safe");


var dirname = __dirname;
var srcFolder = dirname + "/src/";                                          // your src directory
var binFolder = dirname + "/bin/";                                          // Your bin folder
var gcc = "gcc ";                                                           // the c compilator
var gpp = "g++ ";                                                           // the c++ compilator
var javac = "javac ";                                                       // the java compilator

// Compile on launch
gulp.task('compile',function () {
    var arrayFiles = fs.readdirSync(dirname + "/src/");
    for(var i = 0; i < arrayFiles.length; i++){
        var name = arrayFiles[i].replace(".c", "");
        console.log("Compilation de : " + name);
        var buildCommand = gcc + srcFolder + arrayFiles[i] + " -o " + binFolder + name;
        exec(buildCommand, function (error, stdout, stderr) {
            console.log(colors.blue(buildCommand));
            console.log(stdout);
            console.log(colors.red(stderr));
        });
    }
});

// The watcher
gulp.task('watch', function() {
    /*---- C Language ----*/
    gulp.watch(srcFolder + '*.c', ['compile']).on('change',function (file) {
        var fileName = file.path;
        fileName = fileName.replace(".c", "");
        fileName = fileName.replace(srcFolder, "");
        var buildCommand = gcc + srcFolder + fileName + ".c -o " + binFolder + fileName;
        exec(buildCommand, function (error, stdout, stderr) {
            console.log(colors.blue(buildCommand));
            console.log(stdout);
            console.log(colors.red(stderr));
        });
    });

    /*---- C++ Language ----*/
    gulp.watch(srcFolder + '*.cpp', ['compile']).on('change', function (file) {
        var filename = file.path;
        filename = filename.replace(".cpp", "");
        filename = filename.replace(srcFolder, '');
        var buildCommand = gpp + srcFolder + filename + ".cpp -o " + binFolder + filename;
        exec(buildCommand, function(error, stdout, stderr){
            console.log(colors.blue(buildCommand));
            console.log(stdout);
            console.log(colors.red(stderr));
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
