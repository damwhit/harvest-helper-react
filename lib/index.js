const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const harvesthelperKey = 'fd4145533949c711dab5d31e1d10187d'

require('./reset.css')
require('./styles.scss')

class HarvestHelper extends React.Component {
  constructor() {
    super();
    this.renderPlant = this.renderPlant.bind(this);
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

  renderPlant(key) {
    console.log(this)
    return <Plant key={key} index={key} details={this.state.plants[key]} />;
  }

  render() {
    if (this.state) {
      return (
        <div>
          <h1>{this.props.title}</h1>
          <article>
            {Object.keys(this.state.plants).map(this.renderPlant)}
          </article>
        </div>
      );
    } else {
      return <h1>{this.props.title}</h1>
    }
  }
}

class Plant extends React.Component {
  render() {
    const details = this.props.details;
    return (
      <div className="plant-index">
        <a href="http://www.w3schools.com">{details.name}</a>
        <p>{details.description}</p>
      </div>
    )
  }
}

ReactDOM.render(<HarvestHelper title="harvest helper"/>, document.querySelector('.application'));
