var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('test', 'test.png');
}

function create ()
{
var img = this.add.image(400, 300, 'test');
    img.width = 800;
}

function update ()
{
}
