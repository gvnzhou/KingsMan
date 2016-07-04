// 开放队列
var openList = (function() {

  var _openArr = [];

  return {
    // 添加到队列
    add: function(point){
      _openArr.push(point);
    },

    // 计算队列长度
    count: function(){
      return _openArr.length;
    },

    // 得到开放队列中f值最小的点
    minPoint: function(){

      _openArr.forEach(function(item, index){

      
      });

    },
    // 删除某个点
    removeAt: function(index) {
      _openArr.splice(index,1);
    },
    // look
    lookArr: function() {
      console.log(_openArr);
    }

  };


})();

// 闭合队列
var closeList = (function() {



})();

// 路径
var roadArr = []; 


/**
 * 寻找线路方法，A*寻路算法
 * @param  
 * @param  
 * @return 坐标线路数组
 */
var findPath = function(start, end) {

  openList.add(start);
  openList.lookArr();
  
  // 循环
  while(openList.count() !== 0)
  {

    // 找出F值最小的点
    var tempStart = openList.minPoint();
    openList.removeAt(0);
    openList.lookArr();
    // 找出它相邻的点


    
    // 
    break;
  }

};
/*****公共方法*****/

function $(el){
  return document.querySelector(el);
}
function $$(el){
  return document.querySelectorAll(el);
}

// 跨浏览器事件处理程序
var eventUtil = {
  // 添加句柄
  addHandler : function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    }
    else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    }
    else {
      element['on' + type] = handler;
    }
  },
  // 删除句柄
  removeHandler : function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    }
    else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    }
    else {
      element['on' + type] = null;
    }
  }
};


// 创建游戏场景
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 320;
canvas.height = 560;
document.body.appendChild(canvas);

// 游戏对象
var kingsMan = {
  speed: 256, //每秒移动的像素
  x: 180,
  y: 20
};

// 终点对象
var endPoint = {
  x: 0,
  y: 0
};

// 墙体对象
var block = {
  width: 40, // 墙体宽
  height: 40 // 墙体高
};
  
// 方格横坐标
var cooX = [
[0,40],[40,80],[80,120],[120,160],[160,200],[200,240],[240,280],[280,320]
];
// 方格纵坐标
var cooY = [
[0,40],[40,80],[80,120],[120,160],[160,200],[200,240],[240,280],[280,320],[320,360],[360,400],[400,440],[440,480],[480,520],[520,560]
];

// 墙体数组
var wallBlockArr = [];

// 关卡数
var stageNum = 0;

// 处理按键
var keysDown = {};

// 监听游戏画布上的点击事件
eventUtil.addHandler($('canvas'), "click", function(e) {

  // 目标块坐标
  var targetBlock;
  
  // 计算所属方块
  targetBlock = calTargetBlock(e.offsetX,e.offsetY);

  console.log(targetBlock);

  findPath([20,180], targetBlock);
},false);


eventUtil.addHandler(window, "keydown", function (e) {
  keysDown[e.keyCode] = true;
}, false);

eventUtil.addHandler(window, "keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// 计算所属的块
var calTargetBlock = function(x, y) {
  var targetBlock = {};
  var targetX, targetY;

  // 判断x属于哪一块
  cooX.forEach(function(item, index){
    if (x > item[0] && x < item[1]) {
      targetX = index;
      targetBlock[0] = targetX;
    }
  });

  // 判断y属于哪一块
  cooY.forEach(function(item, index){
    if (y > item[0] && y < item[1]) {
      targetY = index;
      targetBlock[1] = targetY;
    }
  });

  // 判断点击的是不是墙体
  
  return targetBlock;
};


// 当特工抵达终点后开始新一轮游戏
var reset = function () {

  // 生成随机关卡，13行墙体，每行两个障碍物
  wallBlockArr = createBlock(13, 2);

  console.log(wallBlockArr);
};

/**
 * 随机生成关卡二维数组
 * @param  {[type]} row [多少行墙体]
 * @param  {[type]} col [多少列墙体]
 * @return {[type]}     [墙体数组]
 */
var createBlock = function(row, col) {
  var tempBlockArr = [];
  for( var i = 1; i < row; i++) {
    var blockRow = [];
    for (var j = 0; j < col; j++) {
      var k = Math.floor(Math.random()*8);
      blockRow.push(k);
    }
    tempBlockArr.push(blockRow);
  }
  return tempBlockArr;
};

// 更新游戏对象的属性
var update = function (modifier) {
  if (38 in keysDown) { // 用户按的是↑
    kingsMan.y -= kingsMan.speed * modifier;
  }
  if (40 in keysDown) { // 用户按的是↓
    kingsMan.y += kingsMan.speed * modifier;
  }
  if (37 in keysDown) { // 用户按的是←
    kingsMan.x -= kingsMan.speed * modifier;
  }
  if (39 in keysDown) { // 用户按的是→
    kingsMan.x += kingsMan.speed * modifier;
  }

  // 英雄与怪物碰到了么？
  if (kingsMan.x <= (endPoint.x + 32) && endPoint.x <= (kingsMan.x + 32) && kingsMan.y <= (endPoint.y + 32) && endPoint.y <= (kingsMan.y + 32)) 
  {
    ++stageNum;
    reset();
  }
};


// 渲染所有物体
var render = function () {
  // 背景
  ctx.fillStyle = "#FFE6CD";
  ctx.fillRect(0,0,320,560);

  // 特工
  ctx.beginPath();
  ctx.arc(kingsMan.x,kingsMan.y,20,0,Math.PI*2);
  ctx.fillStyle="#44B811";
  ctx.fill();

  // 终点
  ctx.beginPath();
  ctx.moveTo(140,560);
  ctx.lineTo(160,520);
  ctx.lineTo(120,520);
  ctx.fillStyle="#F4AF29";
  ctx.fill();

  // 计分
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.font = "20px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Stage: " + stageNum, 10, 10);

  // 渲染墙体
  ctx.fillStyle = "#2E1E1E";
  wallBlockArr.forEach(function(item, index){
    var i = index + 1;
    item.forEach(function(item, index){
      ctx.fillRect(item*block.width, i*block.height, block.width, block.height);
    });
  });

};





// 游戏主函数
var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  // 立即调用主函数
  requestAnimationFrame(main);
};

// 少年，开始游戏吧！
var then = Date.now();
reset();
main();
/**
 * Point类
 * @param {[type]} x [description]
 * @param {[type]} y [description]
 */
function Point(obj) {
  this.X = obj.x;
  this.Y = obj.y;
}

Point.prototype.calF = function() {
  var F,G,H;
  
};

