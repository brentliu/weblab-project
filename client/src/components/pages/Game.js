import React, { Component } from "react";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";
import { post } from "../../utilities";

class Game extends Component {
    constructor(props) {
        super(props);
        console.log("logging game props");
        console.log(props);
        this.state = {
            data: "none",
            x: 50,
            y: 50,
            infected: false,
        };
    }

    componentDidMount() {
        document.title = "Game";

        get("/api/blobs").then((blobs) => {
            let data = ""
            for (let i = 0; i < blobs.length; i++) {
                let blob = blobs[i];
                data += blob.player_id + " " + blob.x + " " + blob.y + " " + blob.infected + "  |  ";
            }
            this.setState({data: data});
        })

        socket.on("blob", (data) => {
            alert("socket!");
        })
    }


    render() {
        let curData = this.props.userId + " " + this.state.x + " " + this.state.y + " " + this.state.infected;
        let userId = ""
        if (this.props.userId) {
            userId = this.props.userId.toString();
        }
        let blob = {
            player_id: userId,
            x: this.state.x,
            y: this.state.y,
            infected: this.state.infected,
        }
        
        let myFunc = () => {
            this.setState((state) => {
                return {x: state.x + 1};
            });
            post("/api/blob", blob);
        }

        return (
            <div>
                <p>{curData}</p>
                <button onClick = {myFunc}>Button</button>
                <p>{this.state.data}</p>
            </div>
        )
    }
}

export default Game;