//
// gulp-compile-c-cpp
// A script that automatically compile a .c or .cpp or .java file from a folder
//
// Created by Remi Lelaidier on 12/10/2016
// Contributor : Ghostfly
// Email : r.lelaidier@hotmail.fr
//

// For install dependancies, run 'npm install'

// Dependancies
import gulp from 'gulp';

import {exec} from 'child_process';
import fs from "fs";
import colors from "colors/safe";
import confirm from "gulp-confirm";
import {argv} from 'yargs';

const dirname = __dirname;
const srcFolder = `${dirname}/src/`;                                          // your src directory
const binFolder = `${dirname}/bin/`;                                          // Your bin folder
const gcc = "gcc ";                                                           // the c compilator
const gpp = "g++ ";                                                           // the c++ compilator


/*
 * Functions
 */

// TODO
// function asking for launching the file
function confirmRun(fileName) {
    return gulp.src(binFolder).pipe(confirm({
        question : `Launch ${fileName} (y) `,
        input: '_key:y'
    })).pipe(gulp.dest(''));
}

// Get current sys date
function dateNow(){
    const date = new Date();
    const time = date.toLocaleTimeString();
    console.log(`[${colors.blue(time)}]`);
}

// Printing function
function print(stdout, stderr, fileName, buildCommand){
    dateNow();
    console.log(`Compilation de : ${colors.green(fileName + ".c")}`);
    if(argv.v){
        console.log(`Commande : ${colors.blue(buildCommand)}`);
    }
    const errFormat = stderr.replace(`${dirname}/src/`, "");
    console.log(stdout);
    if(errFormat.length !== 0){
        console.log(colors.red(errFormat));
    }
    /* else{
         Prochaine version -> Lancement de l'executable
        confirmRun(fileName);
    }*/
}

// Compil function
function exeCompil(fileName, lang){
    let compilator;
    let extension;
    switch (lang){
        case "c":
            compilator = gcc;
            extension = ".c";
            break;
        case "cpp":
            compilator = gpp;
            extension = ".cpp";
            break;
    }
    // If there is options for the compiler
    if(argv.flags){
        const flags = `--${argv.flags} `;
        var buildCommand = `${compilator + flags + srcFolder + fileName + extension} -o ${binFolder}${fileName}`;
    }
    else{
        var buildCommand = `${compilator + srcFolder + fileName + extension} -o ${binFolder}${fileName}`;
    }
    exec(buildCommand, (error, stdout, stderr) => {
        print(stdout, stderr, fileName, buildCommand);
    });
}

/*
 * Tasks
 */
// Compile on launch (C only)
gulp.task('compile',() => {
    const arrayFiles = fs.readdirSync(`${dirname}/src/`);
    for(let i = 0; i < arrayFiles.length; i++){
        const fileName = arrayFiles[i].replace(".c", "");
        exeCompil(fileName, "c");
    }
});

// Watch change on file
gulp.task('watch', () => {
    /*---- C Language ----*/
    gulp.watch(`${srcFolder}*.c`).on('change',file => {
        let fileName = file.path;
        fileName = fileName.replace(".c", "");
        fileName = fileName.replace(srcFolder, "");
        exeCompil(fileName, "c");
    });

    /*---- C++ Language ----*/
    gulp.watch(`${srcFolder}*.cpp`).on('change', file => {
        let fileName = file.path;
        fileName = fileName.replace(".cpp", "");
        fileName = fileName.replace(srcFolder, '');
        exeCompil(fileName, "cpp");
    });
});

gulp.task('default',['compile', 'watch'],() => {});
