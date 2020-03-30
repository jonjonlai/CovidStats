import React from "react"
const axios = require('axios');



class USA extends React.Component {

    componentWillMount() {
        axios.get(`/stats/USA`)
            .then(res => this.setState({ USA: res.data }));

    }

    render() {
        console.log(this.state)
        return (
            <div></div>
        )
    }
}

export default USA;