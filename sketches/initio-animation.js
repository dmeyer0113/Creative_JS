const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [720, 720],
  animate: true,
};
//THIS FILE IS USED TO CREATE THE INITIO ANIMATION
//RATHER THAN PROGRAMMING THE ANIMATION IN THE INITIO CODEBASE, I DECIDED TO CREATE A SEPARATE JS FILE TO CREATE THE ANIMATION & EXPORT AS MP4

/* INTENDED FUNCTION OF THIS SKETCH:
    -CREATE AGENT IN CENTER OF SCREEN
    -CREATE ADDITIONAL AGENTS AROUND THE CENTER AGENT
    -CONTINUE ADDING AGENTS AT INCREASING DISTANCE FROM CENTER AGENT
    -DRAW LINES EXTENDING FROM CENTER AGENT TO OUTER AGENTS
    -GOAL IS A 'BRANCHING' ANIMATION THAT GROWS OUTWARD
    
    TODO: ADD DELAY FOR DRAWING OUTER AGENTS -> IE FIRST AGENT 1 SEC, 2ND ITERATION 2 SEC, 3RD AT 3 SEC, ETC
      -CURRENT PROBLEM: TIMEOUT IS NOT WORKING CORRECTLY, DUE TO SETTIMEOUT BEING ASYNC
      -TRIED CHANGING THE TIMEOUT SO THAT EACH ITERATION RUNS SEPARATE BY MULTIPLYING INDEX BY TIMEOUT, BUT NOT SUCCESSFUL YET
      -SEE COMMENTED CODE SECTION NEAR BOTTOM AT THE AGENTS.FOREACH() LOOPS FOR MORE INFO (~LINE 172)
      */
      
