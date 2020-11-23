import Phaser from 'phaser'


export default class TitleScreen extends Phaser.Scene{

  preload(){

  }

  create(){
    const title = this.add.text(400, 200, 'Welcome to Pong!', {
      fontSize: 38
    })

    title.setOrigin(0.5, 0.5)

    this.add.text(400, 300, 'Press 1 or 2 for number of players', {

    })
    .setOrigin(0.5)

    this.input.keyboard.once('keydown-ONE', () => {
      //this.scene.start(1PLGame)
    })

    this.input.keyboard.once('keydown-TWO', () =>{
      //this.scene.start(2PLGame)
    })
  }
}
