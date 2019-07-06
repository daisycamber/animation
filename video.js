var config = {
    type: Phaser.CANVAS,
    width: 3000,
    height: 3000,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.game.canvas.id = 'canvas';
    this.load.image('test', 'test.png');
    
}
var maxParticleSpeed = 25;
var circles = [];
function create ()
{
    for(var i = 0; i < 200; i++){
        circles[i] = this.add.circle(Phaser.Math.Between(0, 3000), 1500, Phaser.Math.Between(1,50),"0xffffff");
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
var fpb = (60*30)/126; // frames per beat
var lastBeat = 0;
function update ()
{
    if(frame > lastBeat + fpb) {
        for(var i = 0; i < circles.length; i++){
            circles[i].y=1500;
        }
        lastBeat = frame;
    }
    else{
        for(var i = 0; i < circles.length; i++){
            circles[i].x+=circles[i].xv;
            circles[i].y+=circles[i].yv;
            if(circles[i].y>3000+50){
                circles[i].y=-50;
            }
            if(circles[i].y<-50){
                circles[i].y=3050;
            }
            if(circles[i].x>3000+50){
                circles[i].x=-50;
            }
            if(circles[i].x<-50){
                circles[i].x=3050;
            }
        }
    }
    if(frame < 30 * 60 * 3){
        
        if(downloadOn){
            var image    = this.game.canvas.toDataURL();
            download(image, frame + ".png", "image/png");
        }
        frame++;
    }
}
