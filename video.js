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
    var path = new Phaser.Curves.Path(x, y);
    path.lineTo(xx, xy);
    path.draw(graphics);
}
    
var centerX = 1920/2;

var trunkHeight = 100;
var branchLengthRatio = 0.75;
var branchAngleDifference = 0.27;
var branchingDepth = 10;

function drawTree(x1, y1, x2, y2, branchLength,
                  branchAngle, depth){
  if(depth == 0)
    return;
  else{
    drawLine(x1,x2,y1,y2);
    branchLength *= branchLengthRatio;
    
    function branch(angle){
      var branchX2 = x2 + branchLength * Math.cos(angle);
      var branchY2 = y2 + branchLength * Math.sin(angle);
      drawTree(x2, y2, branchX2, branchY2, branchLength,
               angle, depth - 1);
    }
    
    // Right branch
    branch(branchAngle + branchAngleDifference);
    
    // Left branch
    branch(branchAngle - branchAngleDifference);
  }
}


/*
canvas.addEventListener("mousemove",function(e){
  branchLengthRatio = e.x / 300;
  branchAngleDifference = e.y / canvas.height * Math.PI;
  redrawTree();
  console.log("branchLengthRatio = "+branchLengthRatio);
  console.log("branchAngleDifference = "+branchAngleDifference);
});*/



function create ()
{
    this.cameras.main.setBackgroundColor("0xffffff");
    graphics = this.add.graphics();
    graphics.lineStyle(2, 0x000000, 1);
    
    drawTree(1920/2,1080,1920/2,1080-trunkHeight,trunkHeight * branchLengthRatio, - Math.PI/2, branchingDepth);
    
    audio = new Audio();
    context = new (window.AudioContext || window.webkitAudioContext)();
    analyser = context.createAnalyser();
    
    audio.src = "Portals.mp3"; // the source path
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
 
    
    var dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    analyser.getByteFrequencyData(dataArray);
    
    for (var i = 0; i < analyser.frequencyBinCount; i++) {
        console.log(dataArray[i]);
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
