// Canvas 가져오기
var canvas = document.getElementById("canvas");

// Canvas Context 가져오기
var context = canvas.getContext("2d");

// loading 초기화
var load_counter = 0;

// Image Layer 초기 설정
var background = new Image();
var clouds = new Image();
var floaties_1 = new Image();
var floaties_2 = new Image();
var shadows = new Image();
var mask = new Image();
var humans = new Image();
var floaties_3 = new Image();

// Layer 객체 목록 생성

// image: 이미지 변수 이름
// src: 실제 이미지 경로
// z_index: 3D 공간에서 객체가 얼마나 가깝게 나타나야 하는지 (0은 중간)
// position: 위치
// blend: 레이어에서 사용할 혼합 모드 (기본값은 null)
// opacity: 레이어를 투명하게 표시할 것인지 여부 (0은 완전히 투명, 1은 완전히 불투명)
var layer_list = [
  {
    image: background,
    src: "./images/layer_1_1.png",
    z_index: -2.25,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 1,
  },
  {
    image: clouds,
    src: "./images/layer_2_1.png",
    z_index: -2,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 1,
  },
  {
    image: floaties_1,
    src: "./images/layer_3_1.png",
    z_index: -1.25,
    position: { x: 0, y: 0 },
    blend: "overlay",
    opacity: 1,
  },
  {
    image: floaties_2,
    src: "./images/layer_4_1.png",
    z_index: -0.5,
    position: { x: 0, y: 0 },
    blend: "overlay",
    opacity: 1,
  },
  {
    image: shadows,
    src: "./images/layer_5_1.png",
    z_index: -1.5,
    position: { x: 0, y: 0 },
    blend: "multiply",
    opacity: 1,
  },
  {
    image: mask,
    src: "./images/layer_6_1.png",
    z_index: 0,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 1,
  },
  {
    image: humans,
    src: "./images/layer_7_1.png",
    z_index: 0.8,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 1,
  },
  {
    image: floaties_3,
    src: "./images/layer_8_1.png",
    z_index: 2,
    position: { x: 0, y: 0 },
    blend: null,
    opacity: 0.9,
  },
];

layer_list.forEach(function (layer, index) {
  layer.image.onload = function () {
    load_counter += 1;
    if (load_counter >= layer_list.length) {
      requestAnimationFrame(drawCanvas);
    }
  };
  layer.image.src = layer.src;
});

function drawCanvas() {
  // 현재 캔버스에 있는 모든 항목 지우기
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 목록의 각 레이어를 순환하여 캔버스에 그리기
  layer_list.forEach(function (layer, index) {
    layer.position = getOffset(layer);

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

function getOffset(layer) {
  var touch_offset_x = pointer.x * layer.z_index;
  var touch_offset_y = pointer.y * layer.z_index;

  var offset = {
    x: touch_offset_x,
    y: touch_offset_y,
  };

  return offset;
}

// 터치와 마우스 컨트롤
var moving = false;

// 터치와 마우스 위치 초기화
var pointer_initial = {
  x: 0,
  y: 0,
};

var pointer = {
  x: 0,
  y: 0,
};

canvas.addEventListener("touchstart", pointerStart);
canvas.addEventListener("mousedown", pointerStart);

function pointerStart(event) {
  moving = true;
  if (event.type === "touchstart") {
    pointer_initial.x = event.touches[0].clientX;
    pointer_initial.y = event.touches[0].clientY;
  } else if (event.type === "mousedown") {
    pointer_initial.x = event.clientX;
    pointer_initial.y = event.clientY;
  }
}

window.addEventListener("touchmove", pointerMove);
window.addEventListener("mousemove", pointerMove);

function pointerMove(event) {
  event.preventDefault();
  if (moving === true) {
    var current_x = 0;
    var current_y = 0;
    if (event.type === "touchmove") {
      current_x = event.touches[0].clientX;
      current_y = event.touches[0].clientY;
    } else if (event.type === "mousemove") {
      current_x = event.clientX;
      current_y = event.clientY;
    }
    pointer.x = current_x - pointer_initial.x;
    pointer.y = current_y - pointer_initial.y;
  }
}
