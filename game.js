var __extends=this&&this.__extends||function(){var s=function(t,n){return(s=Object.setPrototypeOf||({__proto__:[]}instanceof Array?function(t,n){t.__proto__=n}:function(t,n){for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}))(t,n)}
return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null")
function __(){this.constructor=t}s(t,n),t.prototype=null===n?Object.create(n):(__.prototype=n.prototype,new __)}}()
var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var n,s=1,i=arguments.length;s<i;s++)for(var o in n=arguments[s])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])
return t}).apply(this,arguments)}
var Constants=function(){function Constants(){}return Constants.SCREEN_WIDTH=240,Constants.SCREEN_HEIGHT=136,Constants.MAP_WIDTH_DEFAULT=30,Constants.MAP_HEIGHT_DEFAULT=17,Constants}()
var Vector=function(){function Vector(t,n){var s=this
this.getLength=function(){return Math.sqrt(Math.pow(s.x,2)+Math.pow(s.y,2))},this.x=t,this.y=n}return Vector.prototype.getNormal=function(){var t=this.getLength()
return new Vector(this.x/t,this.y/t)},Vector}()
var DEFAULT_CAMERA_BOUNDS={v1:new Vector(0,0),v2:new Vector(0,0)}
var Camera=function(){function Camera(){this.x=0,this.y=0,this.offsetX=-Constants.SCREEN_WIDTH/2,this.offsetY=-Constants.SCREEN_HEIGHT/2,this.bounds=DEFAULT_CAMERA_BOUNDS,this.lerpX=.5,this.lerpY=.5}return Camera.prototype.configure=function(t){var n
this.x=null!=(n=null==t?void 0:t.x)?n:0,this.y=null!=(n=null==t?void 0:t.y)?n:0,this.bounds=null!=(n=null==t?void 0:t.bounds)?n:DEFAULT_CAMERA_BOUNDS,this.target=null==t?void 0:t.target,this.lerpX=null!=(n=null==t?void 0:t.lerpX)?n:.5,this.lerpY=null!=(n=null==t?void 0:t.lerpY)?n:.5,this.offsetX=null!=(n=null==t?void 0:t.offsetX)?n:-Constants.SCREEN_WIDTH/2,this.offsetY=null!=(n=null==t?void 0:t.offsetY)?n:-Constants.SCREEN_HEIGHT/2},Camera.prototype.update=function(){var t
this.target&&(t=Util.lerp(this.x-this.offsetX,this.target.x,this.lerpX),this.setX(Math.floor(t+this.offsetX)),t=Util.lerp(this.y-this.offsetY,this.target.y,this.lerpY),this.setY(Math.floor(t+this.offsetY)))},Camera.prototype.centerOn=function(t){this.setX(t.x+this.offsetX),this.setY(t.y+this.offsetY)},Camera.prototype.setX=function(t){this.x=Util.clamp(t,this.bounds.v1.x,this.bounds.v2.x)},Camera.prototype.setY=function(t){this.y=Util.clamp(t,this.bounds.v1.y,this.bounds.v2.y)},Camera}()
var SpriteConfig=function(){this.x=0,this.y=0,this.widthSprites=1,this.heightSprites=1,this.index=0,this.colorKey=[0],this.flipX=!1}
var Sprite=function(){function Sprite(t,n){this.update=function(){},this.scene=t,this.x=n.x||0,this.y=n.y||0,this.widthSprites=n.widthSprites||1,this.w=8*this.widthSprites,this.heightSprites=n.heightSprites||1,this.h=8*this.heightSprites,this.index=n.index,this.colorKey=n.colorKey,this.flipX=n.flipX}return Sprite.prototype.draw=function(){spr(this.index,this.x-this.scene.camera.x,this.y-this.scene.camera.y,this.colorKey,1,this.flipX?1:0,0,this.widthSprites,this.heightSprites)},Sprite}()
var Scene=function(){var h=this
this.camera=new Camera,this.sprites=[],this.platforms=[],this.init=function(){},this.update=function(){},this.draw=function(){},this.initialized=!1,this.TIC=function(){h.initialized||(h.init(),h.initialized=!0),h.update()
for(var t=0,n=h.platforms;t<n.length;t++)n[t].update()
for(var s=0,i=h.sprites;s<i.length;s++)i[s].update()
h.camera.update(),h.draw(),h.map&&map(h.map.x,h.map.y,h.map.w,h.map.h,-h.camera.x,-h.camera.y)
for(var o=0,e=h.platforms;o<e.length;o++)e[o].draw()
for(var a=0,r=h.sprites;a<r.length;a++)r[a].draw()}}
var TitleScene=function(t){function TitleScene(){var o=null!==t&&t.apply(this,arguments)||this
return o.agents=[],o.tweens=[],o.init=function(){o.agents.push(new Background)
var t=new FancyText
t.text="if i fits",t.x=Constants.SCREEN_WIDTH+16,t.y=8,t.marginY=2,t.marginX=2,t.bubbleSize=2,t.backgroundColor=14,t.textColor=12,t.scale=3,t.smallFont=!0,o.agents.push(t)
var n=new FancyText
n.text="I SITS!",n.x=Constants.SCREEN_WIDTH+24,n.y=32,n.marginY=4,n.marginX=4,n.bubbleSize=3,n.backgroundColor=14,n.textColor=12,n.scale=4,o.agents.push(n),o.tweens.push(new PositionTween({target:t,startX:t.x,endX:16,durationFrames:Util.secondsToFrames(1),delayFrames:Util.secondsToFrames(0),easing:Easing.easeOutOvershoot})),o.tweens.push(new PositionTween({target:n,startX:Constants.SCREEN_WIDTH+24,endX:32,durationFrames:Util.secondsToFrames(1),delayFrames:Util.secondsToFrames(.5),easing:Easing.easeInQuart}))
t=new Box
t.x=Constants.SCREEN_WIDTH/2-64-24,t.w=90,o.agents.push(t)
n=new Cat
n.x=Constants.SCREEN_WIDTH-64,n.right=!1,o.agents.push(n)
t=new Instructions
t.x=-200,o.tweens.push(new PositionTween({target:t,startX:t.x,endX:6,durationFrames:Util.secondsToFrames(2),delayFrames:Util.secondsToFrames(3)})),o.agents.push(t)
n=new CallToAction
o.agents.push(n)},o.update=function(){for(var t=0,n=o.tweens;t<n.length;t++)n[t].TIC()
for(var s=0,i=o.agents;s<i.length;s++)i[s].update()},o.draw=function(){for(var t=0,n=o.agents;t<n.length;t++)n[t].draw()
print("a game for ludum dare #54 by @cheesepencil",4,Constants.SCREEN_HEIGHT-8,14)},o}return __extends(TitleScene,t),TitleScene}(Scene)
var Instructions=function(){function Instructions(){this.x=6,this.y=66}return Instructions.prototype.update=function(){},Instructions.prototype.draw=function(){print("left: halt left side of cat",this.x,this.y,12),print("right: halt right side of cat",this.x,this.y+9,12),print("Z: halt the whole cat",this.x,this.y+18,12)},Instructions}()
var CallToAction=function(){function CallToAction(){this.ticks=0,this.x=50,this.y=101,this.show=!1,this.fancyText=new FancyText,this.init=!1,this.fancyText.text="press Z to start",this.fancyText.x=this.x,this.fancyText.y=this.y,this.fancyText.marginX=2,this.fancyText.marginY=2,this.fancyText.bubbleSize=2,this.fancyText.backgroundColor=12,this.fancyText.textColor=2,this.fancyText.smallFont=!0}return CallToAction.prototype.update=function(){this.ticks+=1,this.ticks>Util.secondsToFrames(2)&&(this.ticks=0,this.init=!0),this.init&&(this.ticks>Util.secondsToFrames(.5)&&(this.ticks=0,this.show=!this.show),btnp(4))&&(activeScene=new Scene)},CallToAction.prototype.draw=function(){this.show&&this.fancyText.draw()},CallToAction}()

