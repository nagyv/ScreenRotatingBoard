# Screen Rotating Board

There are quite a few dashboards for serious business data, but neither of them fits simple presentation purposes that could be used in public spaces for general, interactive information screens. This project aims to fulfill this need with a simple, JSON configurable single-page website.

A board contains one or more screens that are rotated either after a given time, or after an event happens (e.g. video ends).

There are currently two versions of this repo. This (the `master` branch) can be run on a Raspberry, while the `web` branch can be run in a browser. As video rendering on Raspberry is a bit tricky, running videos from a browser is not recommended.

# Plans for screens

* Simple image to be rotated on timeout - done
* Youtube to be rotated on video end - done
* Static HTML to be rotated on timeout
* Prezi to be rotated on prezentation end
* Google Slide to be rotated on end

# Installations

    apt-get install feh omxplayer youtube-dl
    pip install -r requirements.txt

# Usage

You can get usage instructions by running `screens.py` without any arguments.

# Configuration

Check out the [config.json](https://raw.githubusercontent.com/nagyv/ScreenRotatingBoard/master/config.json) in this repo.

# License

MIT License

Copyright (c) 2018 Viktor Nagy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
