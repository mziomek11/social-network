import React from "react";

import AddForm from "./CommentAddForm";
import Comments from "./Comments";

type OwnProps = {
  id: string;
  commentCount: number;
};

const CommentSection: React.FC<OwnProps> = ({ id, commentCount }) => {
  const [commentsToShow, setCommnetsToShow] = React.useState<number>(2);
  const commentsPerAdd: number = 5;
  const canShowMoreComments: boolean = commentsToShow < commentCount;
  return (
    <React.Fragment>
      {canShowMoreComments && (
        <span
          className="commets-show-more"
          onClick={() => setCommnetsToShow(commentsToShow + commentsPerAdd)}
        >
          Show more comments
        </span>
      )}
      <Comments id={id} toShow={commentsToShow} />
      <AddForm id={id} />
    </React.Fragment>
  );
};

export default CommentSection;
