import Phaser from 'phaser'
import { loding } from './loding.js'
import {GameScene} from './GameScene.js'

const config = {
	type: Phaser.AUTO,
	parent: "app",
	width: 1200,
	height: 600,
	physics: {
	  default: "arcade",
	  arcade: {
		gravity: { y: 200 },
	  },
	},
	scene: [loding,GameScene],
}

export default new Phaser.Game(config)
