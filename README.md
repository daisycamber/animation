# animation
A repo for music video animation.

How to use:
Navigate to index.html (jasperholton.github.io/animation) and wait for the project to render (downloads will stop). Then navigate to downloads in Ubuntu command line (I'm using Windows but any OS works) and use FFMPEG to convert the individual frames to a seamless animated video! Command is below for reference:
$ ffmpeg -r 60 -f image2 -s 1920x1080 -i %01d.png -vcodec libx264 -crf 25 -pix_fmt yuv420p test.mp4
Note: Firefox seems to work best. Larger videos will crash chrome.
