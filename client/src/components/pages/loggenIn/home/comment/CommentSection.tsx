import React from "react";

import AddForm from "./CommentAddForm";
import Comments from "./Comments";

type OwnProps = {
  postId: string;
  commentCount: number;
};

const CommentSection: React.FC<OwnProps> = ({ postId, commentCount }) => {
  const [commentsToShow, setCommnetsToShow] = React.useState<number>(2);
  const commentsPerAdd: number = 5;
  const canShowMoreComments: boolean = commentsToShow < commentCount;
  return (
    <React.Fragment>
      {canShowMoreComments && (
        <span
          className="comments-clickable"
          onClick={() => setCommnetsToShow(commentsToShow + commentsPerAdd)}
        >
          Show more comments
        </span>
      )}
      <Comments postId={postId} commentstoShow={commentsToShow} />
      <AddForm postId={postId} />
    </React.Fragment>
  );
};

export default CommentSection;
