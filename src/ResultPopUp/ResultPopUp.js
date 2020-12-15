import React from 'react';

class ResultPopUp extends React.Component {

  handleClick = () => {
    this.props.toggle();
  }
  render() {
    return (
     <div className="display">
       <span className="close" onClick={this.handleClick}>
            &times;
          </span>
          <span id="readout">
            YOU WON:{"  "}
            <span id="result">{this.props.wheelOptions[this.props.result]}</span>
          </span>
        </div>
  )
  }
  
}

export default ResultPopUp;