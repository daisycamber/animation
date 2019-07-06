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
var maxParticleSpeed = 50;
var circles = [];
function create ()
{
    for(var i = 0; i < 200; i++){
        circles[i] = this.add.circle(Phaser.Math.Between(0, 3000), Phaser.Math.Between(0, 3000), Phaser.Math.Between(1,50), 0xffffff);
        circles[i].xv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
        circles[i].yv = Phaser.Math.Between(-maxParticleSpeed,maxParticleSpeed);
    }
}
var frame = 0;
var downloadOn = true;
// for EDM visualization
var bpm = 126;
var bps = 100/60 // beats per second
var bpf = 100/30// beats per frame
var lastBeat = 0;
function update ()
{
    console.log(frame);
    if(frame > lastBeat + bpf) {
        for(var i = 0; i < circles.length; i++){
            circles[i].y=1500;
        }
        lastBeat = frame;
    }
    if(frame < 30 * 60 * 3){
        for(var i = 0; i < circles.length; i++){
            circles[i].x+=circles[i].xv;
            circles[i].y+=circles[i].yv;
            if(circles[i].y>3000+20){
                circles[i].y=-20;
            }
            if(circles[i].y<20){
                circles[i].y=3020;
            }
            if(circles[i].x>3000+20){
                circles[i].x=-20;
            }
            if(circles[i].x<20){
                circles[i].x=3020;
            }
        }
        if(downloadOn){
            var image    = this.game.canvas.toDataURL();
            download(image, frame + ".png", "image/png");
        }
        frame++;
    }
}
