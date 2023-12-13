import Phaser from "phaser";

	
export class GameScene extends Phaser.Scene{
    constructor(){
        super("game-scene")
    }
  
    preload() {
        this.handCount = 0;// 손 동작 딜레이용도
        //에셋 불러오기
    
    this.load.image("background","assets/background.png");
    this.load.image("hand1","assets/hand1.png");
    this.load.image("hand2","assets/hand2.png");
    this.load.image("human","assets/human.png");
    this.load.image("light1","assets/light1.png");
    this.load.image("light2","assets/light2.png");
    this.load.image("cam","assets/cam.png");
   this.load.spritesheet('mosquito',"assets/mosquito.png",{frameWidth : 100 , frameHeight: 100});
    this.load.spritesheet('hand',"assets/hand.png",{frameWidth:300,frameHeight : 300});
    this.load.spritesheet('heart',"assets/heart.png",{frameWidth:190,frameHeight : 198});

   
   
   
   //로고 바 생성 최하단 위치  
   // 로딩바 동작 안함 > phaser3 엔진과 최신버젼의 노드의 호환성 문제로 추측 > 노드 버젼 확인시 손 쥐기 딜레이를 확인하는 용도로 쓰일것
   // this.load.baseURL = 'https://yungjoong.github.io/';
//    this.load.image('logo',  'angular.png');
}


