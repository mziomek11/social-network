import React from "react";

import AddForm from "./CommentAddForm";
import Comments from "./Comments";

type OwnProps = {
  id: string;
};

const CommentSection: React.FC<OwnProps> = ({ id }) => {
  return (
    <React.Fragment>
      <Comments id={id}/>
      <AddForm id={id} />
    </React.Fragment>
  );
};

export default CommentSection;
