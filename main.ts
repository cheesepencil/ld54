/// <reference path="./src/titleScene.ts" />
/// <reference path="./src/gameScene.ts" />

// title:  LD54
// author: cheesepencil
// desc:   Limited Space
// script: js

let activeScene: Scene = new TitleScene()
let highScore: number = pmem(0)
const debug = false

function TIC() {
  activeScene.TIC()
}
