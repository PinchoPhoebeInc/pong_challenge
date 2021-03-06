import Phaser from "phaser";

import TitleScreen from "./scenes/TitleScreen";
import OnePGame from "./scenes/OnePGame";
import TwoPGame from "./scenes/TwoPGame";
import GameOver from "./scenes/GameOver";
import Preload from "./scenes/Preload";
import GameBackground from "./scenes/GameBackground"
import MainScreen from "./scenes/MainScreen"
import MainScreenTwoPlayer from "./scenes/MainScreenTwoPlayer"

import * as SceneKeys from "./consts/SceneKeys";


const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
			gravity: { y: 0 },
			debug: false
		}
  },
};

const game = new Phaser.Game(config);

game.scene.add(SceneKeys.TitleScreen, TitleScreen);
game.scene.add(SceneKeys.TwoPGame, TwoPGame);
game.scene.add(SceneKeys.OnePGame, OnePGame)
game.scene.add(SceneKeys.GameBackground, GameBackground);
game.scene.add(SceneKeys.GameOver, GameOver);
game.scene.add(SceneKeys.Preload, Preload);
game.scene.add(SceneKeys.MainScreen, MainScreen);
game.scene.add(SceneKeys.MainScreenTwoPlayer, MainScreenTwoPlayer)
game.scene.start(SceneKeys.Preload);
