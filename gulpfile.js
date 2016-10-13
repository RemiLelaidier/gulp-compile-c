//
// Created by Remi Lelaidier on 12/10/2016
// Email : r.lelaidier@hotmail.fr
//

var gulp = require('gulp');
var exec = require('child_process').exec;

// your src directory
var binSrc = "/home/user/...";

// your exe directory
var exeSrc = "/home/user/...";

// the compilator and his arguments
var gcc = "gcc --std=c99 ";

// task empty is necessary
gulp.task('empty',function () {
});

// The watcher
gulp.task('watch', function() {
    // When a .c file is modified
    gulp.watch(binSrc + '*.c', ['empty']).on('change',function (file) {
        var fileName = file.path;
        fileName = fileName.replace(".c", "");
        fileName = fileName.replace(binSrc, "");
        // Create the buildCommand
        var buildCommand = gcc + binSrc + fileName + ".c -o " + exeSrc + fileName;
        exec(buildCommand, function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
    });
});

gulp.task('default',['watch'],function(){});
