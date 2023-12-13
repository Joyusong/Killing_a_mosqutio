import Phaser from "phaser";

	
export class loding extends Phaser.Scene{
    constructor(){
        super("loding")
    }
    preload() {
        this.load.image("background","assets/background.png");
        this.load.image("hand1","assets/hand1.png");
        this.load.image("hand2","assets/hand2.png");
        this.load.image("human","assets/human.png");
        this.load.image("light1","assets/light1.png");
        this.load.image("light2","assets/light2.png");
       this.load.spritesheet('mosquito',"assets/mosquito.png",{frameWidth : 100 , frameHeight: 100});
    
    }

    create(){
        //백그라운드 이미지
             this.add.image(510,200,"background");
         //사람
         this.player = this.physics.add.staticGroup();
        this.player.create(40,350,"human");
        this.mosquito = this.add.sprite(240,300,'mosquito');
        this.mosquito2 = this.add.sprite(1000,300,'mosquito');

        this.anims.create({  //사람에 닿았을 시 피빨기
            key:'suck',
            frames:this.anims.generateFrameNumbers('mosquito',{start:2,end:2}),
            frameRate :10,
            repeat :-1
        });

        this.anims.create({  //모기 나는 모션
            key:'flying',
            frames:this.anims.generateFrameNumbers('mosquito',{start:0,end:1}),
            frameRate :10,
            repeat :-1  
        });
        this.mosquito2.anims.play('flying',true);
        this.mosquito.anims.play('suck',true);
        this.title = this.add.text(600,100,"killing a mosquito")
                            .setFill("#F15F5F")
                            .setFontSize(50)
                            .setOrigin(0.5)
                            .setDepth(500);
        

        this.click = this.add.text(600,500,"click to start")
                            .setFill("#FFFFF")
                            .setFontSize(25)
                            .setOrigin(0.5)
                            .setDepth(500);
              //tween 애니메이션(깜빡임) 추가
              this.tweens.add({
                targets:this.click,
                alpha:0,//밝기(0~1)
                duration:1000,//지속시간(ms)
                repeat:-1,//반복(무한)
                yoyo:true,//요요처리
                ease:'EaseInOut',//타이밍함수



                
            });
        this.input.once('pointerdown',()=>{// 클릭 이벤트
            this.scene.transition({target:'game-scene',duration :500})
        });
    }
    update(){

    }
}