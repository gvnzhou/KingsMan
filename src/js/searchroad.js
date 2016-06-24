// 开放队列
var openList = (function() {

  var openArr = [];

  return {
    // 添加到队列
    add: function(point){
      openArr.push(point);
    },

    // 计算队列长度
    count: function(){
      return openArr.length;
    },

    // 得到开放队列中f值最小的点
    minPoint: function(){

      openArr.forEach(function(item, index){

        
        
      });

    }

  };


}());

// 闭合队列
var closeList = (function() {



}());

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
  
  console.log("aa")

  while(openList.count() !== 0)
  {
    //找出F值最小的点
    var tempStart = openList.minPoint();




  }

};