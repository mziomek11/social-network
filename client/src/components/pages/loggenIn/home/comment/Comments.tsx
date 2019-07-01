import React from "react";
import { connect } from "react-redux";
import { Comment } from "semantic-ui-react";

import CommentMain from "./CommentMain";
import { RootState } from "MyTypes";
import {
  CommentsById,
  Comment as CommentType
} from "../../../../../store/comment/models";

type StateProps = {
  allComments: string[];
  commentsById: CommentsById;
};

type OwnProps = {
  id: string;
};

type Props = OwnProps & StateProps;

class Comments extends React.Component<Props, {}> {
  render() {
    const { allComments, commentsById, id } = this.props;
    const postComments: CommentType[] = allComments
      .map(id => commentsById[id])
      .filter(comment => comment.post === id);
    return (
      <Comment.Group>
        {postComments.map(({ _id }) => (
          <CommentMain key={_id} id={_id} postId={id}/>
        ))}
      </Comment.Group>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    commentsById: state.comment.byId,
    allComments: state.comment.allIds
  };
};

export default connect(mapStateToProps)(Comments);
