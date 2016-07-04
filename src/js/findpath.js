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