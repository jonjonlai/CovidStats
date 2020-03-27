import React from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let data = [];
    axios.get(`http://localhost:9000/stats/seasons?string=${this.state.country}`)
      .then(res => this.setState({data: res.data.stat_by_country}));
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value })
  }
  
  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    if (this.state.date) {
      console.log(this.state.data)
    }
    return (
      <>
      <h1>Covid Statistics</h1>
      <input id="country-search" type="text" placeholder="Search By Country" onChange={this.update("country")} ></input>
      <button onClick={this.handleSubmit}>Search</button>

      {this.state.data ? <div>WE have Data</div> : <div>Search Above</div>}

      </>
  );
    }
}

export default App;
