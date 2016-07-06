/**
 * Point类
 * @param {[type]} x [description]
 * @param {[type]} y [description]
 */
function Point(point) {
  this.X = point[0];
  this.Y = point[1];
  this.parents = 0;
}

// 计算F值
Point.prototype.calF = function() {
 

    // H = 点到终点距离，G = 父节点到自身的距离
    var F,G,H;
    H = Math.abs(targetBlock[0] - this.X) + Math.abs(targetBlock[1] - this.Y);
    G = Math.abs(this.parents.X - this.X) + Math.abs(this.parents.Y - this.Y);
    F = H + G;
    return point;
  
  
};
