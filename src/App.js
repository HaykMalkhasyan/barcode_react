import React from 'react';
import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Router from "./controllers/router/router";
import {connect} from "react-redux";
import cookie from "./services/cookies";

function App(props) {
  return (
      <Router auth={cookie.get('user') || null}/>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
