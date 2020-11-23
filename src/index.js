// import Phaser from "phaser";
// import ballImg from "./assets/ball.png"
// import player1 from "./assets/player.png"
// import pc from "./assets/pc.png"


// const config = {
//   type: Phaser.AUTO,
//   parent: "phaser-example",
//   width: 800,
//   height: 600,
//   scene: {
//     preload: preload,
//     create: create,
//     update: update
//   },
//   physics: {
//     default: 'arcade',
//     arcade : {
//       gravity: false
//     }
//   }
// };

// const game = new Phaser.Game(config);
// let ball;
// let player;
// let comp;
// let isGameStarted = false;
// let cursors;
// let paddleSpeed = 350;
// let keys = {}
// let playerVictoryText;
// let compVictoryText;
// let velocityX = Phaser.Math.Between(-100,100)
// let velocityY = 100
// var playerScore = 0;
// var compScore = 0;
// var playerScoreText;
// var compScoreText;

// function preload() {
//   this.load.image('ballImg', ballImg)
//   this.load.image('player1', player1)
//   this.load.image('comp', pc)
// }

// function create() {
//     ball = this.physics.add.sprite(
//       this.physics.world.bounds.width/2,
//       this.physics.world.bounds.height/2,
//       'ballImg'
//     )
//     ball.setCollideWorldBounds(true)
//     ball.setBounce(1,1);

//     player = this.physics.add.sprite(
//       this.physics.world.bounds.width - (ball.body.width/2 +1),
//       this.physics.world.bounds.height/2,
//       'player1'
//     )
//     player.setImmovable(true)
//     player.setCollideWorldBounds(true)

//     comp = this.physics.add.sprite(
//      ball.body.width/2 +1,
//       this.physics.world.bounds.height/2,
//       'comp'
//     )

//     comp.setImmovable(true)
//     comp.setCollideWorldBounds(true)

//     cursors = this.input.keyboard.createCursorKeys()
//     keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
//     keys.s =  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)

//     this.physics.add.collider(ball, player)
//     this.physics.add.collider(ball, comp)


//     compScoreText = this.add.text(16, 16, 'score: 0', { fontSize: '16px', fill: '#F00' });
//     playerScoreText = this.add.text(700, 16, 'score: 0', { fontSize: '16px', fill: '#00F' });
// }

// function update(){

//   if(!isGameStarted){
//     const initialVelocityX = Math.random() * 150 + 100
//     const initialVelocityY = Math.random() * 150 + 100

//     ball.setVelocityX(initialVelocityX)
//     ball.setVelocityY(initialVelocityY)

//     isGameStarted = true;
//   }

//   if(ball.body.x > player.body.x){
//     compScore += 1
//     compScoreText.setText('Score: ' + compScore)
//     reset()
//     // ball.setVelocityX(0)
//     // ball.setVelocityY(0)
//   }
//   if(ball.body.x < comp.body.x){
//     // console.log('player 1 wins');
//     // ball.setVelocityX(0)
//     // ball.setVelocityY(0) compScore += 1
//     playerScore += 1
//     playerScoreText.setText('Score: ' + playerScore)
//     reset()
//   }

//   player.body.setVelocityY(0)
//   comp.body.setVelocityY(0)
//   if(cursors.up.isDown){
//     player.body.setVelocityY(-paddleSpeed)
//   }
//   if(cursors.down.isDown){
//     player.body.setVelocityY(paddleSpeed)
//   }

//   if(keys.w.isDown){
//     comp.body.setVelocityY(-paddleSpeed)
//   }
//   if(keys.s.isDown){
//     comp.body.setVelocityY(paddleSpeed)
//   }

//   //catch up to the ball
//   if(ball.body.velocity.y > paddleSpeed){
//     ball.body.setVelocityY(paddleSpeed)
//   }
//   if(ball.body.velocity.y < paddleSpeed){
//     ball.body.setVelocityY(-paddleSpeed)
//   }
// }

// function reset()
// {
//   velocityX=Phaser.Math.Between(-100, 100);
//   velocityY=100;
//   ball.x=400;
//   ball.y=200;
//   player.x=780;
//   player.y=200;
//   comp.x=20;
//   comp.y=200;
//   ball.setVelocityX(velocityX);
//   ball.setVelocityY(velocityY);
// }

import Phaser from "phaser";

import TitleScreen from "./scenes/TitleScreen";
import OnePGame from "./scenes/OnePGame";
import TwoPGame from "./scenes/TwoPGame";
//import GameOver from "./scenes/GameOver";
import Preload from "./scenes/Preload";

import * as SceneKeys from "./consts/SceneKeys";


const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  // scene: {
  //   preload: preload,
  //   create: create,
  //   update: update
  // },
  physics: {
    default: 'arcade',
    arcade : {
      gravity: false
    }
  }
};

const game = new Phaser.Game(config);

game.scene.add(SceneKeys.TitleScreen, TitleScreen);
game.scene.add(SceneKeys.TwoPGame, TwoPGame);
game.scene.add(SceneKeys.OnePGame, OnePGame)
//game.scene.add(SceneKeys.GameBackground, GameBackground);
//game.scene.add(SceneKeys.GameOver, GameOver);
game.scene.add(SceneKeys.Preload, Preload);
game.scene.start(SceneKeys.Preload);
