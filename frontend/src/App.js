import React from 'react';
import './App.css';
import { Bar } from "react-chartjs-2"
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

  renderData() {
    if (this.state.data && this.state.data.length > 0 ) {
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

      console.log(newCases)



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
        <Bar
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
    } else if (this.state.data && this.state.data.length == 0) {
      return (
        <div>Country Not Found</div>
      )
    } else {
      return (
        <div>Search Above</div>
      )
    }
  }

  render() {
    return (
      <>
      <h1>Covid Statistics</h1>
      <input id="country-search" type="text" placeholder="Search By Country" onChange={this.update("country")} ></input>
      <button onClick={this.handleSubmit}>Search</button>

      {this.renderData()}

      </>
  );
    }
}

export default App;
