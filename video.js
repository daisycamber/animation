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

var circles = [];
function create ()
{
    for(var i = 0; i < 1000; i++){
        circles[i] = this.add.circle(Phaser.Math.Between(0, 3000), Phaser.Math.Between(0, 3000), Phaser.Math.Between(1,20), 0x6666ff);
        circles[i].xv = Phaser.Math.Between(-2,2);
    }
    var clock = new Phaser.Time.Clock();
}
var frame = 0;
var downloadOn = false;
// for EDM visualization
var bpm = 100;
var bps = 100/60 // beats per second
var lastElapsedSeconds = 0;
function update ()
{
    if(clock.now - lastElapsedSeconds > bps * 1000) {
        for(var i = 0; i < circles.length; i++){
            circles[i].y=1500;
        }
        lastElapsedSeconds = clock.now;
    }
    if(frame < 60 * 60){
        for(var i = 0; i < circles.length; i++){
            circles[i].y+=(circles[i].width-20)/5
            circles[i].x+=circles[i].xv;
            if(circles[i].y>3000+20){
                circles[i].y=-20;
            }
        }
        if(downloadOn){
            var image    = this.game.canvas.toDataURL();
            download(image, frame + ".png", "image/png");
        }
        frame++;
    }
}
