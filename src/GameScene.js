import Phaser from "phaser";

	
export class GameScene extends Phaser.Scene{
    constructor(){
        super("game-scene")
    }

    preload() {

    this.load.image("background","assets/background.png");
    this.load.image("hand1","assets/hand1.png");
    this.load.image("hand2","assets/hand2.png");
    this.load.image("human","assets/human.png");
    this.load.image("light1","assets/light1.png");
    this.load.image("light2","assets/light2.png");
    this.load.image("cam","assets/cam.png");
    this.load.spritesheet('mosquito', "assets/mosquito.png",{ frameWidth : 100, frameHeight : 100});
    //this.load.spritesheet('mosquito',"assets/mosquito.png",{frameWidth : 100 , frameHeight: 0});
  //  this.load.spritesheet('hand',"assets/hand.png",{frameWidth:300,frameHeight : 0});
}


     create(){
    this.add.image(510,200,"background");
    //사람
    this.player = this.physics.add.staticGroup();
   this.player.create(40,350,"human");
    
    //점수
    this.score = this.add.text(100, 40, 'score:0', { color: '#00000' }).setShadow(0, 0).setDepth(1).setOrigin(0.5);

    
    // 모기 애니매이션
   this.mosquito = this.add.sprite(1200,300,'mosquito');
    this.anims.create({
        key:'flying',
        frames:this.anims.generateFrameNumbers('mosquito',{start:0,end:1}),
        frameRate :10,
        repeat :-1
    });
    this.anims.create({
        key:'suck',
        frames:this.anims.generateFrameNumbers('mosquito',{start:2,end:2}),
        frameRate :10,
        repeat :-1
    });
    // 손 애니메이션


   this.labelContainer = document.getElementById("label-container");

    this.text =this.labelContainer.innerText;
    this.pre = this.add.text(440, 40, this.text, { font: '32px Courier', color: '#00fff0' }).setShadow(1, 1).setDepth(1).setOrigin(0.5);
}

Model_hand(){
    this.text =this.labelContainer.innerText;
    this.pre.setText(this.text);

}

mosquito_play(){
    if(this.mosquito.x <240){
        this.mosquito.anims.play('suck',true);
        this.time.delayedCall(2000, () => {
            this.mosquito.setX(1200);
        });
    }else{
        this.mosquito.setX(this.mosquito.x-3)
        this.mosquito.anims.play('flying',true);

    }
}
update(){
	this.Model_hand();
    this.mosquito_play();
   

}

}


