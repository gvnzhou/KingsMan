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
  y: 20,
  sx: 4,
  sy: 0,
  flag: 1 // 标识符开始点
};

// 终点对象
var endPoint = {
  x: 3,
  y: 13
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

// 目标块坐标
var targetBlock;

// 监听游戏画布上的点击事件
eventUtil.addHandler($('canvas'), "click", function(e) {
  
  // 计算所属方块
  targetBlock = calTargetBlock(e.offsetX,e.offsetY);

  //console.log(targetBlock);

  findPath({x:kingsMan.sx, y:kingsMan.sy,flag:kingsMan.flag}, targetBlock);
  
  // 绘制移动路径
  renderMovePath();
  


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
      targetBlock.x = targetX;
    }
  });

  // 判断y属于哪一块
  cooY.forEach(function(item, index){
    if (y > item[0] && y < item[1]) {
      targetY = index;
      targetBlock.y = targetY;
    }
  });

  // 判断点击的是不是墙体
  
  return targetBlock;
};


// 当特工抵达终点后开始新一轮游戏
var reset = function () {
  // 生成随机关卡，13行墙体，每行两个障碍物
  wallBlockArr = createBlock(13, 2);
  // 初始化起点坐标
  kingsMan.x = 180;
  kingsMan.y = 20;
  kingsMan.sx = 4;
  kingsMan.sy = 0;
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

  // 是否达到终点
  if (kingsMan.sx == endPoint.x && kingsMan.sy == endPoint.y) 
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
  ctx.moveTo((endPoint.x + 1) * 40 - 20,(endPoint.y + 1) * 40);
  ctx.lineTo((endPoint.x + 1) * 40,endPoint.y * 40);
  ctx.lineTo(endPoint.x * 40,endPoint.y * 40);
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
  renderBlock(wallBlockArr);

};

// 渲染移动路径
var renderMovePath = function() {
  var i = 0;
  timer = setInterval(function (argument) {
    if (i < roadArr.length) {
      kingsMan.x = roadArr[i].x * 40 + 20;
      kingsMan.y = roadArr[i].y * 40 + 20;
      kingsMan.sx = roadArr[i].x;
      kingsMan.sy = roadArr[i].y;
      render();
    } else {
      clearInterval(timer);
      initFindPath();
    }
    ++i;
  },150);
};

// 渲染墙体方法
function renderBlock(arr) {
  arr.forEach(function(item, index){
    var i = index + 1;
    item.forEach(function(item, index){
      ctx.fillRect(item*block.width, i*block.height, block.width, block.height);
    });
  });
}



