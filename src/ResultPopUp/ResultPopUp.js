import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context';

class ResultPopUp extends React.Component {

  static contextType = Context;

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
            Try This:{"  "}
            <span id="result">{this.props.resultTitle}</span>
          </span>
          <div className='details'>
            {this.context.inOrOut === 'recipes'
              ? <Link to={`/recipes/${this.props.resultId}`}><button>See more details</button></Link>
              : <Link to={`/restaurants/${this.props.resultId}`}><button>See more details</button></Link>}
          </div>
      </div>
  )
  }
  
}

export default ResultPopUp;