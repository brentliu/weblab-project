import React, { Component } from "react";
import Card from "../modules/Card.js";
import { NewStory } from "../modules/NewPostInput.js";

import { get } from "../../utilities";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    };
  }

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "News Feed";
    get("/api/stories").then((storyObjs) => {
      let reversedStoryObjs = storyObjs.reverse();
      reversedStoryObjs.map((storyObj) => {
        this.setState({ stories: this.state.stories.concat([storyObj]) });
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewStory = (storyObj) => {
    this.setState({
      stories: [storyObj].concat(this.state.stories),
    });
  };

  render() {
    let storiesList = null;
    const hasStories = this.state.stories.length !== 0;
    if (hasStories) {
      storiesList = this.state.stories.map((storyObj) => (
        <Card
          key={`Card_${storyObj._id}`}
          _id={storyObj._id}
          creator_name={storyObj.creator_name}
          creator_id={storyObj.creator_id}
          content={storyObj.content}
          userId={this.props.userId}
        />
      ));
    } else {
      storiesList = <div>No stories!</div>;
    }
    return (
      <>
        <h1>Brent's Weblab Project</h1>
        <h3>Brent made a project for WebLab. It does not work.</h3>
        <a href="https://piazza.com/class/kic6jaqsarc70r?cid=835">https://piazza.com/class/kic6jaqsarc70r?cid=835</a>
        <h3>Play a game of infection tag. Red is infected, green is not. If an infected and healthy player get close, the healthy player is infected. wasd for controls</h3>
        <h3>Login, then go to Game in the nav bar to see what i have so far. You can only move six steps until the api begins to fail, after that your player is a ghost and is not actually connected to the database.</h3>
        <h3>Hitting ctrl+s esc seems to reconnect you to the database. I'm not really sure why. You have to keep doing it tho</h3>
        <h3>Since nothing works, here are some jokes</h3>
        <hr/>
        <h4>Did you hear about the mathematician who's afraid of negative numbers?</h4>
        <h6>He'll stop at nothing to avoid them.</h6>
        <h4>Why do we tell actors to break a leg?</h4>
        <h6>Because every play needs a cast.</h6>
        <h4>What do you call it when computer science majors make fun of each other?</h4>
        <h6>Cyber boolean</h6>
      </>
    );
  }
}

export default Feed;
