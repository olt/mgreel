mgreel.js
=========

mgreel.js is a JavaScript/Node script to convert one or more Wave files to a
single Make Noise Morphagene reel (Wave file 32bit/48khz/stereo).

All files are concatenated and splice markers are set at the end of each
input files. Mono Wave files are converted to stereo.

Example:
     mgreel --out out.wav mywav/*.wav

Web version
-----------

A standalone web version is available here: https://www.lorenzostanco.com/lab/morphagene/#mgreel

Requirements
------------

- You need to know how to use the command line of your system (MacOS, Win, Linux).
- You need Node.js (https://nodejs.org).
- Download this repository.
- Change to this directory and call `npm link`.
- Call `mgreel --out out.wav mywav/*.wav`


License
-------

Copyright 2020 Oliver Tonnhofer

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
