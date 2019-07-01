import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Comment } from "semantic-ui-react";
import { isNull } from "util";

import CommentMenu from "./CommentMenu";
import CommentUpdate from "./CommentUpdate";
import { getImage } from "../../../../other/Avatar";
import { RootState } from "MyTypes";
import { Comment as CommentType } from "../../../../../store/comment/models";
import { User } from "../../../../../store/auth/models";
import { Post } from "../../../../../store/post/models";

type OwnProps = {
  id: string;
  postId: string;
};

type StateProps = {
  comment: CommentType;
  post: Post;
  user: User | null;
};

type Props = OwnProps & StateProps;

const CommentElement: React.FC<Props> = ({ comment, user, post }) => {
  const [updating, setUpdating] = React.useState<boolean>(false);
  const { owner, content, date, authorName, authorGender } = comment;

  const canDelete: boolean =
    !isNull(user) && (user._id === post.owner || user._id === comment.owner);
  const canUpdate: boolean = !isNull(user) && user._id === comment.owner;

  if (updating)
    return (
      <CommentUpdate
        id={comment._id}
        postId={post._id}
        startContent={content}
        onUpdateDone={() => setUpdating(false)}
      />
    );
  return (
    <Comment>
      <Comment.Avatar src={getImage(authorGender)} />
      {(canDelete || canUpdate) && (
        <CommentMenu
          canDelete={canDelete}
          canUpdate={canUpdate}
          onUpdateClick={() => setUpdating(true)}
          id={comment._id}
        />
      )}
      <Comment.Content>
        <Comment.Author as={Link} to={`/profile/${owner}`}>
          {authorName}
        </Comment.Author>
        <Comment.Metadata>
          <div>{date}</div>
        </Comment.Metadata>
        <Comment.Text>{content}</Comment.Text>
        <Comment.Actions>
          {!updating && <Comment.Action>Reply</Comment.Action>}
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  return {
    comment: state.comment.byId[ownProps.id],
    post: state.post.byId[ownProps.postId],
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(CommentElement);
