/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import React from 'react';
import Context from '../../Context';
import ResultPopUp from '../ResultPopUp/ResultPopUp';
import './Wheel.css';

class Wheel extends React.Component {
  static contextType = Context;

  state = {
    radius: 75, // pixels
    rotate: 0, // DEGREES
    easeOut: 0, // SECONDS
    angle: 0, // RADIANS
    top: null, // INDEX
    offset: null, // RADIANS
    net: null, // RADIANS
    result: null, // INDEX
    spinning: false,
    seen: false,
    winner: '',
  };

  componentDidMount() {
    // genereate canvas wheel on load
    // this.setState({ wheelOptions: this.context.wheelOptions })
    this.renderWheel();
  }

  topPosition = (num, angle) => {
    // set starting index and angle offset based on wheelOptions length
    // works up to 9 options

    let topSpot = null;
    let degreesOff = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    this.setState({
      top: topSpot - 1,
      offset: degreesOff,
    });
  }

  getColor = () => {
    // randomly generate rbg values for wheel options
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.5)`;
  }

  togglePop = () => {
    const { seen } = this.state;
    this.setState({
      seen: !seen,
    });
  };

  spin = () => {
    // set random spin degree and ease out time
    // set state variables to initiate animation

    const randomSpin = Math.floor(Math.random() * 1201) + 750;
    this.setState({
      rotate: randomSpin,
      easeOut: 2,
      spinning: true,
    });
    // calculate result after wheel stops spinning
    setTimeout(() => {
      this.getResult(randomSpin);
    }, 2000);
  }

  getResult = (spin) => {
    // find net rotation and add to offset angle
    // repeat substraction of inner angle amount from total distance traversed
    // use count as an index to find value of result from state wheelOptions
    const { angle, top, offset } = this.state;
    const { wheelOptions } = this.context;
    const netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
    let travel = netRotation + offset;
    let count = top + 1;
    while (travel > 0) {
      travel -= angle;
      count--;
    }
    let result;
    if (count >= 0) {
      result = count;
    } else {
      result = wheelOptions.length + count;
    }

    // set state variable to display result
    this.setState({
      net: netRotation,
      result,
      seen: true,
      winner: wheelOptions[result],
    });
  }

  reset = () => {
    // reset wheel and result
    this.setState({
      // rotate: 0,
      // easeOut: 0,
      result: null,
      spinning: false,
      seen: false,
    });
  }

  renderSector(index, start, arc, color) {
    // create canvas arc for each wheelOptions element
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const { radius } = this.state;
    const startAngle = start;
    const endAngle = start + arc;
    const angle = index * arc;
    const baseSize = 150;
    const textRadius = baseSize - 25;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;

    ctx.font = '17px Arial';
    ctx.fillStyle = 'black';
    ctx.stroke();
    ctx.shadowBlur = 5;
    ctx.shadowColor = '#121212';
    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2) * textRadius, baseSize + Math.sin(angle - arc / 2) * textRadius,
    );
    ctx.rotate(angle - arc / 2 + Math.PI / 1);

    ctx.restore();
  }

  renderWheel() {
    // determine number and size of sectors that need to be created
    const { wheelOptions } = this.context;
    const numOptions = wheelOptions.length;
    const arcSize = (2 * Math.PI) / numOptions;

    this.setState({
      angle: arcSize,
    });

    // get index of starting position of selector
    this.topPosition(numOptions, arcSize);

    // dynamically genereate sectors from state wheelOptions
    let angle = 0;

    for (let i = 0; i < numOptions; i++) {
      this.renderSector(i + 1, angle, arcSize, this.getColor());
      angle += arcSize;
    }
  }

  render() {
    const {
      rotate,
      easeOut,
      spinning,
      seen,
      winner } = this.state;
    return (
      <div className="wheel-container">
        <span id="selector">&#9660;</span>
        <canvas
          id="wheel"
          // set width and height with % or move to style
          width="300px"
          height="300px"
          style={{
            WebkitTransform: `rotate(${rotate}deg)`,
            WebkitTransition: `-webkit-transform ${
              easeOut
            }s ease-out`,
          }}
        />

        {spinning ? (
          <button type="button" id="reset" onClick={this.reset}>
            reset
          </button>
        ) : (
          <button type="button" id="spin" onClick={this.spin}>
            spin
          </button>
        )}
        {seen ? <ResultPopUp toggle={this.togglePop} resultId={winner.id} resultTitle={winner.title} /> : null }
      </div>
    );
  }
}

export default Wheel;
