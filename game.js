var __extends=this&&this.__extends||function(){var n=function(t,e){return(n=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(t,e){t.__proto__=e}:function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}))(t,e)}
return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null")
function __(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(__.prototype=e.prototype,new __)}}()
var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var e,n=1,s=arguments.length;n<s;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])
return t}).apply(this,arguments)}
var Constants=function(){function Constants(){}return Constants.SCREEN_WIDTH=240,Constants.SCREEN_HEIGHT=136,Constants.MAP_WIDTH_DEFAULT=30,Constants.MAP_HEIGHT_DEFAULT=17,Constants}()
var Vector=function(){function Vector(t,e){var n=this
this.getLength=function(){return Math.sqrt(Math.pow(n.x,2)+Math.pow(n.y,2))},this.x=t,this.y=e}return Vector.prototype.getNormal=function(){var t=this.getLength()
return new Vector(this.x/t,this.y/t)},Vector}()
var DEFAULT_CAMERA_BOUNDS={v1:new Vector(0,0),v2:new Vector(0,0)}
var Camera=function(){function Camera(){this.x=0,this.y=0,this.offsetX=-Constants.SCREEN_WIDTH/2,this.offsetY=-Constants.SCREEN_HEIGHT/2,this.bounds=DEFAULT_CAMERA_BOUNDS,this.lerpX=.5,this.lerpY=.5}return Camera.prototype.configure=function(t){var e
this.x=null!=(e=null==t?void 0:t.x)?e:0,this.y=null!=(e=null==t?void 0:t.y)?e:0,this.bounds=null!=(e=null==t?void 0:t.bounds)?e:DEFAULT_CAMERA_BOUNDS,this.target=null==t?void 0:t.target,this.lerpX=null!=(e=null==t?void 0:t.lerpX)?e:.5,this.lerpY=null!=(e=null==t?void 0:t.lerpY)?e:.5,this.offsetX=null!=(e=null==t?void 0:t.offsetX)?e:-Constants.SCREEN_WIDTH/2,this.offsetY=null!=(e=null==t?void 0:t.offsetY)?e:-Constants.SCREEN_HEIGHT/2},Camera.prototype.update=function(){var t
this.target&&(t=Util.lerp(this.x-this.offsetX,this.target.x,this.lerpX),this.setX(Math.floor(t+this.offsetX)),t=Util.lerp(this.y-this.offsetY,this.target.y,this.lerpY),this.setY(Math.floor(t+this.offsetY)))},Camera.prototype.centerOn=function(t){this.setX(t.x+this.offsetX),this.setY(t.y+this.offsetY)},Camera.prototype.setX=function(t){this.x=Util.clamp(t,this.bounds.v1.x,this.bounds.v2.x)},Camera.prototype.setY=function(t){this.y=Util.clamp(t,this.bounds.v1.y,this.bounds.v2.y)},Camera}()
var SpriteConfig=function(){this.x=0,this.y=0,this.widthSprites=1,this.heightSprites=1,this.index=0,this.colorKey=[0],this.flipX=!1}
var Sprite=function(){function Sprite(t,e){this.update=function(){},this.scene=t,this.x=e.x||0,this.y=e.y||0,this.widthSprites=e.widthSprites||1,this.w=8*this.widthSprites,this.heightSprites=e.heightSprites||1,this.h=8*this.heightSprites,this.index=e.index,this.colorKey=e.colorKey,this.flipX=e.flipX}return Sprite.prototype.draw=function(){spr(this.index,this.x-this.scene.camera.x,this.y-this.scene.camera.y,this.colorKey,1,this.flipX?1:0,0,this.widthSprites,this.heightSprites)},Sprite}()
var Scene=function(){var c=this
this.camera=new Camera,this.sprites=[],this.platforms=[],this.init=function(){},this.update=function(){},this.draw=function(){},this.initialized=!1,this.TIC=function(){c.initialized||(c.init(),c.initialized=!0),c.update()
for(var t=0,e=c.platforms;t<e.length;t++)e[t].update()
for(var n=0,s=c.sprites;n<s.length;n++)s[n].update()
c.camera.update(),c.draw(),c.map&&map(c.map.x,c.map.y,c.map.w,c.map.h,-c.camera.x,-c.camera.y)
for(var i=0,a=c.platforms;i<a.length;i++)a[i].draw()
for(var o=0,r=c.sprites;o<r.length;o++)r[o].draw()}}
var TitleScene=function(t){function TitleScene(){var i=null!==t&&t.apply(this,arguments)||this
return i.actors=[],i.tweens=[],i.transitioning=!1,i.catButtSpeed=1,i.init=function(){i.tweens.push(new PositionTween({target:i.camera,durationFrames:Util.secondsToFrames(1),startX:Constants.SCREEN_WIDTH,endX:0,callback:i.animateTitles.bind(i)})),i.actors.push(new Background)
var t=new Box(i)
t.x=Constants.SCREEN_WIDTH/2-64-24,t.w=90,i.actors.push(t)
t=new Cat(i)
t.x=128,t.right=!1,t.w=60,i.cat=t,i.actors.push(t)
t=new CallToAction(i)
i.actors.push(t)},i.update=function(){for(var t=0,e=i.tweens;t<e.length;t++)e[t].TIC()
for(var n=0,s=i.actors;n<s.length;n++)s[n].update();(i.cat&&110<i.cat.w||i.cat&&i.cat.w<60)&&(i.catButtSpeed*=-1),i.cat&&(i.cat.w+=i.catButtSpeed)},i.draw=function(){for(var t=0,e=i.actors;t<e.length;t++)e[t].draw()
print("high score: ".concat(highScore),4-i.camera.x,Constants.SCREEN_HEIGHT-16-i.camera.y,14),print("a game for ludum dare #54 by @cheesepencil",4-i.camera.x,Constants.SCREEN_HEIGHT-8-i.camera.y,14)},i}return __extends(TitleScene,t),TitleScene.prototype.animateTitles=function(){var t=new FancyText
t.text="if i fits",t.x=2*Constants.SCREEN_WIDTH+16,t.y=8,t.marginY=2,t.marginX=2,t.bubbleSize=2,t.backgroundColor=14,t.textColor=12,t.scale=3,t.smallFont=!0,(t.scene=this).actors.push(t)
var e=new FancyText
e.text="I SITS!",e.x=2*Constants.SCREEN_WIDTH+24,e.y=32,e.marginY=4,e.marginX=4,e.bubbleSize=3,e.backgroundColor=14,e.textColor=12,e.scale=4,(e.scene=this).actors.push(e),this.tweens.push(new PositionTween({target:t,startX:t.x,endX:16,durationFrames:Util.secondsToFrames(1),delayFrames:Util.secondsToFrames(0),easing:Easing.easeOutOvershoot,callback:function(){sfx(4)}})),this.tweens.push(new PositionTween({target:e,startX:Constants.SCREEN_WIDTH+24,endX:32,durationFrames:Util.secondsToFrames(1),delayFrames:Util.secondsToFrames(.5),easing:Easing.easeInQuart,callback:function(){sfx(4)}}))
t=new Instructions(this)
t.x=-200,this.tweens.push(new PositionTween({target:t,startX:t.x,endX:6,durationFrames:Util.secondsToFrames(1),delayFrames:Util.secondsToFrames(1.5)})),this.actors.push(t)},TitleScene}(Scene)
var Instructions=function(){function Instructions(t){this.x=6,this.y=66,this.scene=t}return Instructions.prototype.update=function(){},Instructions.prototype.draw=function(){print("left: halt left side of cat",this.x-this.scene.camera.x,this.y-this.scene.camera.y,12),print("right: halt right side of cat",this.x-this.scene.camera.x,this.y+9-this.scene.camera.y,12),print("Z: halt the whole cat",this.x-this.scene.camera.x,this.y+18-this.scene.camera.y,12)},Instructions}()
var CallToAction=function(){function CallToAction(t){this.ticks=0,this.x=50,this.y=101,this.show=!1,this.fancyText=new FancyText,this.init=!1,this.pushed=!1,this.fancyText.text="press Z to start",this.fancyText.x=this.x,this.fancyText.y=this.y,this.fancyText.marginX=2,this.fancyText.marginY=2,this.fancyText.bubbleSize=2,this.fancyText.backgroundColor=12,this.fancyText.textColor=2,this.fancyText.smallFont=!0,this.fancyText.scene=t,this.scene=t}return CallToAction.prototype.update=function(){this.ticks+=1,this.ticks>Util.secondsToFrames(2)&&(this.ticks=0,this.init=!0),this.init&&(this.ticks>Util.secondsToFrames(.5)&&(this.ticks=0,this.show=!this.show),btnp(4))&&!this.pushed&&(sfx(8),this.scene.tweens.push(new PositionTween({target:this.scene.camera,startX:this.scene.camera.x,endX:Constants.SCREEN_WIDTH,durationFrames:Util.secondsToFrames(1),easing:Easing.easeInQuad,callback:function(){return activeScene=new GameScene}})),this.pushed=!0)},CallToAction.prototype.draw=function(){this.show&&this.fancyText.draw()},CallToAction}()
var Util=function(){function Util(){}
// Simulates PICO-8's sin(), which takes "turns" as input instead of rads
return Util.picoSin=function(t){t*=2*Math.PI
return-Math.sin(t)},
// Simulates PICO-8's cos(), which takes "turns" as input instead of rads
Util.picoCos=function(t){t*=2*Math.PI
return Math.cos(t)},Util.clamp=function(t,e,n){return Math.min(Math.max(t,e),n)},Util.round=function(t){return Math.floor(t+.5)},Util.pal=function(t,e){if(null!=t&&null!=e)poke4(32736+t,e)
else for(var n=0;n<16;n++)poke4(32736+n,n)},Util.getRandomInt=function(t){return Math.floor(Math.random()*t)},Util.getRandomIntBetween=function(t,e){return t+Math.floor(Math.random()*(e-t))},Util.secondsToFrames=function(t){return Math.floor(60*t)},Util.lerp=function(t,e,n){return t+(e-t)*n},Util.invlerp=function(t,e,n){return e-t==0?0:(n-t)/(e-t)},Util}()
var FancyText=function(){function FancyText(){var o=this
this.text="Some fancy text!",this.x=0,this.y=0,this.scale=1,this.fixedWidth=!1,this.smallFont=!1,this.textColor=0,this.backgroundColor=12,this.bubbleSize=0,this.marginX=0,this.marginY=0,this.baseHeight=6,this.update=function(){},this.draw=function(){var t
clip(0,0,0,0)
var e=o.printMe(0,0)
clip()
var n=null!=(t=null==(t=null==(t=o.scene)?void 0:t.camera)?void 0:t.x)?t:0
var s=null!=(t=null==(t=null==(t=o.scene)?void 0:t.camera)?void 0:t.y)?t:0
var i={x:o.x-o.marginX,y:o.y-o.marginY,w:e+2*o.marginX,h:o.baseHeight*o.scale+2*o.marginY}
if(null!=o.backgroundColor&&0<o.bubbleSize&&(rect(i.x-n,i.y-s,i.w,i.h,o.backgroundColor),0<o.bubbleSize))for(var a=1;a<=o.bubbleSize;a+=1)rect(i.x-a-n,i.y+a-s,i.w+2*a,i.h-2*a,o.backgroundColor)
o.printMe(n,s)}}return FancyText.prototype.printMe=function(t,e){return isNaN(Number(this.outlineColor))||(print(this.text,this.x-t+1,this.y-e,this.outlineColor,this.fixedWidth,this.scale,this.smallFont),print(this.text,this.x-t-1,this.y-e,this.outlineColor,this.fixedWidth,this.scale,this.smallFont),print(this.text,this.x-t,this.y-e+1,this.outlineColor,this.fixedWidth,this.scale,this.smallFont),print(this.text,this.x-t,this.y-e-1,this.outlineColor,this.fixedWidth,this.scale,this.smallFont)),print(this.text,this.x-t,this.y-e,this.textColor,this.fixedWidth,this.scale,this.smallFont)},FancyText}()
var CatConstants=function(){function CatConstants(){}return CatConstants.FRONT_W=2,CatConstants.FRONT_H=4,CatConstants.FRONT_WALK_FRAMES=[266,262,266,270],CatConstants.REAR_W=4,CatConstants.REAR_H=4,CatConstants.REAR_WALK_FRAMES=[328,324,328,332],CatConstants.TAIL_W=2,CatConstants.TAIL_H=4,CatConstants.TAIL_WALK_FRAMES=[264],CatConstants.HEAD_W=4,CatConstants.HEAD_H=4,CatConstants.HEAD_IDLE=388,CatConstants.HEAD_SAD=392,CatConstants.HEAD_YAY=396,CatConstants.BODY_COLOR=14,CatConstants.CAT_Y=88,CatConstants}()
var Cat=function(){function Cat(t){this.x=0,this.y=CatConstants.CAT_Y,this.w=48,this.right=!0,this.bodyFrameIndex=0,this.headFrame=CatConstants.HEAD_IDLE,this.animSpeed=Util.secondsToFrames(.125),this.ticks=0,this.hide=!1,this.clip=!1,this.silent=!0,this.scene=t}return Cat.prototype.update=function(){this.ticks+=1,this.ticks>this.animSpeed&&(this.ticks=0,this.bodyFrameIndex+=1,4<=this.bodyFrameIndex&&(this.bodyFrameIndex=0),this.silent||sfx(0))},Cat.prototype.draw=function(){if(!this.hide){var t=this.scene.camera.x
var e=this.scene.camera.y
this.clip&&clip(0,0,Constants.SCREEN_WIDTH,112)
var n=(this.right?this.x+this.w-8*CatConstants.FRONT_W:this.x+1)-t
var s=this.y-e
Util.pal(14,0),Util.pal(15,0)
for(var i=-1;i<=1;i+=2)spr(CatConstants.FRONT_WALK_FRAMES[this.bodyFrameIndex],n+i,s,0,void 0,this.right?void 0:1,void 0,CatConstants.FRONT_W,CatConstants.FRONT_H),spr(CatConstants.FRONT_WALK_FRAMES[this.bodyFrameIndex],n,s+i,0,void 0,this.right?void 0:1,void 0,CatConstants.FRONT_W,CatConstants.FRONT_H)
Util.pal(),spr(CatConstants.FRONT_WALK_FRAMES[this.bodyFrameIndex],n,s,0,void 0,this.right?void 0:1,void 0,CatConstants.FRONT_W,CatConstants.FRONT_H)
var a=(this.right?this.x+1:this.x+this.w-8*CatConstants.REAR_W)-t
var o=this.y-e
Util.pal(14,0),Util.pal(15,0)
for(i=-1;i<=1;i+=2)spr(CatConstants.REAR_WALK_FRAMES[this.bodyFrameIndex],a+Math.abs(i)*(this.right?-1:1),o,0,void 0,this.right?void 0:1,void 0,CatConstants.REAR_W,CatConstants.REAR_H),spr(CatConstants.REAR_WALK_FRAMES[this.bodyFrameIndex],a,o+i,0,void 0,this.right?void 0:1,void 0,CatConstants.REAR_W,CatConstants.REAR_H)
var r,c
Util.pal(),spr(CatConstants.REAR_WALK_FRAMES[this.bodyFrameIndex],a,o,0,void 0,this.right?void 0:1,void 0,CatConstants.REAR_W,CatConstants.REAR_H),48<this.w&&(r=(this.right?this.x+8*CatConstants.REAR_W:this.x+8*CatConstants.FRONT_W)-t,c=this.y+5-e,rectb(r,c-1,this.w-8*CatConstants.REAR_W-8*CatConstants.FRONT_W+1,21,0),rect(r,c,this.w-8*CatConstants.REAR_W-8*CatConstants.FRONT_W+1,19,CatConstants.BODY_COLOR)),Util.pal(14,0)
var h=(this.right?this.x+1:this.x+this.w-8*CatConstants.TAIL_W)-t
var u=this.y-8*CatConstants.TAIL_H-e
for(i=-1;i<=1;i+=2)spr(CatConstants.TAIL_WALK_FRAMES[0],h+i,u,0,void 0,this.right?void 0:1,void 0,CatConstants.TAIL_W,CatConstants.TAIL_H),spr(CatConstants.TAIL_WALK_FRAMES[0],h,u+i,0,void 0,this.right?void 0:1,void 0,CatConstants.TAIL_W,CatConstants.TAIL_H)
Util.pal(),spr(CatConstants.TAIL_WALK_FRAMES[0],h,u,0,void 0,this.right?void 0:1,void 0,CatConstants.TAIL_W,CatConstants.TAIL_H),line(this.right?3+h:9+h,this.y-e,this.right?7+h:8+h+4,this.y-e,CatConstants.BODY_COLOR),clip()
var l=(this.right?this.x+this.w-8*CatConstants.HEAD_W+20+1:this.x-20)-t
var d=this.y-10-e
Util.pal(14,0),Util.pal(15,0)
for(i=-1;i<=1;i+=2)spr(this.headFrame,l+i,d,0,void 0,this.right?void 0:1,void 0,CatConstants.HEAD_W,CatConstants.HEAD_H),spr(this.headFrame,l,d+i,0,void 0,this.right?void 0:1,void 0,CatConstants.HEAD_W,CatConstants.HEAD_H)
Util.pal(),spr(this.headFrame,l,d,0,void 0,this.right?void 0:1,void 0,CatConstants.HEAD_W,CatConstants.HEAD_H),debug&&(line(this.x-t,this.y-e,this.x-t,this.y+64-e,6),line(this.x+this.w-t,this.y-e,this.x+this.w-t,this.y+64-e,6))}},Cat}()
var BoxConstants=function(){function BoxConstants(){}return BoxConstants.MIN_BOX_WIDTH=36,BoxConstants.BOX_SPRITES=[492],BoxConstants.BOX_SPRITE_WIDTH=4,BoxConstants.BOX_SPRITE_HEIGHT=2,BoxConstants.BOX_FILL_COLOR=3,BoxConstants.BOX_BORDER_COLOR=2,BoxConstants}()
var Box=function(){function Box(t){this.right=!1,this.y=96,this.w=128,this.x=Math.floor(Constants.SCREEN_WIDTH/2-this.w/2),this.scene=t}return Box.prototype.update=function(){},Box.prototype.draw=function(){var t,e
rect(this.x-this.scene.camera.x,this.y-this.scene.camera.y,this.w,8*BoxConstants.BOX_SPRITE_HEIGHT,BoxConstants.BOX_FILL_COLOR),rectb(this.x-this.scene.camera.x,this.y-this.scene.camera.y,this.w,8*BoxConstants.BOX_SPRITE_HEIGHT,BoxConstants.BOX_BORDER_COLOR),rectb(this.x+1-this.scene.camera.x,this.y-this.scene.camera.y,this.w,8*BoxConstants.BOX_SPRITE_HEIGHT,BoxConstants.BOX_BORDER_COLOR),spr(BoxConstants.BOX_SPRITES[0],this.x+(this.right?this.w-8*BoxConstants.BOX_SPRITE_WIDTH:0)-this.scene.camera.x,this.y-this.scene.camera.y,0,void 0,void 0,void 0,BoxConstants.BOX_SPRITE_WIDTH,BoxConstants.BOX_SPRITE_HEIGHT),debug&&(e=(t=this.x-this.scene.camera.x)+this.w,line(t,this.y-10,t,this.y+10,1),line(e,this.y-10,e,this.y+10,1))},Box}()
var Background=function(){function Background(){}return Background.prototype.update=function(){},Background.prototype.draw=function(){cls(0),rect(0,0,Constants.SCREEN_WIDTH,Constants.SCREEN_HEIGHT,13),rect(0,Constants.SCREEN_HEIGHT/2+32,Constants.SCREEN_WIDTH,Constants.SCREEN_HEIGHT/2,12)},Background}()
var GameScene=function(t){function GameScene(){var a=null!==t&&t.apply(this,arguments)||this
return a.actors=[],a.tweens=[],a.score=0,a.boxNumber=0,a.box=new Box(a),a.cat=new Cat(a),a.ready=!1,a.success=!1,a.catFrontActive=!1,a.catBackActive=!1,a.stageText=new FancyText,a.stageText2=new FancyText,a.scoreText=new FancyText,a.background=new Background,a.speed=.75,a.init=function(){a.box.y+=16,a.cat.y=CatConstants.CAT_Y-16,a.camera.x=-Constants.SCREEN_WIDTH,a.scoreText=new FancyText,a.scoreText.x=6,a.scoreText.y=6,a.scoreText.text="Score: ".concat(a.score),a.scoreText.backgroundColor=12,a.scoreText.textColor=15,a.scoreText.bubbleSize=2,a.scoreText.marginX=2,a.scoreText.marginY=2,(a.scoreText.scene=a).actors.push(a.scoreText),a.stageText=new FancyText,(a.stageText.scene=a).stageText.text="Box #".concat(a.boxNumber),a.stageText.x=Constants.SCREEN_WIDTH/2-48,a.stageText.y=Constants.SCREEN_HEIGHT/2-32,a.stageText.textColor=0,a.stageText.scale=2,a.actors.push(a.stageText),a.stageText2=new FancyText,(a.stageText2.scene=a).stageText2.text="".concat(a.box.w,"cm"),a.stageText2.x=Constants.SCREEN_WIDTH/2-48,a.stageText2.y=Constants.SCREEN_HEIGHT/2-32+12,a.stageText2.textColor=0,a.actors.push(a.stageText2),a.panIn(),a.newStage()},a.update=function(){for(var t=0,e=a.tweens;t<e.length;t++)e[t].TIC()
for(var n=0,s=a.actors;n<s.length;n++)s[n].update()
var i
a.cat.update(),a.box.update(),a.stageText.text="Box #".concat(a.boxNumber),a.stageText2.text="".concat(a.box.w,"cm"),a.scoreText.text="Score: ".concat(a.score),a.ready&&(btnp(2)&&(a.cat.right?(sfx(6),a.catBackActive=!1):(sfx(7),a.catFrontActive=!1)),btnp(3)&&(a.cat.right?(sfx(7),a.catFrontActive=!1):(sfx(6),a.catBackActive=!1)),btnp(4)&&(sfx(6),a.catBackActive=!1,a.catFrontActive=!1),btn(5)&&debug&&(a.speed=.05),i=a.speed*(a.cat.right?1:-1),a.catFrontActive&&a.catBackActive?a.cat.x+=i:(a.catFrontActive||a.catBackActive)&&(a.catFrontActive?(a.cat.w+=Math.abs(i),a.cat.right||(a.cat.x-=Math.abs(i))):(a.cat.w-=Math.abs(i),a.cat.right&&(a.cat.x+=Math.abs(i)))),a.cat.w<36&&(a.cat.w=36,a.catBackActive=!1,a.catFrontActive=!1),a.cat.right&&a.cat.x+a.cat.w>Constants.SCREEN_WIDTH&&(a.catBackActive=!1,a.catFrontActive=!1),!a.cat.right&&a.cat.x<0&&(a.catBackActive=!1,a.catFrontActive=!1),a.catFrontActive||a.catBackActive||(a.ready=!1,a.testFit()))},a.draw=function(){a.background.draw(),a.box.draw(),a.cat.draw()
for(var t=0,e=a.actors;t<e.length;t++)e[t].draw()},a}return __extends(GameScene,t),GameScene.prototype.panIn=function(){var t=this
var e=new PositionTween({target:this.camera,startX:-Constants.SCREEN_WIDTH-32,endX:0,durationFrames:Util.secondsToFrames(.5),easing:Easing.easeOutQuad,callback:function(){t.deleteTween(e),t.cat.silent=!1,t.cat.hide=!1,t.ready=!0,t.catFrontActive=!0,t.catBackActive=!0}})
this.tweens.push(e)},GameScene.prototype.panOut=function(t,e,n){var s=this
var i=new PositionTween({target:this.camera,startX:0,endX:(n=void 0===n?!1:n)?-Constants.SCREEN_WIDTH-32:Constants.SCREEN_WIDTH+32,durationFrames:Util.secondsToFrames(.5),delayFrames:Util.secondsToFrames(null!=t?t:0),easing:Easing.easeOutQuad,callback:null!=e?e:function(){s.deleteTween(i),s.cat.hide=!1,s.ready=!0,s.catFrontActive=!0,s.catBackActive=!0,s.newStage(),s.panIn()}})
this.tweens.push(i)},GameScene.prototype.newStage=function(){this.speed+=.1,this.boxNumber+=1,this.cat.animSpeed=Util.secondsToFrames(Util.clamp(.13-.005*this.boxNumber,0,1)),this.cat.hide=!0,this.cat.w=Util.getRandomIntBetween(36,101),this.cat.right=0<Util.getRandomInt(2),this.cat.x=this.cat.right?0-this.cat.w-64:Constants.SCREEN_WIDTH+64,this.cat.y=CatConstants.CAT_Y-16,this.cat.headFrame=CatConstants.HEAD_IDLE,this.cat.clip=!1,this.box.w=Util.getRandomIntBetween(48,151),this.box.right=0<Util.getRandomInt(2),this.box.x=Math.floor(Constants.SCREEN_WIDTH/2-this.box.w/2),this.success=!1},GameScene.prototype.testFit=function(){var t=this
debug&&(trace("cat.x: ".concat(this.cat.x.toFixed(3),", cat.w: ").concat(this.cat.w)),trace("box.x: ".concat(this.box.x.toFixed(3),", box.w: ").concat(this.box.w))),this.cat.silent=!0
var e=this.cat.x
var n=Math.floor(this.cat.w)
var s=this.box.x
var i=this.box.w
var a,o,r,c,h
this.success=s<=e&&Math.floor(e)+n<=s+i,this.success?(sfx(1),this.cat.clip=!0,a=new PositionTween({target:this.cat,durationFrames:Util.secondsToFrames(.5),startY:this.cat.y,endY:this.box.y-8,callback:function(){sfx(2),t.cat.headFrame=CatConstants.HEAD_YAY,t.deleteTween(a),t.panOut(.25)}}),this.tweens.push(a),e=Math.floor(this.cat.w/this.box.w*100),o=new Commentary(this,"",6,function(){t.deleteActor(o)}),98<=e?o.setText("+".concat(e*=3," PERFECT! 3x point bonus")):80<=e?(o.setText("+".concat(e*=2," Great! 2x point bonus")),o.setColor(5)):50<e?(o.setText("+".concat(e," OK!")),o.setColor(3)):(o.setText("+".concat(e," Do better!")),o.setColor(2)),this.actors.push(o),this.score+=e):(sfx(5),r=new PositionTween({target:this.cat,durationFrames:Util.secondsToFrames(.5),startY:this.box.y-100,endY:Constants.SCREEN_HEIGHT+64,easing:Easing.easeInQuad,callback:function(){t.deleteTween(r),t.actors.push(new GameOver(t,"you sitted, but did not fitted"))}}),c=new PositionTween({target:this.cat,durationFrames:Util.secondsToFrames(.5),startY:this.box.y-32,endY:this.box.y-100,easing:Easing.easeInOvershoot,callback:function(){t.deleteTween(c),t.tweens.push(r)}}),h=new PositionTween({target:this.cat,durationFrames:Util.secondsToFrames(.5),startY:this.cat.y,endY:this.box.y-32,easing:Easing.easeOutBounce,callback:function(){sfx(3),t.cat.headFrame=CatConstants.HEAD_SAD,t.deleteTween(h),t.tweens.push(c)}}),this.tweens.push(h))},GameScene.prototype.deleteActor=function(e){this.actors.indexOf(e)
this.actors=this.actors.filter(function(t){return t!==e})},GameScene.prototype.deleteTween=function(e){this.tweens=this.tweens.filter(function(t){return t!==e})},GameScene}(Scene)

