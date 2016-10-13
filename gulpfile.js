var gulp = require('gulp');
var exec = require('child_process').exec;
var buildCommand = "gcc --std=c99 bin/.c -o exe/";
var binSrc = "/home/leetspeakv2/Travail/MIAGE/S5/SISR/TP/TP1/bin/";
var exeSrc = "/home/leetspeakv2/Travail/MIAGE/S5/SISR/TP/TP1/exe/";

gulp.task('empty',function () {
});

gulp.task('watch', function() {
    gulp.watch('bin/*.c', ['empty']).on('change',function (file) {
        var fileName = file.path;
        fileName = fileName.replace(".c", "");
        fileName = fileName.replace(binSrc, "");
        var buildCommand = "gcc --std=c99 " + binSrc + fileName + ".c -o " + exeSrc + fileName;
        exec(buildCommand, function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
        });
    });
});

gulp.task('default',['watch'],function(){});