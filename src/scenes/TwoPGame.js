import Phaser from "phaser";

import { GameBackground, GameOver } from "../consts/SceneKeys";
import * as Colors from "../consts/Colors";
//import * as Audio from "../consts/Audio";

//import { PressStart2P } from "../consts/Fonts";

const GameState = {
  Running: "running",
  Player1Won: "player1-won",
  Player2Won: "player2-won",
};

let keys = {}

class TwoPGame extends Phaser.Scene {
  preload() {

  }

  init() {
    this.gameState = GameState.Running;

    this.leftScore = 0;
    this.rightScore = 0;

    this.paused = false;
  }

  create() {
    this.scene.run(GameBackground);
    this.scene.sendToBack(GameBackground);

    this.physics.world.setBounds(-100, 0, 1000, 500);

    this.ball = this.add.circle(400, 250, 10, Colors.White, 1);
    this.physics.add.existing(this.ball);
    //this.ball.body.setCircle(10);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setMaxSpeed(400);
    this.ball.body.setCollideWorldBounds(true, 1, 1);
    this.ball.body.onWorldBounds = true;

    this.player1 = this.add.rectangle(50, 250, 30, 100, Colors.White, 1);
    this.physics.add.existing(this.player1, true);

    this.player2 = this.add.rectangle(750, 250, 30, 100, Colors.White, 1);
    this.physics.add.existing(this.player2, true);

    this.physics.add.collider(
      this.player1,
      this.ball,
      this.handlePaddleBallCollision,
      undefined,
      this
    );

    this.physics.add.collider(
      this.player2,
      this.ball,
      this.handlePaddleBallCollision,
      undefined,
      this
    );

    this.physics.world.on(
      "worldbounds",
      this.handleBallWorldBoundsCollision,
      this
    );

    const scoreStyle = {
      fontSize: 48,
      //fontFamily: PressStart2P,
    };

    this.leftScoreLabel = this.add
      .text(300, 50, "0", scoreStyle)
      .setOrigin(0.5, 0.5);

    this.rightScoreLabel = this.add
      .text(500, 50, "0", scoreStyle)
      .setOrigin(0.5, 0.5);

    this.playerText = this.add
      .text(120, 50, "PLAYER 1",)
      .setOrigin(0.5, 0.5);

    this.compText = this.add
      .text(700, 50, "PLAYER 2",)
      .setOrigin(0.5, 0.5);

    this.cursors = this.input.keyboard.createCursorKeys();
    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keys.p = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    keys.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


    this.pauseGame = this.add
      .text(200, 550, "Press P to Pause")
      .setOrigin(0.5, 0.5);

    this.resumeGame = this.add
      .text(600, 550, "Press R to Reset")
      .setOrigin(0.5, 0.5);

    this.time.delayedCall(1500, () => {
      this.resetBall();
    });

  }

  update() {
    if (this.paused || this.gameState !== GameState.Running) {
      return;
    }

    this.processPlayer1Input();
    this.checkScore();
  }

  handleBallWorldBoundsCollision(body, up, down, left, right) {
    if (left || right) {
      return;
    }

    //this.sound.play(Audio.PongPlop);
  }

  handlePaddleBallCollision(player, ball) {
    //this.sound.play(Audio.PongBeep);

    /** @type {Phaser.Physics.Arcade.Body} */
    const body = this.ball.body;
    const vel = body.velocity;
    vel.x *= 1.05;
    vel.y *= 1.05;

    body.setVelocity(vel.x, vel.y);
  }

  processPlayer1Input() {
    /** @type {Phaser.Physics.Arcade.StaticBody} */
    const body = this.player1.body;

    if (this.cursors.up.isDown) {
      this.player1.y -= 10;
      body.updateFromGameObject();
    }

    if (this.cursors.down.isDown) {
      this.player1.y += 10;
      body.updateFromGameObject();
    }

    if (keys.w.isDown) {
      this.player2.y -= 10;
      this.player2.body.updateFromGameObject();
    }

     if (keys.s.isDown) {
      this.player2.y += 10;
      this.player2.body.updateFromGameObject();
    }

    if(keys.p.isDown){
      this.scene.pause()
    }

    if(keys.r.isDown){
      this.scene.restart()
    }
  }

  checkScore() {
    const x = this.ball.x;
    const leftBounds = -30;
    const rightBounds = 830;
    if (x >= leftBounds && x <= rightBounds) {
      return;
    }

    if (this.ball.x < leftBounds) {
      // scored on the left side
      this.incrementRightScore();
    } else if (this.ball.x > rightBounds) {
      // scored on the right side
      this.incrementLeftScore();
    }

    const maxScore = 7;
    if (this.leftScore >= maxScore) {
      this.gameState = GameState.Player1Won;
    } else if (this.rightScore >= maxScore) {
      this.gameState = GameState.Player2Won;
    }

    if (this.gameState === GameState.Running) {
      this.resetBall();
    } else {
      this.ball.active = false;
      this.physics.world.remove(this.ball.body);

      this.scene.stop(GameBackground);

      // show the game over/win screen
      this.scene.start(GameOver, {
        leftScore: this.leftScore,
        rightScore: this.rightScore,
      });
    }
  }

  incrementLeftScore() {
    this.leftScore += 1;
    this.leftScoreLabel.text = this.leftScore;
  }

  incrementRightScore() {
    this.rightScore += 1;
    this.rightScoreLabel.text = this.rightScore;
  }

  resetBall() {
    this.ball.setPosition(450,200);

    const angle = Phaser.Math.Between(0, 360);
    const vec = this.physics.velocityFromAngle(angle, 300);

    this.ball.body.setVelocity(vec.x, vec.y);
  }
}

export default TwoPGame;
