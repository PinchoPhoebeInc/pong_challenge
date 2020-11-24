import Phaser from "phaser";
import ballImg from "../assets/ball.png";
import player1 from "../assets/player.png";
import pc from "../assets/pc.png";

let ball;
let player;
let comp;
let isGameStarted = false;
let cursors;
let paddleSpeed = 400;
let keys = {};
let velocityX = Phaser.Math.Between(-100, 100);
let velocityY = 100;
let playerScore = 0;
let compScore = 0;
let playerScoreText;
let compScoreText;

const GameState = {
  Running: "running",
  Player1Won: "player1-won",
  Player2Won: "player2-won",
};

class TwoPGame extends Phaser.Scene {

  preload() {
    this.load.image("ballImg", ballImg);
    this.load.image("player1", player1);
    this.load.image("comp", pc);
  }

  init(){
    this.gameState = GameState.Running
    this.playerScore = 0;
    this.compScore = 0;

    this.paused = false;
  }

  create() {
    ball = this.physics.add.sprite(
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2,
      "ballImg"
    );
    ball.setCollideWorldBounds(true);
    ball.setBounce(1, 1);

    player = this.physics.add.sprite(
      this.physics.world.bounds.width - (ball.body.width / 2 + 1),
      this.physics.world.bounds.height / 2,
      "player1"
    );
    player.setImmovable(true);
    player.setCollideWorldBounds(true);

    comp = this.physics.add.sprite(
      ball.body.width / 2 + 1,
      this.physics.world.bounds.height / 2,
      "comp"
    );

    comp.setImmovable(true);
    comp.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    this.physics.add.collider(ball, player);
    this.physics.add.collider(ball, comp);

    compScoreText = this.add
    .text(300, 30, "0", {
      fontSize: "32px",
      fill: "#F00",
    })
    .setOrigin(0.1, 0.1);
    playerScoreText = this.add
    .text(500, 30, "0", {
      fontSize: "32px",
      fill: "green",
    })
    .setOrigin(0.1, 0.1);
  }

  update() {
    if (!isGameStarted) {
      const initialVelocityX = Math.random() * 150 + 100;
      const initialVelocityY = Math.random() * 150 + 100;

      ball.setVelocityX(initialVelocityX);
      ball.setVelocityY(initialVelocityY);

      isGameStarted = true;
    }

    if (this.paused || this.gameState !== GameState.Running) {
      return;
    }

    if (ball.body.x > player.body.x) {
      compScore += 1;
      compScoreText.setText(compScore);
      this.reset();
    }
    if (ball.body.x < comp.body.x) {
      playerScore += 1;
      playerScoreText.setText(playerScore);
      this.reset();
    }

    const maxScore = 2;

    if(this.playerScore >= maxScore){
      this.gameState = GameState.Player1Won
      console.log('player 1 won!')
    } else if(this.compScore >= maxScore){
      this.gameState = GameState.Player2Won
      console.log('player 2 won!')
    }

    player.body.setVelocityY(0);
    comp.body.setVelocityY(0);
    if (cursors.up.isDown) {
      player.body.setVelocityY(-paddleSpeed);
    }
    if (cursors.down.isDown) {
      player.body.setVelocityY(paddleSpeed);
    }

    if (keys.w.isDown) {
      comp.body.setVelocityY(-paddleSpeed);
    }
    if (keys.s.isDown) {
      comp.body.setVelocityY(paddleSpeed);
    }

    if (ball.body.velocity.y > paddleSpeed) {
      ball.body.setVelocityY(paddleSpeed);
    }
    if (ball.body.velocity.y < paddleSpeed) {
      ball.body.setVelocityY(-paddleSpeed);
    }
  }

  reset() {
    velocityX = Phaser.Math.Between(-100, 100);
    velocityY = 100;
    ball.x = 400;
    ball.y = 200;
    player.x = 780;
    player.y = 200;
    comp.x = 20;
    comp.y = 200;
    ball.setVelocityX(velocityX);
    ball.setVelocityY(velocityY);
  }

}


export default TwoPGame
