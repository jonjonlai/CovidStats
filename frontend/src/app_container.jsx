import { connect } from 'react-redux';
import App from "./App"
import React from 'react';



const mapStatetoProps = state => ({
    country: "USA"
})


export default connect(mapStatetoProps, null)(App)