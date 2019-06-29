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
    
    var img = this.add.image(400, 300, 'test');
    img.width = 200;
    var image    = this.game.canvas.toDataURL("image/png");
    
    download(image, "test.png", "image/png");
}

function update ()
{
}
