import React from 'react';

class Voting extends React.Component {
  render() {
    return <div className="voting">
      {this.props.pair.map(entry =>
        <button key={entry}>
          <h1>{entry}</h1>
        </button>
      )}
    </div>;
  }
};

export default Voting;