var canvas = document.getElementById("canvas");
var actions = document.getElementById("actions");
var context = canvas.getContext("2d");
begin = {
  beginX: 0,
  beginY: 0
}
var isDrawStart = false;
var eraserEnabled = false;
var eraser = document.getElementById("eraser");
var brush = document.getElementById("brush");
//红色画笔
var red = document.getElementById("red");
//蓝色画笔
var blue = document.getElementById("blue");
//绿色画笔
var green = document.getElementById("green");
//粗画笔
var thick = document.getElementById("thick");
//细画笔
var thin = document.getElementById("thin");
//清除按钮
var clear = document.getElementById("clear");
//保存按钮
var save = document.getElementById("save");


//1. 自动调整画笔宽高
autoSetCanvasSize();

eraser.onclick = function () {
  eraserEnabled = true;
  eraser.classList.add("active");
  brush.classList.remove("active");
}
brush.onclick = function () {
  eraserEnabled = false;
  brush.classList.add("active");
  eraser.classList.remove("active");
}

red.onclick = function(){
  context.strokeStyle = "red";
  red.classList.add("active");
  blue.classList.remove("active");
  green.classList.remove("active");
}

thin.onclick = function(){
  context.lineWidth = 6;
}
thick.onclick = function(){
  context.lineWidth = 10;
}

blue.onclick = function(){
  context.strokeStyle = "blue";
  blue.classList.add("active");
  red.classList.remove("active");
  green.classList.remove("active");
}

green.onclick = function(){
  context.strokeStyle = "green";
  green.classList.add("active");
  red.classList.remove("active");
  blue.classList.remove("active");
}

clear.onclick = function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
}

save.onclick = function(){
  var url = canvas.toDataURL("image/png");
  var a = document.createElement("a");
  a.href = url;
  a.download = "我的画";
  a.click();
}

//2. 监听用户操作
listenToUser();

//初始化画笔颜色为绿色
context.strokeStyle = "green";
//初始化画笔为细线(6px)
context.lineWidth = 6;

function drawCircle(x, y, radius) {
  context.beginPath();
  context.fillStyle = "red";
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  // context.strokeStyle = "black";
  // context.lineWidth = 6;
  context.moveTo(x1, y1);

  context.lineTo(x2, y2);
  context.stroke();
  begin.beginX = x2;
  begin.beginY = y2;
}

function autoSetCanvasSize() {
  setCanvasSize();

  function setCanvasSize() {
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;
    canvas.width = clientWidth;
    canvas.height = clientHeight;
  }
  window.onresize = function () {
    setCanvasSize();
  }
}


//监听用户操作
function listenToUser() {
  if (document.body.ontouchstart === undefined) {
    console.log("333");
    //按下鼠标
    canvas.onmousedown = function (e) {
      isDrawStart = true;
      var x = e.clientX;
      var y = e.clientY;
      begin.beginX = x;
      begin.beginY = y;

    }

    //移动鼠标
    canvas.onmousemove = function (e) {
      var x = e.clientX;
      var y = e.clientY;
      if (isDrawStart) {
        if (eraserEnabled) {
          context.clearRect(x - 6, y - 6, 15, 15)
        } else {
          drawLine(begin.beginX, begin.beginY, x, y);
        }
      }
    }
    //弹起鼠标
    canvas.onmouseup = function (e) {
      isDrawStart = false;
    }
  } else {
    //开始触摸
    canvas.ontouchstart = function (e) {
      e.preventDefault();
      isDrawStart = true;
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      begin.beginX = x;
      begin.beginY = y;

    }

    //触摸移动
    canvas.ontouchmove = function (e) {
      e.preventDefault();
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      if (isDrawStart) {
        if (eraserEnabled) {
          context.clearRect(x - 6, y - 6, 15, 15)
        } else {
          drawLine(begin.beginX, begin.beginY, x, y);
        }
      }
    }
    //触摸结束
    canvas.ontouchend = function (e) {
      e.preventDefault();
      isDrawStart = false;
    }
  }

}