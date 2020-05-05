
console.log('import win-wheel.js')

let wheelSpinning = false


let theWheel = new Winwheel({
  'numSegments': 8,   // Specify number of segments.
  'outerRadius': 200, // Set outer radius so wheel fits inside the background.
  // 'drawText': true,             // Code drawn text can be used with segment images.
  'textFontSize': 16, // Set text options as desired.
  'innerRadius': 50, // 中間的園
  // 'textOrientation'   : 'curved',
  // 'textAlignment'     : 'inner',
  // 'textMargin'        : 90,
  // 'textFontFamily'    : 'monospace',
  // 'textStrokeStyle'   : 'black',
  // 'textLineWidth'     : 3,
  // 'textFillStyle'     : 'white',
  // 'drawMode'          : 'segmentImage',    // Must be segmentImage to draw wheel using one image per segemnt.
  // 'responsive': true, // 箭頭會無法畫出來，需綁定 load, resize 事件 
  'segments':                    // Define segments including image and text.
  [
    // image: ''
   {'fillStyle': '#eae56f',  'text': '01'},
   {'fillStyle': '#89f26e',   'text': '02'},
   {'fillStyle': '#7de6ef',  'text': '03'},
   {'fillStyle': '#e7706f',  'text': '04'},
   {'fillStyle': '#eae56f', 'text': '05'},
   {'fillStyle': '#89f26e', 'text': '06'},
   {'fillStyle': '#7de6ef',  'text': '07'},
   {'fillStyle': '#e7706f', 'text': '08'}
  ],
  'animation' :           // Specify the animation to use.
  {
    'type'     : 'spinToStop',
    'duration' : 1,
    'spins'    : 5,
    'callbackFinished' : 'alertPrize()',
    'callbackAfter' : 'drawArrow()'
  },
});

// 畫箭頭
drawArrow();

// 指定停止位置
calculatePrize(2);

function drawArrow()
{
  console.log('drawArrow')
  theWheel.ctx.lineWidth = 2;
  theWheel.ctx.strokeStyle = 'black';
  theWheel.ctx.fillStyle = 'black';
  theWheel.ctx.beginPath();
  theWheel.ctx.moveTo(420, 15);
  theWheel.ctx.lineTo(460, 15);
  theWheel.ctx.lineTo(440, 47);
  theWheel.ctx.lineTo(420, 15);
  theWheel.ctx.stroke();
  theWheel.ctx.fill();
}

function drawArrowResize()
{



  let width = window.innerWidth


  console.log(width, theWheel._originalCanvasWidth, theWheel._originalCanvasHeight)



  // let percent = (width / winwheelToDrawDuringAnimation._originalCanvasWidth);

  let percent = 1

  console.log(percent)

  console.log('drawArrow')
  theWheel.ctx.lineWidth = 2;
  theWheel.ctx.strokeStyle = 'black';
  theWheel.ctx.fillStyle = 'black';
  theWheel.ctx.beginPath();
  theWheel.ctx.moveTo(420 * percent, 15 * percent);
  theWheel.ctx.lineTo(460 * percent, 15 * percent);
  theWheel.ctx.lineTo(440 * percent, 47 * percent);
  theWheel.ctx.lineTo(420 * percent, 15 * percent);
  theWheel.ctx.stroke();
  theWheel.ctx.fill();
}

// 指定停止位置
 function calculatePrize(prizeNumber)
{
  // prizeNumber: 指定停在哪個獎項 0 ~ 7

  // 360 / 8 = 45，所以 1~44 為 獎項01 的範圍，依此類推
  let stopAt = ((45 * prizeNumber + 1) + Math.floor((Math.random() * 43)))

  console.log(`stopAt: ${stopAt} ${ 45 * prizeNumber + 1 } ~ ${ 45 * prizeNumber + 44 }`)

  // Important thing is to set the stopAngle of the animation before stating the spin.
  theWheel.animation.stopAngle = stopAt;

  // May as well start the spin from here.
  // theWheel.startAnimation();
}

// Called when the animation as finished.
function alertPrize()
{
  let indicatedSegment =  winwheelToDrawDuringAnimation.getIndicatedSegment()

  console.log(indicatedSegment.text)
}


function startSpin() {

  if (wheelSpinning == false) {
    theWheel.startAnimation();
    wheelSpinning = true;
  }

  // Ensure that spinning can't be clicked again while already running.
  // if (wheelSpinning == false) {
    // Based on the power level selected adjust the number of spins for the wheel, the more times is has
    // to rotate with the duration of the animation the quicker the wheel spins.
    // if (wheelPower == 1) {
    //   theWheel.animation.spins = 3;
    // } else if (wheelPower == 2) {
    //   theWheel.animation.spins = 8;
    // } else if (wheelPower == 3) {
    //   theWheel.animation.spins = 15;
    // }

    // Disable the spin button so can't click again while wheel is spinning.
    // document.getElementById('spin_button').src       = "spin_off.png";
    // document.getElementById('spin_button').className = "";

    // Begin the spin animation by calling startAnimation on the wheel object.
    // theWheel.startAnimation();

    // Set to true so that power can't be changed and spin button re-enabled during
    // the current animation. The user will have to reset before spinning again.
    // wheelSpinning = true;
  // }
}

function resetWheel()
{
  theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
  theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
  theWheel.draw();                // Call draw to render changes to the wheel.

  drawArrow();

  // document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
  // document.getElementById('pw2').className = "";
  // document.getElementById('pw3').className = "";

  wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
}


window.addEventListener("load", drawArrow);
window.addEventListener("resize", drawArrowResize);