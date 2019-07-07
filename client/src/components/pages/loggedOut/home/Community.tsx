import React from "react";
import {Header} from "semantic-ui-react";

import people from "../../../../images/people.png";

const Community = () => {
  return (
    <React.Fragment>
      <Header size="huge" textAlign="center">
        Join our community!
      </Header>
      <img src={people} alt="connected people" className="home__image"/>
    </React.Fragment>
  );
};

export default Community;
