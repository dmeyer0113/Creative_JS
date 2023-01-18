//This sketch creates a circular pattern that changes each time page refreshes (run application for example)

const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ],
  //experiment with animation - want to have slow transition between frames, currently WAY too fast
  //animate: true
};


////created for demonstration, now using imported library from canvas-sketch-util
// const degToRad = (degrees) => {
//   return degrees / 180 * Math.PI;
// };
// const randomRange = (min, max) => {
//   return Math.random() * (max - min) + min;
// }

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;
    let x, y;

    const num = 21;
    const radius = width * 0.25;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(1,3), random.range(0.5, 1.5));

      context.beginPath();
      context.fillRect(-w*0.5, random.range(0, -h * 0.5), w, h);
      context.fill();
      context.restore();

      context.save();
      //translate to center of circle
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 15);
      context.beginPath();
      context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -5), slice * random.range(1, 5));
      context.stroke();
      context.restore();
    }

  };
};

canvasSketch(sketch, settings);
