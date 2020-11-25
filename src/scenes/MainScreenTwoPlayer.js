import Phaser from 'phaser'
import {TwoPGame, TitleScreen} from '../consts/SceneKeys'
//import OnePGame from './OnePGame'

export default class MainScreen extends Phaser.Scene{

  preload(){

  }

  create(){

    const title = this.add.text(400, 200, 'Are you ready?', {
      fontSize: 38
    })

    title.setOrigin(0.5, 0.5)

    this.add.text(400, 300, 'Press 2 to Start', {

    })
    .setOrigin(0.5)
    this.add.text(400, 350, 'Press B to go back', {

    })
    .setOrigin(0.5)

    this.input.keyboard.once('keydown-TWO', () => {
      this.scene.start(TwoPGame)
    })

    this.input.keyboard.once('keydown-B', () =>{
      this.scene.start(TitleScreen)
    })
  }
}
