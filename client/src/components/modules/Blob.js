import React, { Component } from "react";
import "./Blob.css";

class Blob extends Component {

    constructor(props) {
        super(props);
        this.state = {
            x: 50.0,
            y: 50.0,
        }

        window.addEventListener('keydown', (event) => {
            lastKey = event.key;
            if (lastKey == "w") {
                this.setState((state) => {
                    return {y: state.y > 11 ? state.y - 1 : 10}
                });
            }
            else if (lastKey == "a") {
                this.setState((state) => {
                    return {x: state.x > 11 ? state.x - 1 : 10}
                });
            }
            else if (lastKey == "s") {
                this.setState((state) => {
                    return {y: state.y < 89 ? state.y + 1 : 90}
                });
            }
            else if (lastKey == "d") {
                this.setState((state) => {
                    return {x: state.x < 89 ? state.x + 1 : 90}
                });
            }
        })
    }

    render() {
        let left = this.state.x + "%";
        let top = this.state.y + "%";
        return (
            <div style={{left:left, top:top, position:"absolute"}}>I am a blob.</div>
        );
    }
}

export default Blob;