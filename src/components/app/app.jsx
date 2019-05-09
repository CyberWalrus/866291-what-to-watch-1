import React from "react";
import MainScreen from "../main-screen/main-screen.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`, `We need to talk about Kevin`]
    };
  }
  render() {
    return <MainScreen films={this.state.films}/>;
  }
}
