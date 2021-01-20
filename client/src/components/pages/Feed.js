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
        <h3>Play a game of infection tag. Red is infected, green is not. If an infected and healthy player get close, the healthy player is infected. wasd or arrow keys for controls</h3>
        <h3>Login, then go to Game in the nav bar.</h3>
      </>
    );
  }
}

export default Feed;