     create(){
   //백그라운드 이미지
        this.add.image(510,200,"background");
    //사람
    this.player = this.physics.add.staticGroup();
   this.player.create(40,350,"human");
        
        //킬 카운트와 모기의 속도 
   this.kill = 0;
    this.speed = 10;
    this.grap = true;
    //점수 초기생성
    this.score = this.add.text(100, 40, 'kill : ' +this.kill, { color: '#00000' }).setShadow(0, 0).setDepth(1).setOrigin(0.5);
    //생명
    this.life = 0;
    this.heart = this.add.sprite(200,40,'heart');
    this.heart.setScale(0.3,0.3);
    this.heartBool=true;
    this.anims.create({
        key:'heart4',
        frames:this.anims.generateFrameNames('heart',{start:4,end:4}),
        frameRate:10,
        repeat : 0
        
    });
    this.anims.create({
        key:'heart3',
        frames:this.anims.generateFrameNames('heart',{start:3,end:3}),
        frameRate:10,
        repeat : 0
        
    });
    this.anims.create({
        key:'heart2',
        frames:this.anims.generateFrameNames('heart',{start:2,end:2}),
        frameRate:10,
        repeat : 0
        
    });
    this.anims.create({
        key:'heart1',
        frames:this.anims.generateFrameNames('heart',{start:1,end:1}),
        frameRate:10,
        repeat : 0
        
    });
    this.anims.create({
        key:'heart0',
        frames:this.anims.generateFrameNames('heart',{start:0,end:0}),
        frameRate:10,
        repeat : 0
        
    });
    // 모기 애니매이션
    this.mosquito = this.add.sprite(1200,300,'mosquito');
    this.anims.create({  //모기 나는 모션
        key:'flying',
        frames:this.anims.generateFrameNumbers('mosquito',{start:0,end:1}),
        frameRate :10,
        repeat :-1  
    });
    this.anims.create({  //사람에 닿았을 시 피빨기
        key:'suck',
        frames:this.anims.generateFrameNumbers('mosquito',{start:2,end:2}),
        frameRate :10,
        repeat :-1
    });
    // 손 애니메이션
    this.hand = this.add.sprite(500,250,'hand'); // x 범위 +-150
    this.anims.create({
        key:'paper',
        frames:this.anims.generateFrameNumbers('hand',{start:0,end:0}),
        frameRate :10,
        repeat :0,
        
    });
    this.anims.create({
        key:'rock',
        frames:this.anims.generateFrameNumbers('hand',{start:1,end:1}),
        frameRate :10,
        repeat :0
    });
   this.labelContainer = document.getElementById("label-container");
    // html에서 데이터 불러오기  
    //> 전역변수 또는 데이터 전송 함수로는 동작안함 > 아마 phaser 엔진 내부의 문제로 추측 > html에서 phaser엔진을 사용 시 일반적인 js를 불러오는 과정이 아닌 phaser 엔진 내부에서 js를 호출해서 발생하는 문제로 추측
    this.text =this.labelContainer.innerText;
    // 아마도 전역변수와 데이터 전송함수가 동작 안하는 것과 같은 문제로 추측됨
}
// 손 모션을 확인하여 hand 애니메이션 바꾸기 , 모기 잡기 
//>> phaser 엔진 내부의 충돌함수를 사용해야 하나 제대로 동작 안함 > 타 컴퓨터로 사용 시 제대로 동작하는 것을 보아 메모리를 과도하게 잡아먹어서 발생하는 문제로 추측됨

// 딥러닝에서 핸드 모션을인식하는 메소드
hand_moction(){
    // hand 모션이 paper 인가 rock인가 
    if (parseFloat(this.pre[0]).toFixed(2) <parseFloat(this.pre[1]).toFixed(2)|| this.handCount>0 ){
        this.hand.anims.play("paper",true);
    }else if(this.handCount<=0){
        this.time.delayedCall(1000, () => { // 주먹 모션이 1초간 송출되고 그 이후에  손을 펴도록 설계
            if(this.handCount<0){
            this.handCount = 60;
            }
        });
            this.hand.anims.play("rock",true);
        if(this.mosquito.x>=350 && this.mosquito.x<=650 && this.grap){ // 모기가 손 객체의 범위에 닿을 경우
            this.grap = false;
            if(!this.grap){
                this.mosquito.setX(1200);
                this.mosquito.setVisible(false);
            this.time.delayedCall(2000, () => {
                this.kill = this.kill +1;
                if(this.speed <40){  this.speed = this.speed + 1;  }
                this.grap = true;
                this.mosquito.setVisible(true);
            });
        }
            this.score.setText("kill : "+this.kill);
        }   
    }

    
}

Model_hand(){
    this.text =this.labelContainer.innerText;
    this.pre = this.text.split(":");
    this.hand_moction();

}

mosquito_play(){
    if(this.mosquito.x <240){  // 사람에 닿을 경우 
        this.mosquito.anims.play('suck',true);

        if(this.heartBool && this.life<=4){    
        this.life= this.life+1;
        this.heartBool = false;
        switch(this.life){
            case 0 :
               this.heart.anims.play("heart0",true);
               break;
            case 1 :
                this.heart.anims.play("heart1",true);
               break;
               case 2 :
                this.heart.anims.play("heart2",true);
               break;
               case 3 :
                this.heart.anims.play("heart3",true);
               break;
               case 4 :
                this.heart.anims.play("heart4",true);
               break;
               default:
                this.scene.transition({target:'loding',duration :500})

        }
        }
        this.time.delayedCall(2000, () => {
        this.mosquito.setX(1200);

        if(!this.heartBool){this.heartBool=true; }
        });
    }else{ //아직 사람에 닿지 않앗을 경우 
        if(this.grap){
        this.mosquito.setX(this.mosquito.x-this.speed)
        this.mosquito.anims.play('flying',true);
        this.mosquito_Y();
        }
    }
}

mosquito_Y(){
    let Yran = Math.floor(Math.random()*10);
    if(this.mosquito.y > 400){
        this.mosquito.y = this.mosquito.y-Yran;
    }else if (this.mosquito.y <100){
        this.mosquito.y = this.mosquito.y+Yran;
    }else if(Yran %2 ==1){
        this.mosquito.y = this.mosquito.y-Yran;
    }else{
        this.mosquito.y = this.mosquito.y+Yran;    
    }
}
update(){ //1초당 60번 업데이트
	this.Model_hand();
    this.mosquito_play();

        this.handCount = this.handCount-1;


}

}


