import { GameObjects, Scene, Input, FX } from 'phaser';
import { Animations } from '@/types/types';
import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo?: GameObjects.Image;
    title: GameObjects.Text;
    spaceBar?: Input.Keyboard.KeyboardPlugin;
    fxShadow: FX.Shadow;
    logoTween: Phaser.Tweens.Tween | null;


    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(512, 300, 'logo').setDepth(100);

        const title = this.add.text(512, 460, 'Press SPACE to start', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const fxShadow = title.preFX?.addShadow(0, 0, 0.006, 2, 0x333333, 10);

        this.add.tween({
            targets: title,
            scale: 1.05,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        this.add.tween({
            targets: fxShadow,
            x: 5,
            y: -5,
            duration: 800,
            yoyo: true,
            repeat: -1
        })

        this.spaceBar = this.input.keyboard?.on("keydown-SPACE", () => this.startGame(), this)
        
     // animation creation
        const animations = this.cache.json.get('animations') as Animations

        for (const [key, anim] of Object.entries(animations.animations)) {
            this.anims.create({
                key: key,
                frames: this.anims.generateFrameNumbers('player', {start: anim.start, end: anim.end}),
                frameRate: anim.frameRate,
                repeat: anim.repeat
                })
                }
        const player = this.add.sprite(500, 500, 'player')
        player.play('idle')

        EventBus.emit('current-scene-ready', this);
    }
    showSelect () {

    }
    startGame () {
        this.scene.start("Game", {
    });
    }
    changeScene ()
    {
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start('Game');
    }

}
