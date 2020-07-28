import React from 'react';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Router from "./controllers/router/router";
import {connect} from "react-redux";

function App(props) {
  return (
      <Router auth={props.auth.user}/>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
