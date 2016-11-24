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

// Printing function
function print(stdout, stderr){
    var errFormat = stderr.replace(dirname + "/src/", "");
    console.log(stdout);
    if(errFormat.length !== 0){
        console.log(colors.red(errFormat));
    }
}

// Compile on launch (C only)
gulp.task('compile',function () {
    var arrayFiles = fs.readdirSync(dirname + "/src/");
    for(var i = 0; i < arrayFiles.length; i++){
        var fileName = arrayFiles[i].replace(".c", "");
        console.log(colors.green("Compilation de : " + arrayFiles[i]));
        var buildCommand = gcc + srcFolder + arrayFiles[i] + " -o " + binFolder + fileName;
        exec(buildCommand, function(error, stdout, stderr){
            print(stdout, stderr);
        });
    }
});

// Watch change on file
gulp.task('watch', function() {
    /*---- C Language ----*/
    gulp.watch(srcFolder + '*.c').on('change',function (file) {
        var fileName = file.path;
        fileName = fileName.replace(".c", "");
        fileName = fileName.replace(srcFolder, "");
        var buildCommand = gcc + srcFolder + fileName + ".c -o " + binFolder + fileName;
        exec(buildCommand, function(error, stdout, stderr){
            console.log(colors.green(buildCommand));
            print(stdout, stderr);
        });
    });

    /*---- C++ Language ----*/
    gulp.watch(srcFolder + '*.cpp').on('change', function (file) {
        var filename = file.path;
        filename = filename.replace(".cpp", "");
        filename = filename.replace(srcFolder, '');
        var buildCommand = gpp + srcFolder + filename + ".cpp -o " + binFolder + filename;
        exec(buildCommand, function(error, stdout, stderr){
            console.log(colors.green(buildCommand));
            print(stdout, stderr);
        });
    });

    /*---- JAVA Language ----*/
    /*gulp.watch(srcFolder + '*.java').on('change', function(file) {
        var filename = file.path;
        filename = filename.replace(".java", "");
        filename = filename.replace(srcFolder, '');
        var buildCommand = javac + srcFolder + filename + ".java"
    });*/
});

gulp.task('default',['compile', 'watch'],function(){});
