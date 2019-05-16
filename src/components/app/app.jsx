import React from "react";
import PropTypes from "prop-types";
import MainScreen from "../main-screen/main-screen.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <MainScreen films={this.props.films}/>;
  }
}
App.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })),
};
