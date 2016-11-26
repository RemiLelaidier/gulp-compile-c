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
var confirm = require("gulp-confirm");
var argv = require('yargs').argv;


var dirname = __dirname;
var srcFolder = dirname + "/src/";                                          // your src directory
var binFolder = dirname + "/bin/";                                          // Your bin folder
var gcc = "gcc ";                                                           // the c compilator
var gpp = "g++ ";                                                           // the c++ compilator
var javac = "javac ";                                                       // the java compilator


/*
        FUNCTIONS
 */
// TODO
// function asking for launching the file
function confirmRun(fileName) {
    return gulp.src(binFolder).pipe(confirm({
        question : "Launch " + fileName + " (y) ",
        input: '_key:y'
    })).pipe(gulp.dest(''));
}

// function date
function dateNow(){
    var date = new Date();
    var time = date.toLocaleTimeString();
    console.log("[" + colors.blue(time) + "]");
}

// Printing function
function print(stdout, stderr, fileName){
    var errFormat = stderr.replace(dirname + "/src/", "");
    console.log(stdout);
    if(errFormat.length !== 0){
        console.log(colors.red(errFormat));
    }
    else{
        confirmRun(fileName);
    }
}

// Compil function
function exeCompil(fileName, lang){
    var compilator;
    var extension;
    switch (lang){
        case "c":
            compilator = gcc;
            extension = ".c";
            break;
        case "cpp":
            compilator = gpp;
            extension = ".cpp";
            break;
        /*case "java":
            compilator = javac;
            extension = ".java";
            break;*/
    }
    var buildCommand = compilator + srcFolder + fileName + extension + " -o " + binFolder + fileName;
    exec(buildCommand, function(error, stdout, stderr){
        dateNow();
        console.log("Compilation de : " + colors.green(fileName + ".c"));
        print(stdout, stderr, fileName);
    });
}

/*
        TASKS
 */
// Compile on launch (C only)
gulp.task('compile',function () {
    var arrayFiles = fs.readdirSync(dirname + "/src/");
    for(var i = 0; i < arrayFiles.length; i++){
        var fileName = arrayFiles[i].replace(".c", "");
        exeCompil(fileName, "c");
    }
});

// Watch change on file
gulp.task('watch', function() {
    /*---- C Language ----*/
    gulp.watch(srcFolder + '*.c').on('change',function (file) {
        var fileName = file.path;
        fileName = fileName.replace(".c", "");
        fileName = fileName.replace(srcFolder, "");
        exeCompil(fileName, "c");
    });

    /*---- C++ Language ----*/
    gulp.watch(srcFolder + '*.cpp').on('change', function (file) {
        var fileName = file.path;
        fileName = fileName.replace(".cpp", "");
        fileName = fileName.replace(srcFolder, '');
        exeCompil(fileName, "cpp");
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
