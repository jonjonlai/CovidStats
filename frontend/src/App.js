import React from 'react';
import USA from "./USA"
import './App.css';
import { Link } from "react-router-dom"
import { Line } from "react-chartjs-2"
const axios = require('axios');




class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    axios.get(`/stats/country?string=${e.target.value}`)
      .then(res => this.setState({data: res.data.stat_by_country}));
  }

  handleClick(e) {
    console.log(this.props.history)
  }

  update(field) {
    console.log("hello")
    return e => this.setState({ [field]: e.target.value })
  }

  componentWillMount() {
    axios.get(`/stats/world`)
      .then(res => this.setState({ world: res.data }));

    axios.get(`/stats/affected`)
      .then(res => this.setState({ affected: res.data }));

    axios.get(`/stats/instructions`)
      .then(res => this.setState({ instructions: res.data }));
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
          backgroundColor: '#28334A',
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
          backgroundColor: '#28334A',
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
    let affected;
    if (this.state.affected) {
      affected = this.state.affected.affected_countries.sort()
    }

    let last;
    if (this.state.data) {
      let lastIndex = this.state.data.length - 1;
      last = this.state.data[lastIndex];
    }

    let date = new Date();

    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let month = months[date.getMonth()];
    let day = date.getDate()
    let year = date.getFullYear()
    let currentTimeFormmated = `${month} ${day}, ${year}`

    console.log(this.state)

    return (
      <div id="main">
      {this.state.country ? <h1> {this.state.country} Covid Statistics as of {currentTimeFormmated}</h1> : <h1>Covid Statistics as of {currentTimeFormmated}</h1>}
          {this.state.world ? <div id="world">
          <div id="total"> Total Cases <br></br> <div id="number">{this.state.world.total_cases}</div></div> 
          <div id="total"> Total Deaths <br></br> <div id="number">{this.state.world.total_deaths}</div></div> 
          <div id="total">Worldwide Mortality Rate <br></br> <div id="number">{(parseFloat((this.state.world.total_deaths).replace(/,/g, '')) / parseFloat((this.state.world.total_cases).replace(/,/g, '')) * 100).toFixed(2)} %</div></div>
          </div> : <div></div>}
      {this.state.affected ? <select onChange={this.handleChange}>
        <option >-- Select Country --</option>
        {affected.map((country) => {
          return (
            <option id="option" value={country} >{country}</option>
          )
        })}
      </select> : <div></div>}

        {/* <Link to="/USA"><label onClick={this.handleClick}>Click Here For USA Data</label></Link> */}

      {this.renderData()}

      {this.state.data ? <div id="current">
          <div id="total"> Active Cases <br></br> <div id="number">{last.active_cases}</div></div>
          <div id="total">Active Case Percentage <br></br> <div id="number">{(parseFloat((last.active_cases).replace(/,/g, '')) / parseFloat((last.total_cases).replace(/,/g, '')) * 100).toFixed(2)} %</div></div>
          <div id="total"> Total Deaths <br></br> <div id="number">{last.total_deaths}</div></div>
          <div id="total">Mortality Rate <br></br> <div id="number">{(parseFloat((last.total_deaths).replace(/,/g, '')) / parseFloat((last.total_cases).replace(/,/g, '')) * 100).toFixed(2)} %</div></div>
          <div id="total"> Total Recovered <br></br> <div id="number">{last.total_recovered}</div></div>
          <div id="total">Recovery Rate <br></br> <div id="number">{(parseFloat((last.total_recovered).replace(/,/g, '')) / parseFloat((last.total_cases).replace(/,/g, '')) * 100).toFixed(2)} %</div></div>
        </div> : <div></div>} 

      </div>
  );
    }
}

export default App;
