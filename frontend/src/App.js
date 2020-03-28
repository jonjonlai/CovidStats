import React from 'react';
import './App.css';
import { Line } from "react-chartjs-2"
const axios = require('axios');




class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    axios.get(`http://localhost:9000/stats/country?string=${e.target.value}`)
      .then(res => this.setState({data: res.data.stat_by_country}));
  }

  update(field) {
    console.log("hello")
    return e => this.setState({ [field]: e.target.value })
  }

  componentWillMount() {
    axios.get(`http://localhost:9000/stats/world`)
      .then(res => this.setState({ world: res.data }));

    axios.get(`http://localhost:9000/stats/affected`)
      .then(res => this.setState({ affected: res.data }));
  }
  




  newCases() {
    let compiler = {}

    this.state.data.forEach((dataPoint) => {
      let date = dataPoint.record_date.split(" ")[0]
      if (!compiler[date]) {
        compiler[date] = [];
      }
      compiler[date].push(dataPoint)
    })


    let newCases = [];
    Object.keys(compiler).forEach((date) => {
      let last = compiler[date].length - 1
      newCases.push(parseFloat((compiler[date][last].new_cases).replace(/,/g, '')))
    })




    const state = {
      labels: Object.keys(compiler),
      datasets: [
        {
          label: 'New Cases',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: newCases
        }
      ]
    }


    return (
      
        <Line
          data={state}
          options={{
            title: {
              display: true,
              text: 'New Cases per day',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      
    )
  }


  totalCases() {
    let compiler = {}

    this.state.data.forEach((dataPoint) => {
      let date = dataPoint.record_date.split(" ")[0]
      if (!compiler[date]) {
        compiler[date] = [];
      }
      compiler[date].push(dataPoint)
    })


    let totalCases = [];
    Object.keys(compiler).forEach((date) => {
      let last = compiler[date].length - 1
      totalCases.push(parseFloat((compiler[date][last].total_cases).replace(/,/g, '')))
    })




    const state = {
      labels: Object.keys(compiler),
      datasets: [
        {
          label: 'Total Cases',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: totalCases
        }
      ]
    }


    return (
      
        <Line

          data={state}
          options={{
            title: {
              display: true,
              text: 'Total Cases per day',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'right'
            }
          }}
        />
      
     
    )
  }

  renderData() {
    if (this.state.data && this.state.data.length > 0 ) {
      return (
        <div id="country-graphs">
        <div id="line-graph">
            {this.newCases()}

        </div>
        <div id="line-graph">
          {this.totalCases()}

        </div>
        </div>
      )

    } else if (this.state.data && this.state.data.length == 0) {
      return (
        <div>Country Not Found</div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  render() {
    console.log(this.state)
    let affected;
    if (this.state.affected) {
      affected = this.state.affected.affected_countries.sort()
    }
    let date = new Date();

    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let month = months[date.getMonth()];
    let day = date.getDate()
    let year = date.getFullYear()
    let currentTimeFormmated = `${month} ${day}, ${year}`
    return (
      <div id="main">
      {this.state.country ? <h1> {this.state.country} Covid Statistics as of {currentTimeFormmated}</h1> : <h1>Covid Statistics as of {currentTimeFormmated}</h1>}
          {this.state.world ? <div id="world">
            <label>Total Cases: {this.state.world.total_cases} cases</label>
            <label>Total Deaths: {this.state.world.total_deaths} deaths</label>
            <label>Worldwide Mortality Rate: {(parseFloat((this.state.world.total_deaths).replace(/,/g, '')) / parseFloat((this.state.world.total_cases).replace(/,/g, '')) * 100).toFixed(2)} %</label>
          </div> : <div></div>}

        {this.state.affected ? <select onChange={this.handleChange}>
          <option >-- Select Country --</option>
          {affected.map((country) => {
            return (
              <option value={country} >{country}</option>
            )
          })}
        </select> : <div>na</div>}

      {this.renderData()}

      </div>
  );
    }
}

export default App;
