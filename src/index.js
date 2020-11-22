import Phaser from "phaser";
// import logoImg from "./assets/logo.png";
import paddle from './assets/player.png'
import ball from './assets/ball.png'

const config = {
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
  },
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
var cursor;
var player;

function preload() {
  this.load.image("paddle", paddle);
  this.load.image('ball', ball)
}

function create() {
  cursor = this.input.keyboard.createCursorKeys()
  console.log(cursor);

  player = this.physics.add.sprite(780, 200, 'paddle');
  player.setCollideWorldBounds(true);
}

function update(){
  if(cursor.up.isDown){
    player.setVelocityY(-150)
  } else if(cursor.down.isDown){
    player.setVelocityY(150)
  } else{
    player.setVelocityY(0)
  }
}
