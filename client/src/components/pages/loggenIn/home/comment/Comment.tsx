import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Comment } from "semantic-ui-react";

import { getImage } from "../../../../other/Avatar";
import { RootState } from "MyTypes";
import { Comment as CommentType } from "../../../../../store/comment/models";

type OwnProps = {
  id: string;
};

type StateProps = {
  comment: CommentType;
};

type Props = OwnProps & StateProps;

const CommentElement: React.FC<Props> = ({ comment }) => {
  const { owner, content, date, authorName, authorGender } = comment;
  return (
    <Comment>
      <Comment.Avatar src={getImage(authorGender)} />
      <Comment.Content>
        <Comment.Author as={Link} to={`/profile/${owner}`}>
          {authorName}
        </Comment.Author>
        <Comment.Metadata>
          <div>{date}</div>
        </Comment.Metadata>
        <Comment.Text>{content}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  return {
    comment: state.comment.byId[ownProps.id]
  };
};

export default connect(mapStateToProps)(CommentElement);