;/// <reference path="./src/titleScene.ts" />
// title:  LD54
// author: cheesepencil
// desc:   Limited Space
// script: js
var activeScene=new TitleScene
var debug=!1
function TIC(){activeScene.TIC()}var Background=function(){function Background(){}return Background.prototype.update=function(){},Background.prototype.draw=function(){cls(0),rect(0,0,Constants.SCREEN_WIDTH,Constants.SCREEN_HEIGHT,13),rect(0,Constants.SCREEN_HEIGHT/2+32,Constants.SCREEN_WIDTH,Constants.SCREEN_HEIGHT/2,12)},Background}()
var BoxConstants=function(){function BoxConstants(){}return BoxConstants.MIN_BOX_WIDTH=36,BoxConstants.BOX_SPRITES=[492],BoxConstants.BOX_SPRITE_WIDTH=4,BoxConstants.BOX_SPRITE_HEIGHT=2,BoxConstants.BOX_FILL_COLOR=3,BoxConstants.BOX_BORDER_COLOR=2,BoxConstants}()
var Box=function(){function Box(){this.right=!1,this.y=96,this.w=128,this.x=Constants.SCREEN_WIDTH/2-this.w/2}return Box.prototype.update=function(){},Box.prototype.draw=function(){rect(this.x,this.y,this.w,8*BoxConstants.BOX_SPRITE_HEIGHT,BoxConstants.BOX_FILL_COLOR),rectb(this.x,this.y,this.w,8*BoxConstants.BOX_SPRITE_HEIGHT,BoxConstants.BOX_BORDER_COLOR),rectb(this.x+1,this.y,this.w-2,8*BoxConstants.BOX_SPRITE_HEIGHT,BoxConstants.BOX_BORDER_COLOR),spr(BoxConstants.BOX_SPRITES[0],this.x+(this.right?this.w-8*BoxConstants.BOX_SPRITE_WIDTH:0),this.y,0,void 0,void 0,void 0,BoxConstants.BOX_SPRITE_WIDTH,BoxConstants.BOX_SPRITE_HEIGHT)},Box}()
var CatConstants=function(){function CatConstants(){}return CatConstants.FRONT_W=2,CatConstants.FRONT_H=4,CatConstants.FRONT_WALK_FRAMES=[266,262,266,270],CatConstants.REAR_W=4,CatConstants.REAR_H=4,CatConstants.REAR_WALK_FRAMES=[328,324,328,332],CatConstants.TAIL_W=2,CatConstants.TAIL_H=4,CatConstants.TAIL_WALK_FRAMES=[264],CatConstants.HEAD_W=4,CatConstants.HEAD_H=4,CatConstants.HEAD_IDLE=388,CatConstants.HEAD_SAD=392,CatConstants.HEAD_YAY=396,CatConstants.BODY_COLOR=14,CatConstants.CAT_Y=88,CatConstants}()
var Cat=function(){function Cat(){this.x=0,this.y=CatConstants.CAT_Y,this.w=48,this.right=!0,this.bodyFrameIndex=0,this.headFrame=CatConstants.HEAD_IDLE,this.animSpeed=Util.secondsToFrames(.125),this.ticks=0}return Cat.prototype.update=function(){this.ticks+=1,this.ticks==this.animSpeed&&(this.ticks=0,this.bodyFrameIndex+=1,4<=this.bodyFrameIndex)&&(this.bodyFrameIndex=0)},Cat.prototype.draw=function(){var t=this.right?this.x+this.w-8*CatConstants.FRONT_W:this.x+1
Util.pal(14,0),Util.pal(15,0)
for(var n=-1;n<=1;n+=2)spr(CatConstants.FRONT_WALK_FRAMES[this.bodyFrameIndex],t+n,this.y,0,void 0,this.right?void 0:1,void 0,CatConstants.FRONT_W,CatConstants.FRONT_H),spr(CatConstants.FRONT_WALK_FRAMES[this.bodyFrameIndex],t,this.y+n,0,void 0,this.right?void 0:1,void 0,CatConstants.FRONT_W,CatConstants.FRONT_H)
Util.pal(),spr(CatConstants.FRONT_WALK_FRAMES[this.bodyFrameIndex],t,this.y,0,void 0,this.right?void 0:1,void 0,CatConstants.FRONT_W,CatConstants.FRONT_H)
var s=this.right?this.x+1:this.x+this.w-8*CatConstants.REAR_W
Util.pal(14,0),Util.pal(15,0)
for(n=-1;n<=1;n+=2)spr(CatConstants.REAR_WALK_FRAMES[this.bodyFrameIndex],s+Math.abs(n)*(this.right?-1:1),this.y,0,void 0,this.right?void 0:1,void 0,CatConstants.REAR_W,CatConstants.REAR_H),spr(CatConstants.REAR_WALK_FRAMES[this.bodyFrameIndex],s,this.y+n,0,void 0,this.right?void 0:1,void 0,CatConstants.REAR_W,CatConstants.REAR_H)
Util.pal(),spr(CatConstants.REAR_WALK_FRAMES[this.bodyFrameIndex],s,this.y,0,void 0,this.right?void 0:1,void 0,CatConstants.REAR_W,CatConstants.REAR_H),48<this.w&&(rectb(this.right?this.x+8*CatConstants.REAR_W:this.x+8*CatConstants.FRONT_W,this.y+5-1,this.w-8*CatConstants.REAR_W-8*CatConstants.FRONT_W+1,21,0),rect(this.right?this.x+8*CatConstants.REAR_W:this.x+8*CatConstants.FRONT_W,this.y+5,this.w-8*CatConstants.REAR_W-8*CatConstants.FRONT_W+1,19,CatConstants.BODY_COLOR)),Util.pal(14,0)
var i=this.right?this.x+1:this.x+this.w-8*CatConstants.TAIL_W
for(n=-1;n<=1;n+=2)spr(CatConstants.TAIL_WALK_FRAMES[0],i+n,this.y-8*CatConstants.TAIL_H,0,void 0,this.right?void 0:1,void 0,CatConstants.TAIL_W,CatConstants.TAIL_H),spr(CatConstants.TAIL_WALK_FRAMES[0],i,this.y-8*CatConstants.TAIL_H+n,0,void 0,this.right?void 0:1,void 0,CatConstants.TAIL_W,CatConstants.TAIL_H)
Util.pal(),spr(CatConstants.TAIL_WALK_FRAMES[0],i,this.y-8*CatConstants.TAIL_H,0,void 0,this.right?void 0:1,void 0,CatConstants.TAIL_W,CatConstants.TAIL_H),line(this.right?i+3:i+8,this.y,this.right?i+7:i+8+4,this.y,CatConstants.BODY_COLOR)
var o=this.right?this.x+this.w-8*CatConstants.HEAD_W+20+1:this.x-20
Util.pal(14,0),Util.pal(15,0)
for(n=-1;n<=1;n+=2)spr(this.headFrame,o+n,this.y-10,0,void 0,this.right?void 0:1,void 0,CatConstants.HEAD_W,CatConstants.HEAD_H),spr(this.headFrame,o,this.y-10+n,0,void 0,this.right?void 0:1,void 0,CatConstants.HEAD_W,CatConstants.HEAD_H)
Util.pal(),spr(this.headFrame,o,this.y-10,0,void 0,this.right?void 0:1,void 0,CatConstants.HEAD_W,CatConstants.HEAD_H),debug&&(line(this.x,this.y,this.x,this.y+32,6),line(this.x+this.w,this.y,this.x+this.w,this.y+32,6))},Cat}()
var Collision=function(){function Collision(){}return Collision.intersectsPointBox=function(t,n){var s=!1
return s=Math.floor(t.x)>=Math.floor(n.x)&&Math.floor(t.x)<Math.floor(n.x+n.w)&&Math.floor(t.y)>=Math.floor(n.y)&&Math.floor(t.y)<Math.floor(n.y+n.h)?!0:s},Collision.intersectsBoxBox=function(t,n){var s=t.x-n.x
var i=.5*t.w+.5*n.w
return!(Math.abs(s)>=i||(s=t.y-n.y,i=.5*t.h+.5*n.y,Math.abs(s)>-i))},Collision.collideSideMap=function(t,n){if(t.scene.map){var s=t.h/3
for(var i=-s;i<=s;i+=2){var o
var e=t.x/8+t.scene.map.x
var a=(t.y+t.h/2+i)/8+t.scene.map.y
var r=mget(e,a)
if(fget(r,n))return t.dx=0,t.x=8*Math.floor(t.x/8)+8,!0
if(e=(o=t.x+t.w)/8+t.scene.map.x,a=(t.y+t.h/2+i)/8+t.scene.map.y,r=mget(e,a),fget(r,n))return t.dx=0,t.x=8*Math.floor(o/8)-t.w,!0}}return!1},Collision.collideFloorMap=function(t,n){if(!t.scene.map)return!1
if(t.dy<0)return!1
var s=t.w/3
var i=!1
for(var o=-s;o<=s;o+=2){var e=(t.x+t.w/2+o)/8+t.scene.map.x
var a=(t.y+t.h)/8+t.scene.map.y
e=mget(e,a)
fget(e,n)&&(t.dy=0,t.y=8*Math.floor((t.y+t.h)/8)-t.h,t.grounded=!0,i=!(t.airTime=0))}return i},Collision.collideRoofMap=function(t,n){if(!t.scene.map)return!1
var s=t.w/3
for(var i=-s;i<=s;i+=2){var o=(t.x+t.w/2+i)/8+t.scene.map.x
var e=t.y/8+t.scene.map.y
o=mget(o,e)
fget(o,n)&&(t.dy=0,t.y=8*Math.floor(t.y/8)+8,t.jumpHoldTime=0)}},Collision}()
var Easing=function(){function Easing(){}return Easing.linear=function(t){return t},Easing.easeInQuad=function(t){return t*t},Easing.easeOutQuad=function(t){return 1- --t*t},Easing.easeInOutQuad=function(t){return t<.5?t*t*2:1- --t*t*2},Easing.easeOutInQuad=function(t){return t<.5?.5-(t-=.5)*t*2:.5+(t-=.5)*t*2},Easing.easeInQuart=function(t){return t*t*t*t},Easing.easeOutQuart=function(t){return 1- --t*t*t*t},Easing.easeInOutQuart=function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},Easing.easeOutInQuart=function(t){return t<.5?.5-8*(t-=.5)*t*t*t:.5+8*(t-=.5)*t*t*t},Easing.easeInOvershoot=function(t){return 2.7*t*t*t-1.7*t*t},Easing.easeOutOvershoot=function(t){return 1+2.7*--t*t*t+1.7*t*t},Easing.easeInOutOvershoot=function(t){return t<.5?(21.6*t*t*t-6.8*t*t)/2:1+(21.6*--t*t*t+6.8*t*t)/2},Easing.easeOutInOvershoot=function(t){return t<.5?(21.6*(t-=.5)*t*t+6.8*t*t)/2+.5:(21.6*(t-=.5)*t*t-6.8*t*t)/2+.5},Easing.easeInElastic=function(t){return 0==t?0:Math.pow(2,10*t-10)*Util.picoCos(2*t-2)},Easing.easeOutElastic=function(t){return 1==t?1:1-Math.pow(2,-10*t)*Util.picoCos(2*t)},Easing.easeInOutElastic=function(t){return t<.5?Math.pow(2,20*t-10)*Util.picoCos(4*t-2)/2:(t-=.5,1-Math.pow(2,-20*t)*Util.picoCos(4*t)/2)},Easing.easeOutInElastic=function(t){return t<.5?.5-Math.pow(2,-20*t)*Util.picoCos(4*t)/2:(t-=.5,Math.pow(2,20*t-10)*Util.picoCos(4*t-2)/2+.5)},Easing.easeInBounce=function(t){var n=7.5625
var s=2.75
return(t=1-t)<1/s?1-n*t*t:t<2/s?1-n*(t-=1.5/s)*t-.75:t<2.5/s?1-n*(t-=2.25/s)*t-.9375:1-n*(t-=2.625/s)*t-.984375},Easing.easeOutBounce=function(t){var n=7.5625
var s=2.75
return t<1/s?n*t*t:t<2/s?n*(t-=1.5/s)*t+.75:t<2.5/s?n*(t-=2.25/s)*t+.9375:n*(t-=2.625/s)*t+.984375},Easing}()
var FancyText=function(){function FancyText(){var i=this
this.text="Some fancy text!",this.x=0,this.y=0,this.scale=1,this.fixedWidth=!1,this.smallFont=!1,this.textColor=0,this.backgroundColor=12,this.bubbleSize=0,this.marginX=0,this.marginY=0,this.baseHeight=6,this.update=function(){},this.draw=function(){clip(0,0,0,0)
var t=i.printMe()
clip()
var n={x:i.x-i.marginX,y:i.y-i.marginY,w:t+2*i.marginX,h:i.baseHeight*i.scale+2*i.marginY}
if(null!=i.backgroundColor&&(rect(n.x,n.y,n.w,n.h,i.backgroundColor),0<i.bubbleSize))for(var s=1;s<=i.bubbleSize;s+=1)rect(n.x-s,n.y+s,n.w+2*s,n.h-2*s,i.backgroundColor)
i.printMe()}}return FancyText.prototype.printMe=function(){return print(this.text,this.x,this.y,this.textColor,this.fixedWidth,this.scale,this.smallFont)},FancyText}()
var Map=function(t){var n
this.x=null!=(n=t.x)?n:0,this.y=null!=(n=t.y)?n:0,this.w=null!=(n=t.w)?n:Constants.MAP_WIDTH_DEFAULT,this.h=null!=(n=t.h)?n:Constants.MAP_HEIGHT_DEFAULT}
var Platform=function(){function Platform(t,n){this.dx=0,this.dy=0,this.update=function(){},this.draw=function(){},this.x=n.x,this.y=n.y,this.w=n.w,this.h=n.h,this.scene=t}return Platform.prototype.collideFloor=function(t){if(t.dy<0)return!1
var n=t.w/3
var s=!1
for(var i=-n;i<=n;i+=2){var o=new Vector(t.x+t.w/2+i,t.y+t.h)
if(Collision.intersectsPointBox(o,this)){t.dy=0,t.y=Math.floor(this.y-t.h+this.dy),t.x=t.x+this.dx,t.grounded=!0,s=!(t.airTime=0)
break}}return s},Platform}()
var PlatformerSpriteConfig=function(t){function PlatformerSpriteConfig(){return null!==t&&t.apply(this,arguments)||this}return __extends(PlatformerSpriteConfig,t),PlatformerSpriteConfig}(SpriteConfig)
var PlatformerSpriteButton=function(){function PlatformerSpriteButton(t){this.isPressed=!1,this.isDown=!1,this.ticksDown=0,this.jumpBtn=t}return PlatformerSpriteButton.prototype.update=function(){this.isPressed=!1,btn(this.jumpBtn)?(this.isDown||(this.isPressed=!0),this.isDown=!0,this.ticksDown+=1):(this.isDown=!1,this.isPressed=!1,this.ticksDown=0)},PlatformerSpriteButton}()
var PlatformerSprite=function(s){function PlatformerSprite(t,n){var o=s.call(this,t,n)||this
return o.dx=0,o.dy=0,o.dxMax=1,o.dyMax=4,o.jumpSpeed=-1.5,o.acc=.1,o.dcc=.25,o.airDcc=1,o.grav=.15,o.jumpHoldTime=0,o.maxJumpPress=15,o.jumpBtnReleased=!0,o.grounded=!1,o.airTime=0,o.update=function(){var t=btn(2)
var n=!t&&btn(3)
var s,i
t?o.dx-=o.acc:n?o.dx+=o.acc:o.grounded?o.dx*=o.dcc:o.dx*=o.airDcc,o.dx=Util.clamp(o.dx,-o.dxMax,o.dxMax),o.x+=o.dx,Collision.collideSideMap(o,1),o.jumpButton.update(),o.jumpButton.isDown?(s=o.grounded||o.airTime<5,i=o.jumpButton.ticksDown<10,(0<o.jumpHoldTime||s&&i)&&(o.jumpHoldTime,o.jumpHoldTime+=1,o.jumpHoldTime<o.maxJumpPress)&&(o.dy=o.jumpSpeed)):o.jumpHoldTime=0,o.dy+=o.grav,o.dy=Util.clamp(o.dy,-o.dyMax,o.dyMax),o.y+=o.dy,Collision.collideFloorMap(o,1)||o.collidePlatforms()||(o.grounded=!1,o.airTime+=1),Collision.collideRoofMap(o,1),o.grounded&&(n||t)&&o.dx,n&&(o.flipX=!1),t&&(o.flipX=!0)},o.jumpButton=new PlatformerSpriteButton(n.jumpButton||4),o}return __extends(PlatformerSprite,s),PlatformerSprite.prototype.collidePlatforms=function(){for(var t=0,n=this.scene.platforms;t<n.length;t++)if(n[t].collideFloor(this))return!0
return!1},PlatformerSprite}(Sprite)
var PositionTween=function(){function PositionTween(t){this.frameCounter=0,this.frameCounterIncrement=1,this.delayCompleted=!1,this.done=!1,this.repeatCounter=0,this.paused=!1,this.config=__assign(__assign({},t),{delayFrames:t.delayFrames?Math.floor(t.delayFrames):0,repeat:t.repeat?Math.floor(t.repeat):0,yoyo:t.yoyo||!1,easing:t.easing||Easing.linear,callback:t.callback||function(){}})}return PositionTween.prototype.getAbsoluteProgress=function(){var t=this.frameCounter/this.config.durationFrames
return t=Math.min(t,1),Math.max(t,0)},PositionTween.prototype.getEasedProgress=function(){var t=this.getAbsoluteProgress()
return this.config.easing(t)},PositionTween.prototype.TIC=function(){var t,n
this.done||this.paused||(!this.delayCompleted&&this.frameCounter>=this.config.delayFrames&&(this.delayCompleted=!0,this.frameCounter=0),this.delayCompleted&&(t=this.getAbsoluteProgress(),n=this.getEasedProgress(),void 0!==this.config.startX&&void 0!==this.config.endX&&(this.config.target.x=Util.lerp(this.config.startX,this.config.endX,n)),void 0!==this.config.startY&&void 0!==this.config.endY&&(this.config.target.y=Util.lerp(this.config.startY,this.config.endY,n)),0<this.frameCounterIncrement&&1===t?this.config.yoyo?this.frameCounterIncrement=-1:(this.repeatCounter++,this.frameCounter=0):this.frameCounterIncrement<0&&0===t&&(this.repeatCounter++,this.frameCounterIncrement=1),0<=this.config.repeat)&&this.repeatCounter>this.config.repeat&&(this.config.callback(),this.done=!0),this.frameCounter+=this.frameCounterIncrement)},PositionTween.prototype.setPaused=function(t){this.paused=t},PositionTween}()
var Util=function(){function Util(){}
// Simulates PICO-8's sin(), which takes "turns" as input instead of rads
return Util.picoSin=function(t){t*=2*Math.PI
return-Math.sin(t)},
// Simulates PICO-8's cos(), which takes "turns" as input instead of rads
Util.picoCos=function(t){t*=2*Math.PI
return Math.cos(t)},Util.clamp=function(t,n,s){return Math.min(Math.max(t,n),s)},Util.round=function(t){return Math.floor(t+.5)},Util.pal=function(t,n){if(null!=t&&null!=n)poke4(32736+t,n)
else for(var s=0;s<16;s++)poke4(32736+s,s)},Util.secondsToFrames=function(t){return Math.floor(60*t)},Util.lerp=function(t,n,s){return t+(n-t)*s},Util.invlerp=function(t,n,s){return n-t==0?0:(s-t)/(n-t)},Util}()

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
// 132:00ee00000eeee0000eeeeee00eeeeeee0eeeeeee0eeeeeee0eeeeeee0eeeeeee
// 133:00000000000000000000000000000000ee000000eee00000eeeeeeefeeeeeeff
// 134:00000000000000000000000000000000000000ee00000eeefeeeeeeeffeeeeee
// 135:0000ee00000eeee00eeeeee0eeeeeee0eeeeeee0eeeeeee0eeeeeee0eeeeeee0
// 136:00ee00000eeee0000eeeeee00eeeeeee0eeeeeee0eeeeeee0eeeeeee0eeeeeee
// 137:00000000000000000000000000000000ee000000eee00000eeeeeeefeeeeeeff
// 138:00000000000000000000000000000000000000ee00000eeefeeeeeeeffeeeeee
// 139:0000ee00000eeee00eeeeee0eeeeeee0eeeeeee0eeeeeee0eeeeeee0eeeeeee0
// 140:00ee00000eeee0000eeeeee00eeeeeee0eeeeeee0eeeeeee0eeeeeee0eeeeeee
// 141:00000000000000000000000000000000ee000000eee00000eeeeeeefeeeeeeff
// 142:00000000000000000000000000000000000000ee00000eeefeeeeeeeffeeeeee
// 143:0000ee00000eeee00eeeeee0eeeeeee0eeeeeee0eeeeeee0eeeeeee0eeeeeee0
// 148:0eeeeeee0eeeeeee00eeeeef00eeeeff00eeeeff00eeeefc000eeefc000eeeef
// 149:eeeeeeffffffefffffffffffffffffffcccfffffcc33ffffcc33cfffcccccfff
// 150:ffeeeeeefffefffffffffffffffffffffffffcccffff33ccfffc33ccfffccccc
// 151:eeeeeee0eeeeeee0feeeee00ffeeee00ffeeee00cfeeee00cfeee000feeee000
// 152:0eeeeeee0eeeeeee00eeeeef00eeeeff00eeeeff00eeeeff000eeefc000eeeef
// 153:eeeeeeffffffefffffffffffffffffffffffffffffffffffcccccfffffffffff
// 154:ffeeeeeefffefffffffffffffffffffffffffffffffffffffffcccccffffffff
// 155:eeeeeee0eeeeeee0feeeee00ffeeee00ffeeee00ffeeee00cfeee000feeee000
// 156:0eeeeeee0eeeeeee00eeeeef00eeeeff00eeeeff00eeeefc000eeeff000eeeef
// 157:eeeeeeffffffefffffffffffffffffffcccffffffffcffffffffcfffffffffff
// 158:ffeeeeeefffefffffffffffffffffffffffffcccffffcffffffcffffffffffff
// 159:eeeeeee0eeeeeee0feeeee00ffeeee00ffeeee00cfeeee00ffeee000feeee000
// 164:000eeeee000eeeee0000eeee0000eeee00000eee000000ee0000000e00000000
// 165:ffcccfffeeefff44eefffff4efffffffffffffffffff4ff4effff44fefffffff
// 166:fffcccff44fffeee4fffffeefffffffeffffffff4ff4fffff44ffffefffffffe
// 167:eeeee000eeeee000eeee0000eeee0000eee00000ee000000e000000000000000
// 168:000eeeee000eeeeb0000eeeb0000bbee000bbbee000bbbee0000bb0e00000000
// 169:bbffffffbbefff44befffff4effffffffffffff4ffffff44efffff44efffff4f
// 170:ffffffbb44fffebb4fffffebfffffffe4fffffff44ffffff44fffffef4fffffe
// 171:eeeee000beeee000beee0000eebb0000eebbb000eebbb000e0bb000000000000
// 172:000eeeee000eeeee0000eeee0000eeee00000eee000000ee0000000e00000000
// 173:ffffffffeeefff44eefffff4efffffffffff4ff4fffff444efffff44effffff4
// 174:ffffffff44fffeee4fffffeefffffffe4ff4ffff444fffff44fffffe4ffffffe
// 175:eeeee000eeeee000eeee0000eeee0000eee00000ee000000e000000000000000
// 181:00ffffff00000fff000000000000000000000000000000000000000000000000
// 182:ffffff00fff00000000000000000000000000000000000000000000000000000
// 184:0000000000bb00000bbb0000bbbb0000bbbb00000bb000000000000000000000
// 185:00ffffff00000fff000000000000000000000000000000000000000000000000
// 186:ffffff00fff00000000000000000000000000000000000000000000000000000
// 187:000000000000bb000000bbb00000bbbb0000bbbb00000bb00000000000000000
// 189:00ffffff00000fff000000000000000000000000000000000000000000000000
// 190:ffffff00fff00000000000000000000000000000000000000000000000000000
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
// 000:00000000ffffffff00000000ffffffff
// 001:0123456789abcdeffedcba9876543210
// 002:0123456789abcdef0123456789abcdef
// </WAVES>

// <SFX>
// 000:c0a0c0a1c0a2c0a3c0a4c0a4c0a5c0a5c0a5c0a5c0a5c0afc0adc0acc0acc0a8c0a8c0a0c0a1c0a2c0a3c0a3c0a4c0a5c0a6c0a7c0aec0afc0a0c0a03f900000000f
// 001:e0c8c0c9a0cb80bd70bf700050b150b3400430b510b610b700062000100010001000100010001000100010001000100010001000100070009000f000320000000000
// </SFX>

// <TRACKS>
// 000:100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// </TRACKS>

// <PALETTE>
// 000:1a1c2c5d275db13e53ef7d57ffcd75a7f07038b76425717929366f3b5dc941a6f673eff7f4f4f494b0c2566c86333c57
// </PALETTE>

