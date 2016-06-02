const React = require('react');
const ReactDOM = require('react-dom');


class HarvestHelper extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // make api call to get back all plants
  }

  render() {
    return (
      <h1>{this.props.title}</h1>
      // display plant names on page
    );
  }
}

  function fetchPlants() {
    return fetch(`http://harvesthelper.herokuapp.com/api/v1/plants?api_key=${"api key"}`).then(response => response.json().then(json => {
       return json;
    }));
  }
fetchPlants();

ReactDOM.render(<HarvestHelper title="harvest helper"/>, document.querySelector('.application'));
