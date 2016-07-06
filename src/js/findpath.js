
// 开放队列
var openList = (function() {

  // 开放队列数组
  var _openArr = [];

  // 

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
      if (this.count() > 1) {
        var min = _openArr[0].calF();
        _openArr.forEach(function(item, index) {
          if (min > item.calF()) {
            min = item.calF();
          }
        });
        return min;
      } else {
        return _openArr;
      }  
    },
    // 删除某个点
    removeAt: function(index) {
      _openArr.splice(index,1);
    },
    // 是否在开放列表中
    exists: function() {

    },
    // look
    lookArr: function() {
      console.log(_openArr[0].calF());
    }

  };


})();

// 闭合队列
var closeList = (function() {
  var _closeList = [];
  return {
    add: function(point) {
      _closeList.push(point);
    }
  }
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
  
  // 循环
  while(openList.count() !== 0)
  {

    // 找出F值最小的点
    var tempStart = openList.minPoint();
    // 找出它相邻的点
    var aroundPoints = sAroundPoints(tempStart);

    openList.removeAt(0);
    closeList.add(tempStart);

    aroundPoints.forEach(function(item, index) {
      if (openList.exists(item))
        //计算G值, 如果比原来的大, 就什么都不做, 否则设置它的父节点为当前点,并更新G和F
        FoundPoint(tempStart, point);
      else
        //如果它们不在开始列表里, 就加入, 并设置父节点,并计算GHF
        NotFoundPoint(tempStart, end, point);
    });
    
    break;
  }
  //return OpenList.Get(end);
};

var sAroundPoints = function(tempStart) {
  var x = tempStart[0].x;
  var y = tempStart[0].y;
  return [
    {x:x-1,y:y},
    {x:x-1,y:y-1},
    {x:x-1,y:y+1},
    {x:x+1,y:y},
    {x:x+1,y:y-1},
    {x:x+1,y:y+1},
    {x:x,y:y-1},
    {x:x,y:y+1}
  ];
}