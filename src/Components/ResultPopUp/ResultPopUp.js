import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';
import './ResultPopUp.css';

class ResultPopUp extends React.Component {
  static defaultProps = {
    resultId: 1,
    resultTitle: 'default title',
  }

  static contextType = Context;

  componentDidMount() {
    const { inOrOut, findRecipe } = this.context;
    const { resultId } = this.props;
    if (inOrOut === 'recipes') {
      findRecipe(resultId);
    }
  }

  handleClick = () => {
    const { toggle } = this.props;
    toggle();
  }

  render() {
    const { inOrOut } = this.context;
    const { resultId, resultTitle } = this.props;
    return (
      <div className="display">
        <div id="readout">
          Try This:
          {'  '}
          <span id="result">{resultTitle}</span>
        </div>
        <div className="details">
          {inOrOut === 'recipes'
            ? <Link to={`/recipes/${resultId}`}><button type="button" className="result-button">See more details</button></Link>
            : <Link to={`/restaurants/${resultId}`}><button type="button" className="result-button">See more details</button></Link>}
          <button type="button" className="result-button" onClick={this.handleClick}>I want something different</button>
        </div>
      </div>
    );
  }
}

export default ResultPopUp;
