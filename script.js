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

//1. 自动调整画笔宽高
autoSetCanvasSize();

eraser.onclick = function () {
  eraserEnabled = true;
  actions.className = "actions x"
}
brush.onclick = function () {
  eraserEnabled = false;
  actions.className = "actions"
}

//2. 监听用户操作
listenToUser();




function drawCircle(x, y, radius) {
  context.beginPath();
  context.fillStyle = "red";
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = "black";
  context.lineWidth = 6;
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
          context.clearRect(x - 6, y - 6, 10, 10)
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
      console.log(e);
      isDrawStart = true;
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      begin.beginX = x;
      begin.beginY = y;

    }

    //触摸移动
    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      if (isDrawStart) {
        if (eraserEnabled) {
          context.clearRect(x - 6, y - 6, 10, 10)
        } else {
          drawLine(begin.beginX, begin.beginY, x, y);
        }
      }
    }
    //触摸结束
    canvas.ontouchend = function (e) {
      isDrawStart = false;
    }
  }

}