;/// <reference path="./src/titleScene.ts" />
// title:  LD54
// author: cheesepencil
// desc:   Limited Space
// script: js
var activeScene=new TitleScene
var highScore=pmem(0)
var debug=!1
function TIC(){activeScene.TIC()}var Commentary=function(){function Commentary(t,e,n,s){var i=this
this.actors=[],this.tweens=[],this.draw=function(){i.actors.forEach(function(t){return t.draw()})},this.update=function(){i.tweens.forEach(function(t){return t.TIC()})},this.commentaryText=new FancyText,this.commentaryText.text=e,this.commentaryText.x=16,this.commentaryText.y=Constants.SCREEN_HEIGHT+8,this.commentaryText.textColor=n,this.commentaryText.fixedWidth=!0,this.commentaryText.outlineColor=15,this.actors.push(this.commentaryText)
e=new PositionTween({target:this.commentaryText,startY:Constants.SCREEN_HEIGHT+8,endY:-32,durationFrames:Util.secondsToFrames(2),callback:function(){s()}})
this.tweens.push(e)}return Commentary.prototype.setText=function(t){this.commentaryText.text=t},Commentary.prototype.setColor=function(t){this.commentaryText.textColor=t},Commentary}()
var GameOver=function(t,e){var n=this
this.actors=[],this.draw=function(){for(var t=0,e=n.actors;t<e.length;t++)e[t].draw()
print("your score: ".concat(n.scene.score),18-n.scene.camera.x,80-n.scene.camera.y,15),print("high score: ".concat(highScore),18-n.scene.camera.x,89-n.scene.camera.y,15)},this.update=function(){for(var t=0,e=n.actors;t<e.length;t++)e[t].update()
btnp(4)&&n.scene.panOut(.125,function(){activeScene=new TitleScene},!0)},this.scene=t,this.scene.score>highScore&&(highScore=this.scene.score,pmem(0,highScore))
var s=new FancyText
s.text="GAME OVER",s.x=16,s.y=32,s.marginY=4,s.marginX=4,s.bubbleSize=3,s.backgroundColor=14,s.textColor=12,s.scale=4,s.scene=t,this.actors.push(s),(s=new FancyText).text=e,s.x=16,s.y=62,s.marginY=2,s.marginX=2,s.bubbleSize=2,s.backgroundColor=14,s.textColor=12,s.scale=2,s.smallFont=!0,s.scene=t,this.actors.push(s),(e=new FancyText).text="press Z to retry",e.x=Constants.SCREEN_WIDTH-72,e.y=86,e.marginX=2,e.marginY=2,e.bubbleSize=2,e.backgroundColor=12,e.textColor=2,e.smallFont=!0,e.scene=t,this.actors.push(e)}
var Collision=function(){function Collision(){}return Collision.intersectsPointBox=function(t,e){var n=!1
return n=Math.floor(t.x)>=Math.floor(e.x)&&Math.floor(t.x)<Math.floor(e.x+e.w)&&Math.floor(t.y)>=Math.floor(e.y)&&Math.floor(t.y)<Math.floor(e.y+e.h)?!0:n},Collision.intersectsBoxBox=function(t,e){var n=t.x-e.x
var s=.5*t.w+.5*e.w
return!(Math.abs(n)>=s||(n=t.y-e.y,s=.5*t.h+.5*e.y,Math.abs(n)>-s))},Collision.collideSideMap=function(t,e){if(t.scene.map){var n=t.h/3
for(var s=-n;s<=n;s+=2){var i
var a=t.x/8+t.scene.map.x
var o=(t.y+t.h/2+s)/8+t.scene.map.y
var r=mget(a,o)
if(fget(r,e))return t.dx=0,t.x=8*Math.floor(t.x/8)+8,!0
if(a=(i=t.x+t.w)/8+t.scene.map.x,o=(t.y+t.h/2+s)/8+t.scene.map.y,r=mget(a,o),fget(r,e))return t.dx=0,t.x=8*Math.floor(i/8)-t.w,!0}}return!1},Collision.collideFloorMap=function(t,e){if(!t.scene.map)return!1
if(t.dy<0)return!1
var n=t.w/3
var s=!1
for(var i=-n;i<=n;i+=2){var a=(t.x+t.w/2+i)/8+t.scene.map.x
var o=(t.y+t.h)/8+t.scene.map.y
a=mget(a,o)
fget(a,e)&&(t.dy=0,t.y=8*Math.floor((t.y+t.h)/8)-t.h,t.grounded=!0,s=!(t.airTime=0))}return s},Collision.collideRoofMap=function(t,e){if(!t.scene.map)return!1
var n=t.w/3
for(var s=-n;s<=n;s+=2){var i=(t.x+t.w/2+s)/8+t.scene.map.x
var a=t.y/8+t.scene.map.y
i=mget(i,a)
fget(i,e)&&(t.dy=0,t.y=8*Math.floor(t.y/8)+8,t.jumpHoldTime=0)}},Collision}()
var Easing=function(){function Easing(){}return Easing.linear=function(t){return t},Easing.easeInQuad=function(t){return t*t},Easing.easeOutQuad=function(t){return 1- --t*t},Easing.easeInOutQuad=function(t){return t<.5?t*t*2:1- --t*t*2},Easing.easeOutInQuad=function(t){return t<.5?.5-(t-=.5)*t*2:.5+(t-=.5)*t*2},Easing.easeInQuart=function(t){return t*t*t*t},Easing.easeOutQuart=function(t){return 1- --t*t*t*t},Easing.easeInOutQuart=function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},Easing.easeOutInQuart=function(t){return t<.5?.5-8*(t-=.5)*t*t*t:.5+8*(t-=.5)*t*t*t},Easing.easeInOvershoot=function(t){return 2.7*t*t*t-1.7*t*t},Easing.easeOutOvershoot=function(t){return 1+2.7*--t*t*t+1.7*t*t},Easing.easeInOutOvershoot=function(t){return t<.5?(21.6*t*t*t-6.8*t*t)/2:1+(21.6*--t*t*t+6.8*t*t)/2},Easing.easeOutInOvershoot=function(t){return t<.5?(21.6*(t-=.5)*t*t+6.8*t*t)/2+.5:(21.6*(t-=.5)*t*t-6.8*t*t)/2+.5},Easing.easeInElastic=function(t){return 0==t?0:Math.pow(2,10*t-10)*Util.picoCos(2*t-2)},Easing.easeOutElastic=function(t){return 1==t?1:1-Math.pow(2,-10*t)*Util.picoCos(2*t)},Easing.easeInOutElastic=function(t){return t<.5?Math.pow(2,20*t-10)*Util.picoCos(4*t-2)/2:(t-=.5,1-Math.pow(2,-20*t)*Util.picoCos(4*t)/2)},Easing.easeOutInElastic=function(t){return t<.5?.5-Math.pow(2,-20*t)*Util.picoCos(4*t)/2:(t-=.5,Math.pow(2,20*t-10)*Util.picoCos(4*t-2)/2+.5)},Easing.easeInBounce=function(t){var e=7.5625
var n=2.75
return(t=1-t)<1/n?1-e*t*t:t<2/n?1-e*(t-=1.5/n)*t-.75:t<2.5/n?1-e*(t-=2.25/n)*t-.9375:1-e*(t-=2.625/n)*t-.984375},Easing.easeOutBounce=function(t){var e=7.5625
var n=2.75
return t<1/n?e*t*t:t<2/n?e*(t-=1.5/n)*t+.75:t<2.5/n?e*(t-=2.25/n)*t+.9375:e*(t-=2.625/n)*t+.984375},Easing}()
var Map=function(t){var e
this.x=null!=(e=t.x)?e:0,this.y=null!=(e=t.y)?e:0,this.w=null!=(e=t.w)?e:Constants.MAP_WIDTH_DEFAULT,this.h=null!=(e=t.h)?e:Constants.MAP_HEIGHT_DEFAULT}
var Platform=function(){function Platform(t,e){this.dx=0,this.dy=0,this.update=function(){},this.draw=function(){},this.x=e.x,this.y=e.y,this.w=e.w,this.h=e.h,this.scene=t}return Platform.prototype.collideFloor=function(t){if(t.dy<0)return!1
var e=t.w/3
var n=!1
for(var s=-e;s<=e;s+=2){var i=new Vector(t.x+t.w/2+s,t.y+t.h)
if(Collision.intersectsPointBox(i,this)){t.dy=0,t.y=Math.floor(this.y-t.h+this.dy),t.x=t.x+this.dx,t.grounded=!0,n=!(t.airTime=0)
break}}return n},Platform}()
var PlatformerSpriteConfig=function(t){function PlatformerSpriteConfig(){return null!==t&&t.apply(this,arguments)||this}return __extends(PlatformerSpriteConfig,t),PlatformerSpriteConfig}(SpriteConfig)
var PlatformerSpriteButton=function(){function PlatformerSpriteButton(t){this.isPressed=!1,this.isDown=!1,this.ticksDown=0,this.jumpBtn=t}return PlatformerSpriteButton.prototype.update=function(){this.isPressed=!1,btn(this.jumpBtn)?(this.isDown||(this.isPressed=!0),this.isDown=!0,this.ticksDown+=1):(this.isDown=!1,this.isPressed=!1,this.ticksDown=0)},PlatformerSpriteButton}()
var PlatformerSprite=function(n){function PlatformerSprite(t,e){var i=n.call(this,t,e)||this
return i.dx=0,i.dy=0,i.dxMax=1,i.dyMax=4,i.jumpSpeed=-1.5,i.acc=.1,i.dcc=.25,i.airDcc=1,i.grav=.15,i.jumpHoldTime=0,i.maxJumpPress=15,i.jumpBtnReleased=!0,i.grounded=!1,i.airTime=0,i.update=function(){var t=btn(2)
var e=!t&&btn(3)
var n,s
t?i.dx-=i.acc:e?i.dx+=i.acc:i.grounded?i.dx*=i.dcc:i.dx*=i.airDcc,i.dx=Util.clamp(i.dx,-i.dxMax,i.dxMax),i.x+=i.dx,Collision.collideSideMap(i,1),i.jumpButton.update(),i.jumpButton.isDown?(n=i.grounded||i.airTime<5,s=i.jumpButton.ticksDown<10,(0<i.jumpHoldTime||n&&s)&&(i.jumpHoldTime,i.jumpHoldTime+=1,i.jumpHoldTime<i.maxJumpPress)&&(i.dy=i.jumpSpeed)):i.jumpHoldTime=0,i.dy+=i.grav,i.dy=Util.clamp(i.dy,-i.dyMax,i.dyMax),i.y+=i.dy,Collision.collideFloorMap(i,1)||i.collidePlatforms()||(i.grounded=!1,i.airTime+=1),Collision.collideRoofMap(i,1),i.grounded&&(e||t)&&i.dx,e&&(i.flipX=!1),t&&(i.flipX=!0)},i.jumpButton=new PlatformerSpriteButton(e.jumpButton||4),i}return __extends(PlatformerSprite,n),PlatformerSprite.prototype.collidePlatforms=function(){for(var t=0,e=this.scene.platforms;t<e.length;t++)if(e[t].collideFloor(this))return!0
return!1},PlatformerSprite}(Sprite)
var PositionTween=function(){function PositionTween(t){this.frameCounter=0,this.frameCounterIncrement=1,this.delayCompleted=!1,this.done=!1,this.repeatCounter=0,this.paused=!1,this.config=__assign(__assign({},t),{delayFrames:t.delayFrames?Math.floor(t.delayFrames):0,repeat:t.repeat?Math.floor(t.repeat):0,yoyo:t.yoyo||!1,easing:t.easing||Easing.linear,callback:t.callback||function(){}})}return PositionTween.prototype.getAbsoluteProgress=function(){var t=this.frameCounter/this.config.durationFrames
return t=Math.min(t,1),Math.max(t,0)},PositionTween.prototype.getEasedProgress=function(){var t=this.getAbsoluteProgress()
return this.config.easing(t)},PositionTween.prototype.TIC=function(){var t,e
this.done||this.paused||(!this.delayCompleted&&this.frameCounter>=this.config.delayFrames&&(this.delayCompleted=!0,this.frameCounter=0),this.delayCompleted&&(t=this.getAbsoluteProgress(),e=this.getEasedProgress(),void 0!==this.config.startX&&void 0!==this.config.endX&&(this.config.target.x=Util.lerp(this.config.startX,this.config.endX,e)),void 0!==this.config.startY&&void 0!==this.config.endY&&(this.config.target.y=Util.lerp(this.config.startY,this.config.endY,e)),0<this.frameCounterIncrement&&1===t?this.config.yoyo?this.frameCounterIncrement=-1:(this.repeatCounter++,this.frameCounter=0):this.frameCounterIncrement<0&&0===t&&(this.repeatCounter++,this.frameCounterIncrement=1),0<=this.config.repeat)&&this.repeatCounter>this.config.repeat&&(this.config.callback(),this.done=!0),this.frameCounter+=this.frameCounterIncrement)},PositionTween.prototype.setPaused=function(t){this.paused=t},PositionTween}()

