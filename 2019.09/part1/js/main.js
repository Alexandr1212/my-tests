// Canvas init
var canvas = document.getElementById("stars"),
  ctx = canvas.getContext("2d"),
  canvas_background = document.getElementById("background");

// Draw stars
drawStar(290, 55, 5, 45, 25, "red");
drawStar(290, 140, 5, 45, 25, "blue");
drawStar(290, 225, 5, 45, 25, "green");
drawStar(290, 310, 5, 45, 25, "yellow");
drawStar(290, 395, 5, 45, 25, "black");

// Set click event
canvas.addEventListener("click", function (e) {
  var pos = findPos(this),
    x = e.pageX - pos.x,
    y = e.pageY - pos.y,
    position = ctx.getImageData(x, y, 1, 1).data,
    hex =
      "#" +
      (
        "000000" + rgbToHex(position[0], position[1], position[2], position[3])
      ).slice(-6);
  canvas_background.style.background = hex;
});
