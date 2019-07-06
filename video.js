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
    for(var i = 0; i < 100; i++){
        circles[i] = this.add.circle(Phaser.Math.Between(0, 3000), Phaser.Math.Between(0, 3000), Phaser.Math.Between(1,20), 0x6666ff);
    }
}
var frame = 0;
var downloadOn = false;

function update ()
{
    if(frame < 60 * 100){
        for(var i = 0; i < circles.length; i++){
            circles[i].y+=Phaser.Math.Between(1,3);
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