// <SPRITES>
// 004:000c000000cc00000ccccccccccccccc0ccccccc00cc0000000c000000000000
// 005:00cccc000c0000c0c00cc00cc0c00c0cc0cccc0cc0c00c0c0c0000c000cccc00
// 006:0000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeee
// 007:0000000000000000000000000000000000000000e0000000eeee0000eeeee000
// 008:00000000000000000000000000000ee00000eeee0000eeee000eeeee00eeeee0
// 010:0000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeee
// 011:0000000000000000000000000000000000000000e0000000eeee0000eeeee000
// 014:0000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeee
// 015:0000000000000000000000000000000000000000e0000000eeee0000eeeee000
// 022:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 023:eeeeee00eeeeeee0eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 024:00eeee0000eeee0000eeee0000eeee0000eeee0000eeee0000eeeee0000eeee0
// 026:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 027:eeeeee00eeeeeee0eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 030:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 031:eeeeee00eeeeeee0eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 038:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 039:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0eeeeee00eeeee000
// 040:000eeeee0000eeee00000eee000000ee0000000e0000000e0000000000000000
// 041:00000000e0000000ee000000eee00000eee00000eeee0000eeee0000eeee0000
// 042:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 043:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0eeeeee00eeeee000
// 046:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 047:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0eeeeee00eeeee000
// 054:eeeeefff0eeee0ff0eeeeeee00eeeeee00eeeeee000eeeee0000000000000000
// 055:ff000000ff000000fff00000eff00000efffff00effffff0fffffff00ffffff0
// 056:00000000000000000000000e0000000e000000ee00000eee0000eeee000eeeee
// 057:eeee0000eeee0000eeee0000eee00000eee00000ee000000e000000000000000
// 058:eeeeefff0eeee0ff0eeeeeff00eeee0f00eeeeee000eeeee000eeeee0000eeee
// 059:ff000000ff000000fff00000fff00000efffff00eefffff0eefffff0eefffff0
// 062:eeeeefff0eeee0ff0eeeeeff00eeee0f00eeeeee000eeeee000eeeee0000eeee
// 063:ff000000fffff000ffffff00ffffff00efffff00ee000000ee000000ee000000
// 068:000eeeee00eeeee00eeeee000eeee000eeeee00eeeeeeeeeeeeeeeeeeeeeeeee
// 069:00000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 070:0000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeee
// 071:0000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeee
// 072:000eeeee00eeeee00eeeee000eeee000eeeee00eeeeeeeeeeeeeeeeeeeeeeeee
// 073:00000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 074:0000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeee
// 075:0000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeee
// 076:000eeeee00eeeee00eeeee000eeee000eeeee00eeeeeeeeeeeeeeeeeeeeeeeee
// 077:00000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 078:0000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeee
// 079:0000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeee
// 084:eefefeeeeeefeeeeeefefeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 085:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 086:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 087:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 088:eefefeeeeeefeeeeeefefeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 089:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 090:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 091:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 092:eefefeeeeeefeeeeeefefeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 093:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 094:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 095:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 100:eeeeeeee0eeeeeee00eeeeee000eeeee0000eeee00000eee00000eee00000eee
// 101:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 102:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 103:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 104:eeeeeeee0eeeeeee00eeeeee000eeeee0000eeee00000eee00000eee00000eee
// 105:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 106:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 107:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 108:eeeeeeee0eeeeeee00eeeeee000eeeee0000eeee00000eee00000eee00000eee
// 109:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 110:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 111:eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// 116:0000eeee0000eeee0000eeee0000eeee0000eeee00000eee0000000000000000
// 117:eeeeeeeeeeee0fffe0000fffeeee0fffeeeeefffeeeeefff000000ff0000000f
// 118:effff000fffff000ffff0000fff00000fff00000ffff0000fffff000fffff000
// 120:00000eee0000eeee0000eeee0000eeee0000eeee0000eeee0000eeee00000eee
// 121:eeeeeeeeeeee0fffeee00fffee000fffe0000fffeeee0fffeeeee0ffeeeee00f
// 122:effff000fffff000ffff0000fff00000fff00000ffff0000fffff000fffff000
// 124:00000eee0000eeee0000eeee0000eeee0000eeee0000eeee0000eeee00000eee
// 125:eeeeeeeeeeee0fffeee00fffee000fffe00000ffeeee000feeeee000eeeee000
// 126:effff000fffff000ffff0000ffff0000fffff000fffff0000000000000000000
// 132:000000000eeee0000eefeee00efffeee0effffee0effffee0eeffffe00efffff
// 133:00000000000000000000000000000000ee000000eeeee000eeeeeeefeeeeeeef
// 134:00000000000000000000000000000000000000ee000eeeeefeeeeeeefeeeeeee
// 135:00000000000eeee00eeefee0eeefffe0eeffffe0eeffffe0effffee0fffffe00
// 136:000000000eeee0000eefeee00efffeee0effffee0effffee0eeffffe00efffff
// 137:00000000000000000000000000000000ee000000eeeee000eeeeeeefeeeeeeef
// 138:00000000000000000000000000000000000000ee000eeeeefeeeeeeefeeeeeee
// 139:00000000000eeee00eeefee0eeefffe0eeffffe0eeffffe0effffee0fffffe00
// 140:000000000eeee0000eefeee00efffeee0effffee0effffee0eeffffe00efffff
// 141:00000000000000000000000000000000ee000000eeeee000eeeeeeefeeeeeeef
// 142:00000000000000000000000000000000000000ee000eeeeefeeeeeeefeeeeeee
// 143:00000000000eeee00eeefee0eeefffe0eeffffe0eeffffe0effffee0fffffe00
// 148:00eefffe00eeffee000efeee000eeeee0000eeee0000efef000eeffc000eefcc
// 149:eeeeeeefeeeeeeffeeeeefffeeeeeffffffeffffcccfffffc11cffff1cc1cfff
// 150:feeeeeeeffeeeeeefffeeeeefffeeeeeffffeffffffffcccffffc11cfffc1cc1
// 151:efffee00eeffee00eeefe000eeeee000eeee0000fefe0000cffee000ccfee000
// 152:00eefffe00eeffee000efeee000eeeee0000eeee0000efee000eefee000eeffe
// 153:eeeeeeefeeeeeeffeeeeeeffeeeeeeffeeeeeeffeeeeeeffeeeeefffeeeeefff
// 154:feeeeeeeffeeeeeeffeeeeeeffeeeeeeffeeeeeeffeeeeeefffeeeeefffeeeee
// 155:efffee00eeffee00eeefe000eeeee000eeee0000eefe0000eefee000effee000
// 156:00eefffe00eeffee000efeee000eeeee0000eeee0000efef000eeffe000eefee
// 157:eeeeeeefeeeeeeffeeeeefffeeeeeffffffeffffeeefffffeeeeffffeeeeefff
// 158:feeeeeeeffeeeeeefffeeeeefffeeeeeffffeffffffffeeeffffeeeefffeeeee
// 159:efffee00eeffee00eeefe000eeeee000eeee0000fefe0000effee000eefee000
// 164:000eeecc000eeeec0000eeee0000eeee00000eee000000ee0000000e00000000
// 165:1111cfffc11cffffeccffff3eeefffffffffffffffff4ff4effff44fefffffff
// 166:fffc1111ffffc11c3ffffccefffffeeeffffffff4ff4fffff44ffffefffffffe
// 167:cceee000ceeee000eeee0000eeee0000eee00000ee000000e000000000000000
// 168:000eeeff000eeeef0000eeea0000eeaa00000eaa000000ee00aaa00e0aaaa000
// 169:eeeeffffffffffffaffffff3aeefffffffffffffffffffffeffffff4efffff44
// 170:ffffeeeeffffffff3ffffffafffffeeaffffffffffffffff4ffffffe44fffffe
// 171:ffeee000feeee000aeee0000aaee0000aae00000ee000000e00aaa00000aaaa0
// 172:000eeeee000eeeee0000eeee0000eeee00000eee000000ee0000000e00000000
// 173:eeeeefffeeeeffffeeeffff3eeefffffffffffffffff4ff4effff444efffff44
// 174:fffeeeeeffffeeee3ffffeeefffffeeeffffffff4ff4ffff444ffffe44fffffe
// 175:eeeee000eeeee000eeee0000eeee0000eee00000ee000000e000000000000000
// 181:00ffffff00000fff000000000000000000000000000000000000000000000000
// 182:ffffff00fff00000000000000000000000000000000000000000000000000000
// 184:0aaa00000aaa0000000000000000000000000000000000000000000000000000
// 185:00ffff4400000fff000000000000000000000000000000000000000000000000
// 186:44ffff00fff00000000000000000000000000000000000000000000000000000
// 187:0000aaa00000aaa0000000000000000000000000000000000000000000000000
// 189:00fffff400000fff000000000000000000000000000000000000000000000000
// 190:4fffff00fff00000000000000000000000000000000000000000000000000000
// 236:2222222222233333223233332233233322333233223333232233333222333333
// 237:2222222233333333333333333333333333333333333333332222222233333333
// 238:2222222233333333333333333333333333333333333333332222222233333333
// 239:2222222233333222333323223332332233233322323333222333332233333322
// 252:2233333322333333223333332233333322333333223333332233333322222222
// 253:3333333333333333333333333333333333333333333333333333333322222222
// 254:3333333333333333333333333333333333333333333333333333333322222222
// 255:3333332233333322333333223333332233333322333333223333332222222222
// </SPRITES>

