import React, { Component } from "react";

class Blob extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const myStyle = {
            position: "absolute",
            left: this.props.x + "%",
            top: this.props.y + "%",
            height: "25px",
            width: "25px",
            background: this.props.infected ? "red" : "green",
        }
        return(
            <span style={myStyle}></span>
        );
    }
}

export default Blob;