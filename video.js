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

function create ()
{
}
var frame = 0;
function update ()
{
    
    if(frame < 10){
         this.add.circle(200 * (frame+1), 200, 80, 0x6666ff);
        var image    = this.game.canvas.toDataURL();
        download(image, frame + ".png", "image/png");
        frame++;
    }
}
