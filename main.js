var canvas = document.getElementById("canvas");

var context = canvas.getContext("2d");

var load_counter = 0;

var background = new Image();
var clouds = new Image();
var floaties_1 = new Image();
var floaties_2 = new Image();
var shadows = new Image();
var mask = new Image();
var humans = new Image();
var floaties_3 = new Image();

var layer_list = [
  {
    image: background,
    src: "./images/layer_1_1.png",
    "z-index": -2.25,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 1,
  },
  {
    image: clouds,
    src: "./images/layer_2_1.png",
    "z-index": -2,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 1,
  },
  {
    image: floaties_1,
    src: "./images/layer_3_1.png",
    "z-index": -1.25,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 1,
  },
  {
    image: floaties_2,
    src: "./images/layer_4_1.png",
    "z-index": -0.5,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 1,
  },
  {
    image: shadows,
    src: "./images/layer_5_1.png",
    "z-index": -1.5,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 1,
  },
  {
    image: mask,
    src: "./images/layer_6_1.png",
    "z-index": 0,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 1,
  },
  {
    image: humans,
    src: "./images/layer_7_1.png",
    "z-index": 0.8,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 1,
  },
  {
    image: floaties_3,
    src: "./images/layer_8_1.png",
    "z-index": 2,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 0.8,
  },
];

layer_list.forEach(function (layer, index) {
  layer.image.onload = function () {
    load_counter += 1;
    if (load_counter == layer_list.length) {
      requestAnimationFrame(drawCanvas);
    }
  };
  layer.image.src = layer.src;
});

function drawCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  layer_list.forEach(function (layer, index) {
    if (layer.blend) {
      context.globalCompositeOperation = layer.blend;
    } else {
      context.globalCompositeOperation = "normal";
    }
    context.globalAlpha = layer.opacity;
    context.drawImage(layer.image, layer.position.x, layer.position.y);
  });
  requestAnimationFrame(drawCanvas);
}
