import Phaser from "phaser";
// import logoImg from "./assets/logo.png";
import paddle from './assets/player.png'
import ballImg from './assets/ball.png'
import paddle2 from './assets/pc.png'

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
var comp;
var ball;
var velocityX = Phaser.Math.Between(-100,100)
var velocityY = 100
var playerScore = 0;
var compScore = 0;
var playerTextSc;
var compTextSc;


function preload() {
  this.load.image("paddle", paddle);
  this.load.image('paddle2', paddle2)
  this.load.image('ballImg', ballImg);

}

function create() {
  cursor = this.input.keyboard.createCursorKeys()

  player = this.physics.add.sprite(780, 200, 'paddle');
  player.setCollideWorldBounds(true);

  comp = this.physics.add.sprite(20, 200, 'paddle2');
  comp.setCollideWorldBounds(true);

  this.keyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

  this.keyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

  ball = this.physics.add.sprite(400, 200, 'ballImg');

  ball.setCollideWorldBounds(true);
  ball.setBounce(1);

  ball.setVelocityY(velocityY);
  ball.setVelocityX(velocityX);

  this.physics.add.collider(ball, player, hit, null, this)
  this.physics.add.collider(ball, comp, hitComp, null, this);

  compTextSc = this.add.text(16, 16, 'score: 0', { fontSize: '16px', fill: '#F00' });
  playerTextSc = this.add.text(700, 16, 'score: 0', { fontSize: '16px', fill: '#00F' });
}

function update(){

  if(cursor.up.isDown){
    player.setVelocityY(-150)
  } else if(cursor.down.isDown){
    player.setVelocityY(150)
  } else{
    player.setVelocityY(0)
  }

  if(this.keyW.isDown)
  {
    comp.setVelocityY(-150);
  }
  else if(this.keyS.isDown)
  {
    comp.setVelocityY(150);
  }
  else
  {
    comp.setVelocityY(0);
  }

  if(ball.x==796)
  {
    compScore += 1;
    compTextSc.setText('Score: ' + compScore);
    reset();

  }

  if(ball.x==4)
  {
    playerScore += 1;
    playerTextSc.setText('Score: ' + playerScore);
    reset();
  }
}

function hit(ball, player){
  velocityX=velocityX+50;
  velocityX=velocityX*-1;
  console.log(velocityX);

  ball.setVelocityX(velocityX);

  if(velocityY < 0){
    velocityY = velocityY * -1
    ball.setVelocityY(velocityY)
  }

  player.setVelocityX(-1)
}

function hitComp(ball, comp){
  velocityX=velocityX-50;
  velocityX=velocityX*-1;
  console.log(velocityX);
  ball.setVelocityX(velocityX);


  if(velocityY<0)
  {
    velocityY=velocityY*-1
    ball.setVelocityY(velocityY);
  }
  comp.setVelocityX(1);

}

function reset(){
  velocityX=Phaser.Math.Between(-100, 100);
  velocityY=100;
  ball.x=400;
  ball.y=200;
  player.x=780;
  player.y=200;
  comp.x=20;
  comp.y=200;
  ball.setVelocityX(velocityX);
  ball.setVelocityY(velocityY);
}
