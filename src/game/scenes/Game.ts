import { EventBus } from '../EventBus';
import { Scene, Input } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    backSpace?: Input.Keyboard.KeyboardPlugin;


    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameText = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);
        //to debug and back to main scene
        this.backSpace = this.input.keyboard?.on("keydown-BACKSPACE", () => this.backGame(), this)

        EventBus.emit('current-scene-ready', this);
    }
    //to debug and back to main scene
    backGame() {
        this.scene.start('MainMenu');
    }
    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
