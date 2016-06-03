const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');


class HarvestHelper extends React.Component {
  constructor() {
    super();
  }


  componentDidMount() {
    // make api call to get back all plants
    this.serverRequest = $.getJSON(`http://harvesthelper.herokuapp.com/api/v1/plants?api_key=${''}`, result => {
      this.setState({
        plants: result,
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const firstPlant = this.state.plants[0]
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{firstPlant.description}</h2>
      </div>
    );
  }
}

ReactDOM.render(<HarvestHelper title="harvest helper"/>, document.querySelector('.application'));