//Establishes the sketch
const sketch = ({ context, width, height }) => {
  //Establishes the center agent
  const centerAgents = [];
  //I know this isn't the cleanest way to do this
  //all below arrays store the 'outer' agents that will be drawn
  const agents = [];
  const moreAgents = [];
  const moreAgents2 = [];
  const moreAgents3 = [];
  const moreAgents4 = [];
  //positioning for center agent
  const centerX = width / 2;
  const centerY = height / 2;
  const centerAgent = new CenterAgent(centerX, centerY);
  centerAgents.push(centerAgent);

  //START - loop through arrays establish position for outer agents
  for (let i = 0; i < 25; i++) {
    let x = random.range(centerX - 5, centerX + 5);
    let y = random.range(centerY - 5, centerY + 5);
    agents.push(new Agent(x, y));
  }

  for (let i = 0; i < 10; i++) {
    let x = random.range(centerX - 10, centerX + 10);
    let y = random.range(centerY - 10, centerY + 10);
    moreAgents.push(new Agent(x, y));
  }

  for (let i = 0; i < 10; i++) {
    let x = random.range(centerX - 15, centerX + 15);
    let y = random.range(centerY - 15, centerY + 15);
    moreAgents2.push(new Agent(x, y));
  }

  for (let i = 0; i < 10; i++) {
    let x = random.range(centerX - 20, centerX + 20);
    let y = random.range(centerY - 20, centerY + 20);
    moreAgents3.push(new Agent(x, y));
  }

  for (let i = 0; i < 10; i++) {
    let x = random.range(centerX - 25, centerX + 25);
    let y = random.range(centerY - 25, centerY + 25);
    moreAgents4.push(new Agent(x, y));
  }
  //END - loop through arrays establish position for outer agents

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    //START - lines between agents
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
      for (let j = i + 1; j < agents.length; j++) {
        const other = centerAgent;
        const dist = agent.pos.getDistance(other.pos);
        //draws line between agents if dist conditional met
        if (dist > 65) {
          context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
          context.beginPath();
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          context.stroke();
        }
      }
    }
    //lines between moreAgents
    for (let i = 0; i < moreAgents.length; i++) {
        const agent = moreAgents[i];
        //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
        for (let j = i + 1; j < moreAgents.length; j++) {
          const other = agents[i]; //make sure there are less moreAgents than agents
          const dist = agent.pos.getDistance(other.pos);
          //draws line between agents if dist conditional met
          if (dist > 65) {
            context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
            context.beginPath();
            context.moveTo(agent.pos.x, agent.pos.y);
            context.lineTo(other.pos.x, other.pos.y);
            context.stroke();
          }
        }
      }

      for (let i = 0; i < moreAgents2.length; i++) {
        const agent = moreAgents2[i];
        //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
        for (let j = i + 1; j < moreAgents2.length; j++) {
          const other = moreAgents[i]; //make sure there are less moreAgents than agents
          const dist = agent.pos.getDistance(other.pos);
          //draws line between agents if dist conditional met
          if (dist > 65) {
            context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
            context.beginPath();
            context.moveTo(agent.pos.x, agent.pos.y);
            context.lineTo(other.pos.x, other.pos.y);
            context.stroke();
          }
        }
      }

      for (let i = 0; i < moreAgents3.length; i++) {
        const agent = moreAgents3[i];
        //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
        for (let j = i + 1; j < moreAgents3.length; j++) {
          const other = moreAgents2[i]; //make sure there are less moreAgents than agents
          const dist = agent.pos.getDistance(other.pos);
          //draws line between agents if dist conditional met
          if (dist > 65) {
            context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
            context.beginPath();
            context.moveTo(agent.pos.x, agent.pos.y);
            context.lineTo(other.pos.x, other.pos.y);
            context.stroke();
          }
        }
      }

      for (let i = 0; i < moreAgents4.length; i++) {
        const agent = moreAgents4[i];
        //j = i+1 instead of j = 0 reduces unneeded iterations through second loop
        for (let j = i + 1; j < moreAgents4.length; j++) {
          const other = moreAgents3[i]; //make sure there are less moreAgents than agents
          const dist = agent.pos.getDistance(other.pos);
          //draws line between agents if dist conditional met
          if (dist > 65) {
            context.lineWidth = math.mapRange(dist, 0, 225, 0.1, 0.1, 5);
            context.beginPath();
            context.moveTo(agent.pos.x, agent.pos.y);
            context.lineTo(other.pos.x, other.pos.y);
            context.stroke();
          }
        }
      }
    //END - lines between agents


    //draw center agent
    centerAgents.forEach((CenterAgent) => {
      CenterAgent.draw(context);
      CenterAgent.update();
    });

    // //draws each agent in agents array with a delay (in theory..)
    // agents.forEach(function (agent, i) {
    //   setTimeout(function () {
    //     agent.draw(context);
    //     agent.update();
    //     agent.bounce(width, height);
    //   }, 500 * (i + 1));
    // });

    //START - drawing each agent in the arrays 
    agents.forEach((agent) => {
      agent.draw(context);
      agent.update();
      agent.bounce(width, height);
    });
    
    moreAgents.forEach((agent) => {
        agent.draw(context);
        agent.update();
        agent.bounce(width, height);
      });

      moreAgents2.forEach((agent) => {
        agent.draw(context);
        agent.update();
        agent.bounce(width, height);
      });

      moreAgents3.forEach((agent) => {
        agent.draw(context);
        agent.update();
        agent.bounce(width, height);
      });

      moreAgents4.forEach((agent) => {
        agent.draw(context);
        agent.update();
        agent.bounce(width, height);
      });
    //END - drawing each agent in the arrays
  };
};

canvasSketch(sketch, settings);

//classes

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-0.8, 0.8), random.range(-0.8, 0.8));
    this.radius = random.range(2, 3);
  }

  bounce(width, height) {
    if (this.pos.x <= 10 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 10 || this.pos.y >= height) this.vel.y *= -1;
  }

  //wrap is alternate to bounce - personal preference for bounce
  //to switch, change bounce() call in agents forEach() loop to wrap()
  wrap(width, height) {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y > height) this.pos.y = 0;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 1.5;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2); //makes the circles
    context.fill();
    context.stroke();
    context.restore();
  }
}

class CenterAgent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.radius = random.range(4, 5);
  }

  bounce(width, height) {
    if (this.pos.x <= 10 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 10 || this.pos.y >= height) this.vel.y *= -1;
  }

  //wrap is alternate to bounce - personal preference for bounce
  //to switch, change bounce() call in agents forEach() loop to wrap()
  wrap(width, height) {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y > height) this.pos.y = 0;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 1.5;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2); //makes the circles
    context.fill();
    context.stroke();
    context.restore();
  }
}
