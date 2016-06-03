const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const harvesthelperKey = 'fd4145533949c711dab5d31e1d10187d'


class HarvestHelper extends React.Component {
  constructor() {
    super();
  }


  componentDidMount() {
    // make api call to get back all plants
    this.serverRequest = $.getJSON(`http://harvesthelper.herokuapp.com/api/v1/plants?api_key=${harvesthelperKey}`, result => {
      this.setState({
        plants: result,
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    if (this.state) {
      const firstPlant = this.state.plants[0]
      return (
        <div>
          <h1>{this.props.title}</h1>
          <h2>{firstPlant.description}</h2>
        </div>
      );
    } else {
      return <h1>{this.props.title}</h1>
    }
  }
}

ReactDOM.render(<HarvestHelper title="harvest helper"/>, document.querySelector('.application'));