// <WAVES>
// 000:122233344455667788899aaabbccdeef
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// 003:61fe1951f0b760f3a85e1a4b272f0a40
// 004:edca874ba9871542b98b75cba9806504
// </WAVES>

// <SFX>
// 000:d240e272e2a0f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200112000000000
// 001:c028c039b059b07aa07b907b906b802b804c806d707d60be50de20fff000f000f000f000f000f000f000f000f000f000f000f000f000f000f000f000510000000000
// 002:80e0a0d0b0c0d0b0d0a090a09090b0c0c0b0d090d0809070a0c0a0a0b090c080d060d040704080a09090a080b060c050d0b0d090d080c070c060f0500c0000000000
// 003:02c702b612a7129712861285227422742263226322522252224122412230223f222f222e221d621c621c821ba21ad209f20af209f209f208f209f209470000000000
// 004:025002600270027002800290029002b002b002c002d002d0f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200f200420000000000
// 005:050705071507150615051514252435233532453255425541654065508550a56ff56ef57df57cf58cf58bf59bf5aaf5b9f5b7f5c0f5d0f5d0f5e0f5e0b80000000000
// 006:8118813a715b617d518e51a041a1f1c2f1d4f1f6f1f7f147f140f150f150f150f160f160f170f180f100f180f190f1a0f1a0f1b0f1c0f1d0f1d0f1d0520000000000
// 007:8118813a715b617d518e51a041a1f1c2f1d4f1f6f1f7f147f140f150f150f150f160f160f170f180f100f180f190f1a0f1a0f1b0f1c0f1d0f1d0f1d0522000000000
// 008:0118011a011b012d013e013001420162017301a4f1c5f1d6f1f7f124f125f136f136f146f146f157f167f177f187f197f197f1b7f1c7f1d7f1e7f1ff619000000000
// </SFX>

// <TRACKS>
// 000:100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// </TRACKS>

// <PALETTE>
// 000:1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57
// </PALETTE>

