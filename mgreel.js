#! /usr/bin/env node
/*
 * ================================== mgreel.js ===============================
 *
 * mgreel.js is a JavaScript/Node script to convert one or more Wave files to a
 * single Make Noise Morphagene reel (Wave file 32bit/48khz/stereo).
 *
 * All files are concatenated and splice markers are set at the end of each
 * input files. Mono Wave files are converted to stereo.
 *
 * Example:
 *      mgreel --out out.wav mywav/*.wav
 *
 */

var fs = require('fs');
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var wavefile = require('wavefile');

const sampleRate = 48000.0;
const bitDepth = '32f';

if (!argv._.length) {
    console.error("call `mgreel --out out.wav input1.wav input2.wav ...`");
    process.exit();
}

// splicesL|R is an array of samples for each input file (splice). Samples are
// resampled to 32f/48khz.
let splicesL = [];
let splicesR = [];
argv._.forEach(function(file) {
    let buf = fs.readFileSync(file);
    let wav = new wavefile.WaveFile(buf);
    wav.toBitDepth(bitDepth);
    wav.toSampleRate(sampleRate);
    let samples = wav.getSamples(false);
    if (wav.fmt.numChannels == 2) {
        splicesL.push(samples[0]);
        splicesR.push(samples[1]);
    } else {
        splicesL.push(samples);
        splicesR.push(samples);
    }
});

// totalLength contains total number of samples.
let totalLength = splicesL.reduce(function(total, splice) { return total + splice.length }, 0);

// samplesL|R are arrays with the final samples.
let samplesL = new Float64Array(totalLength);
let samplesR = new Float64Array(totalLength);
let currentOffset = 0;
splicesL.forEach(function(splice) {
    samplesL.set(splice, currentOffset);
    currentOffset += splice.length;
});
currentOffset = 0;
splicesR.forEach(function(splice) {
    samplesR.set(splice, currentOffset);
    currentOffset += splice.length;
});


// Assemble final wav.
let wav = new wavefile.WaveFile();
wav.fromScratch(2, sampleRate, bitDepth, [samplesL, samplesR]);

// Set cue points based on splices length.
currentOffset = 0;
splicesL.forEach(function(splice) {
    if (currentOffset > 0) {
        wav.setCuePoint({position: currentOffset/sampleRate*1000});
    }
    currentOffset += splice.length;
});

// MG requires that dwPosition is set to same value as dwSampleOffset.
wav.cue.points.forEach(function(point) {
    point.dwPosition = point.dwSampleOffset
});

if (argv.out) {
    fs.writeFileSync(argv.out, wav.toBuffer());
} else {
    process.stdout.write(wav.toBuffer());
}
