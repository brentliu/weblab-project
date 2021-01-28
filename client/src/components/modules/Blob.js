import React, { Component } from "react";

class Blob extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const spanStyle = {
            position: "absolute",
            left: this.props.x + "%",
            top: this.props.y + "%",
            height: "25px",
            width: "25px",
            background: this.props.infected ? "red" : "green",
        }
        const pStyle = {
            position: "absolute",
            left: this.props.x - 2 + "%",
            top: this.props.y - 2 + "%",
            zIndex: 1,
        }
        return(
            <div>
                <p style={pStyle}>{this.props.name}</p>
                <span style={spanStyle}></span>
            </div>
        );
    }
}

export default Blob;