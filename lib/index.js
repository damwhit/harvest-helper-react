const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
import { Router, Route, browserHistory } from 'react-router';
import reactMixin from 'react-mixin';

const harvesthelperKey = 'fd4145533949c711dab5d31e1d10187d';

require('./reset.css');
require('./styles.scss');

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
    return <Plant key={key} index={key} details={this.state.plants[key]} />;
  }

  render() {
    if (this.state) {
      return (
        <div>
          <NavBar />
          <article>
            {Object.keys(this.state.plants).map(this.renderPlant)}
          </article>
        </div>
      );
    } else {
      return <h1>{this.props.title}</h1>;
    }
  }
}

class Plant extends React.Component {

  goToPlant(event) {
    event.preventDefault();
    // get the data from the input
    const plantName = this.refs.plantName.text;
    // transition from <Plant/> to <ShowPlant/>
    browserHistory.push('/plant/' + plantName);
  }

  render() {
    const details = this.props.details;
    return (
      <div className="plant-index">
        <a href='#' ref='plantName' onClick={this.goToPlant.bind(this)}>{details.name}</a>
        <p>{details.description}</p>
      </div>
    );
  }
}

class NavBar extends React.Component {
  goHome(event) {
    event.preventDefault();
    browserHistory.push('/');
  }
  render() {
    return (
      <nav className="plant-index">
        <a href='#' ref='plantName' onClick={this.goHome}>Home</a>
      </nav>
    );
  }
}

class ShowPlant extends React.Component {

  componentDidMount() {
    const plantName = this.props.params.plantName;
    // make api call to get back all plants
    this.serverRequest = $.getJSON(`http://harvesthelper.herokuapp.com/api/v1/plants/find?name=${plantName}&api_key=${harvesthelperKey}`, result => {
      this.setState({
        plantDetails: result,
      });
    });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    if (this.state) {
      return (
        <div>
          <NavBar />
          <h1>{this.state.plantDetails.name}</h1>
        </div>
      );
    } else {
      return <h1>{this.props.title}</h1>;
    }
  }
}

/*
Not Found
*/

class NotFound extends React.Component {
  render() {
    return <h1>Not Found!</h1>;
  }
}

/*
Routes
*/

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={HarvestHelper}/>
    <Route path="/plant/:plantName" component={ShowPlant}/>
    <Route path='*' component={NotFound}></Route>
  </Router>
);

ReactDOM.render(routes, document.querySelector('.application'));
