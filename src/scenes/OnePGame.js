import Phaser from "phaser";
import ballImg from "../assets/ball.png";
import player1 from "../assets/player.png";
import pc from "../assets/pc.png";

import { GameBackground, GameOver, MainScreen } from "../consts/SceneKeys";
//import * as Colors from "../consts/Colors";
//import * as AudioKeys from "../consts/AudioKeys";

//import { PressStart2P } from "../consts/Fonts";

const GameState = {
  Running: "running",
  PlayerWon: "player-won",
  AIWon: "ai-won",
};

class OnePGame extends Phaser.Scene {
  preload() {
    this.load.image("ballImg", ballImg);
    this.load.image("player1", player1);
    this.load.image("comp", pc);

  }

  init() {
    this.gameState = GameState.Running;

    this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);

    this.leftScore = 0;
    this.rightScore = 0;

    this.paused = false;
  }

  create() {
    this.scene.run(GameBackground);
    this.scene.sendToBack(GameBackground);
    //this.scene.pause()
    // this.scene.start(MainScreen);
    // this.input.keyboard.once('keydown-SPACE', () => {
    //   // this.scene.start(OnePGame)
    //   this.scene.resume(this)
    // })

    this.physics.world.setBounds(-100, 0, 1000, 500);

    //this.ball = this.add.circle(400, 250, 10, Colors.White, 1);
    this.ball = this.add.sprite(
      400,
      250,
      "ballImg"
    );
    this.physics.add.existing(this.ball);
    //this.ball.body.setCircle(10);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setMaxSpeed(400);

    this.ball.body.setCollideWorldBounds(true, 1, 1);
    this.ball.body.onWorldBounds = true;

    // this.ball = this.physics.add.sprite(
    //   this.physics.world.bounds.width / 2,
    //   this.physics.world.bounds.height / 2,
    //   "ballImg"
    // );
    // this.ball.setCollideWorldBounds(true);
    // this.ball.setBounce(1, 1);

    //this.paddleLeft = this.add.rectangle(50, 250, 30, 100, Colors.White, 1);
    this.player = this.add.sprite(
      50,
      250,
      "player1"
    );
    this.physics.add.existing(this.player, true);
    // this.player.body.setCollideWorldBounds(true);
    // this.player.body.onWorldBounds = true;

    //this.paddleRight = this.add.rectangle(750, 250, 30, 100, Colors.White, 1);
    this.comp = this.add.sprite(
      750,
      250,
      "comp"
    );
    this.physics.add.existing(this.comp, true);
    // this.comp.body.setCollideWorldBounds(true, 1, 1);

    this.physics.add.collider(
      this.player,
      this.ball,
      this.handlePaddleBallCollision,
      undefined,
      this
    );
    this.physics.add.collider(
      this.comp,
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


    this.cursors = this.input.keyboard.createCursorKeys();


    this.pauseGame = this.add
      .text(200, 550, "Press P for Pause")
      .setOrigin(0.5, 0.5);

    this.resumeGame = this.add
      .text(600, 550, "Press R for Resume")
      .setOrigin(0.5, 0.5);


    this.time.delayedCall(1500, () => {
      this.resetBall();
    });


  }

  update() {
    if (this.paused || this.gameState !== GameState.Running) {
      return;
    }

    this.processPlayerInput();
    this.updateAI();
    this.checkScore();
  }

  handleBallWorldBoundsCollision(body, up, down, left, right) {
    if (left || right) {
      return;
    }

    //this.sound.play(AudioKeys.PongPlop);
  }

  handlePaddleBallCollision(player, ball) {
    //this.sound.play(AudioKeys.PongBeep);

    /** @type {Phaser.Physics.Arcade.Body} */
    const body = this.ball.body;
    const vel = body.velocity;
    vel.x *= 1.05;
    vel.y *= 1.05;

    body.setVelocity(vel.x, vel.y);
  }

  processPlayerInput() {
    /** @type {Phaser.Physics.Arcade.StaticBody} */
    const body = this.player.body;

    if (this.cursors.up.isDown) {
      this.player.y -= 10;
      body.updateFromGameObject();
    } else if (this.cursors.down.isDown) {
      this.player.y += 10;
      body.updateFromGameObject();
    }

    let keys = {}

    keys.p = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    keys.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    console.log(keys)

    for(let key in keys){
      console.log(key)
      if(key === 'p'){
          this.input.keyboard.once('keydown-P', () => {
        // .text(400, 550, "Press P for Pause")
        // .setOrigin(0.5, 0.5);
        this.scene.pause()
      })
      } else {
        this.input.keyboard.once('keydown-R', () => {

          this.scene.launch(this)

        },this)
      }
    }

    // this.input.keyboard.once('keydown-P', () => {
    //   // .text(400, 550, "Press P for Pause")
    //   // .setOrigin(0.5, 0.5);
    //   this.scene.pause()
    //   this.pauseGame.destroy()
    //   this.resumeGame = this.add
    //   .text(400, 550, "Press R for Resume")
    //   .setOrigin(0.5, 0.5);
    // })


  }



  updateAI() {
    const diff = this.ball.y - this.comp.y;
    if (Math.abs(diff) < 10) {
      return;
    }

    const aiSpeed = 3;
    if (diff < 0) {
      // ball is above the paddle
      this.paddleRightVelocity.y = -aiSpeed;
      if (this.paddleRightVelocity.y < -10) {
        this.paddleRightVelocity.y = -10;
      }
    } else if (diff > 0) {
      // ball is below the paddle
      this.paddleRightVelocity.y = aiSpeed;
      if (this.paddleRightVelocity.y > 10) {
        this.paddleRightVelocity.y = 10;
      }
    }

    this.comp.y += this.paddleRightVelocity.y;
    this.comp.body.updateFromGameObject();
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

    const maxScore = 2;
    if (this.leftScore >= maxScore) {
      this.gameState = GameState.PlayerWon;
      console.log('player 1 won!')
    } else if (this.rightScore >= maxScore) {
      this.gameState = GameState.AIWon;
      console.log('player 2 won!')
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
    this.ball.setPosition(400, 250);

    const angle = Phaser.Math.Between(0, 360);
    const vec = this.physics.velocityFromAngle(angle, 300);

    this.ball.body.setVelocity(vec.x, vec.y);
  }
}

export default OnePGame;
