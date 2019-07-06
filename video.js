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
    this.load.image('test', 'test.png');
    
}
var currentRing = 0;
var rings = [];// .depth = NUMBER
var circles = [];
function create ()
{
    for(var i = 0; i < 200; i++){
        circles[i] = this.add.circle(Phaser.Math.Between(0, width), height/2, Phaser.Math.Between(minParticleSize,maxParticleSize),"0x"+Phaser.Math.Between(0xCCCCCC,0xFFFFFF).toString(16));
        rings[i] = this.add.circle(width/2, height/2, 5 * (200 - i),"0x"+Phaser.Math.Between(0xCCCCCC,0xFFFFFF).toString(16));
        circles[i].xv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
        circles[i].yv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
    }
}
var frame = 0;
var downloadOn = false;
// for EDM visualization
var bpm = 126;
var bps = 126/60 // beats per second
var bpf = 126/30// beats per frame
var fpb = (60*60)/126; // frames per beat
var lastBeat = 0;
function update ()
{
    if(frame > lastBeat + fpb) {
        // bring last ring to front
        rings[currentRing].radius=50;
        rings[currentRing].depth +=200;
        currentRing++;
        if(currentRing > 199) currentRing = 0;
        for(var i = 0; i < circles.length; i++){
            circles[i].y=height/2;
            circles[i].xv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
            circles[i].yv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
            
        }
        lastBeat = frame;
    }
    else{
        for(var i = 0; i < circles.length; i++){
            rings[i].radius = rings[i].radius + 5; // Make ring bigger
            circles[i].x+=circles[i].xv;
            circles[i].y+=circles[i].yv;
            if(circles[i].y>height+50){
                circles[i].y=-50;
            }
            if(circles[i].y<-50){
                circles[i].y=height+50;
            }
            if(circles[i].x>width+50){
                circles[i].x=-50;
            }
            if(circles[i].x<-50){
                circles[i].x=width + 50;
            }
        }
    }
    if(frame < 60 * 60 * 3.2){
        
        if(downloadOn){
            var image    = this.game.canvas.toDataURL();
            download(image, frame + ".png", "image/png");
        }
        frame++;
    }
}
