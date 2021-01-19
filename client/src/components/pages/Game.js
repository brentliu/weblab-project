import React, { Component } from "react";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";
import { post } from "../../utilities";
import Blob from "../modules/Blob.js"



class Game extends Component {
    constructor(props) {
        console.log("constructing game");
        super(props);
        this.state = {
            blobs: [],
            x: 50,
            y: 50,
            infected: Math.random() < 0.5,
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        if (event.key === "w" || event.key === "a" || event.key === "s" || event.key === "d") {
            this.setState((state) => {
                switch (event.key) {
                    case "w": return ({y: state.y - 1})
                    case "a": return ({x: state.x - 1})
                    case "s": return ({y: state.y + 1})
                    case "d": return ({x: state.x + 1})
                }
            }, () => {
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

                for (let i = 0; i < this.state.blobs.length; i++) {
                    let otherBlob = this.state.blobs[i];
                    if ((otherBlob.infected ^ blob.infected) && ((blob.x - otherBlob.x) ** 2 + (blob.y - otherBlob.y) ** 2 < 5)){
                        if (!otherBlob.infected) {
                            otherBlob.infected = true;
                            post("/api/blob", otherBlob);
                        }
                        blob.infected = true;
                    }
                }

                console.log("calling api blob");
                post("/api/blob", blob);
            })
        }
    }

    componentDidMount() {
        document.title = "Game";

        get("/api/blobs").then((blobs) => {
            this.setState({blobs: blobs});
            /*for (let i = 0; i < blobs.length; i++) {
                const blob = blobs[i];
                if (blob.player_id === this.props.userId) {
                    this.setState({
                        x: blob.x,
                        y: blob.y,
                        infected: blob.infected,
                    })
                }
            }*/
        })

        socket.on("blob", (data) => {
            console.log(data);
            console.log(this.state.blobs);
            let blobs = this.state.blobs
            for (let i = 0; i < blobs.length; i++) {
                let blob = this.state.blobs[i];
                if (blob.player_id === data.player_id)
                    this.state.blobs[i] = data;
                this.setState(() => {
                    return({blobs: this.state.blobs})
                })
            }
        })

        window.addEventListener('keydown', this.handleKeyDown)
    }

    BlobDisplay = ({blobs}) => (
        <div>
            {blobs.map(blob => (
                <Blob key={blob.player_id} x={blob.x} y={blob.y} infected={blob.infected}></Blob>
            ))}
        </div>
    )

    render() {
        return (
            <div>
                <this.BlobDisplay blobs={this.state.blobs} />
                <Blob x={this.state.x} y={this.state.y} infected={this.state.infected}></Blob>
            </div>
        )
    }

    componentWillUnmount() {
        console.log("enter componentWillUnmount");
        window.removeEventListener('keydown', this.handleKeyDown);
    }
}

export default Game;