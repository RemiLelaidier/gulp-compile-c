//
// gulp-compile-c-cpp-java
// A script that automatically compile a .c or .cpp or .java file from a folder
//
// Created by Remi Lelaidier on 12/10/2016
// Contributor : Ghostfly
// Email : r.lelaidier@hotmail.fr
//

// For install dependancies, run 'npm install'

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

// function date
function dateNow(){
    var date = new Date();
    var time = date.toLocaleTimeString();
    console.log("[" + colors.blue(time) + "]");
}

// Printing function
function print(stdout, stderr){
    var errFormat = stderr.replace(dirname + "/src/", "");
    console.log(stdout);
    if(errFormat.length !== 0){
        console.log(colors.red(errFormat));
    }
}

// Compil c function
function execCompilC(fileName){
    var buildCommand = gcc + srcFolder + fileName + ".c -o " + binFolder + fileName;
    exec(buildCommand, function(error, stdout, stderr){
        dateNow();
        console.log("Compilation de : " + colors.green(fileName + ".c"));
        print(stdout, stderr);
    });
}

// Compil Cpp function
function execCompilCpp(fileName){
    var buildCommand = gpp + srcFolder + filename + ".cpp -o " + binFolder + filename;
    exec(buildCommand, function(error, stdout, stderr){
        dateNow();
        console.log("Compilation de : " + colors.green(fileName + ".cpp"));
        print(stdout, stderr);
    });
}

// Compil Java function
function execCompilJava(fileName){

}

// Compile on launch (C only)
gulp.task('compile',function () {
    var arrayFiles = fs.readdirSync(dirname + "/src/");
    for(var i = 0; i < arrayFiles.length; i++){
        var fileName = arrayFiles[i].replace(".c", "");
        execCompilC(fileName);
    }
});

// Watch change on file
gulp.task('watch', function() {
    /*---- C Language ----*/
    gulp.watch(srcFolder + '*.c').on('change',function (file) {
        var fileName = file.path;
        fileName = fileName.replace(".c", "");
        fileName = fileName.replace(srcFolder, "");
        execCompilC(fileName);
    });

    /*---- C++ Language ----*/
    gulp.watch(srcFolder + '*.cpp').on('change', function (file) {
        var fileName = file.path;
        fileName = fileName.replace(".cpp", "");
        fileName = fileName.replace(srcFolder, '');
        execCompilCpp(fileName);
    });

    /*---- JAVA Language ----*/
    /*gulp.watch(srcFolder + '*.java').on('change', function(file) {
        var fileName = file.path;
        fileName = fileName.replace(".java", "");
        fileName = fileName.replace(srcFolder, '');
        execCompilJava(fileName);
    });*/
});

gulp.task('default',['compile', 'watch'],function(){});
