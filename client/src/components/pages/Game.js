import React, { Component } from "react";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "none",
        };
    }

    componentDidMount() {
        document.title = "Game";

        get("/api/blobs").then((blobs) => {
            let data = ""
            for (let i = 0; i < blobs.length; i++) {
                let blob = blobs[i];
                data += blob.player_id + " " + blob.x + " " + blob.y + " " + blob.infected;
            }
            this.setState({data: data});
        })
    }

    render() {
        return (
            <div>
                <p>{this.state.data}</p>
            </div>
        )
    }
}

export default Game;