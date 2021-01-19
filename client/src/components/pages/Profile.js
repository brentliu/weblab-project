import React, { Component } from "react";
import CatHappiness from "../modules/CatHappiness.js";
import Blob from "../modules/Blob.js"
import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catHappiness: 0,
    };

  }

  incrementCatHappiness = () => {
    this.setState({
      catHappiness: this.state.catHappiness + 1,
    });
  };

  render() {
    return (
      <div>
        <Blob></Blob>
      </div>
    );
  }
}

export default Profile;
