var videoLength = 3.2;
var minParticleSize = 1;
var maxParticleSpeed = 10;
var width = 1920;
var height = 1080;
var maxParticleSize = width/30;
var config = {
    type: Phaser.CANVAS,
    width: width,
    height: height,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

var game = new Phaser.Game(config);

function preload ()
{
    this.game.canvas.id = 'canvas';    
}
var currentRing = 0;
var rings = [];// .depth = NUMBER
var circles = [];
var graphics;

function drawLine(x,y,xx,xy, angle){
    return new Phaser.Geom.Line(200, 300, 600, 300);
}
    

var dataArray;
var barWidth;

var bars = [];

function create ()
{
    this.cameras.main.setBackgroundColor("0xffffff");
    graphics = this.add.graphics();
    graphics.lineStyle(2, 0x000000, 1);
    
    audio = new Audio();
    context = new (window.AudioContext || window.webkitAudioContext)();
    analyser = context.createAnalyser();
    
    audio.src = "Portals.mp3"; // the source path
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 256;
    
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    analyser.getByteFrequencyData(dataArray);
    console.log("Frequency bin count is " + analyser.frequencyBinCount);
    
    barWidth = 1920/analyser.frequencyBinCount;
    
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
        //console.log(dataArray[i]);
        bars[i] = new Phaser.Geom.Rectangle(i * barWidth, 0, barWidth, 0);
    }
    
    audio.play();
    
    
}
var frame = 0;
var downloadOn = false;
// for EDM visualization
var bpm = 126;
var bps = 126/60 // beats per second
var bpf = 126/30// beats per frame
var fpb = (60*60)/bpm; // frames per beat
var halfBeat = fpb/2;
var lastBeat = 0;
var lastHalfBeat = 0;

// Called every frame except the beat
function move(){
    analyser.getByteFrequencyData(dataArray);
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
        bars[i] = new Phaser.Geom.Rectangle(i * barWidth, 0, barWidth, dataArray[i]/10);
    }
    
}
// Called every beat
function beat(){
    
}
function update ()
{
    if(frame > lastBeat + fpb) {
        beat();
    }
    else{
        move();
    }
    if(frame < 60 * 60 * videoLength){  
        if(downloadOn){
            var image    = this.game.canvas.toDataURL();
            download(image, frame + ".png", "image/png");
        }
    }
    frame++;
}
