import React from "react";
import moment from "moment";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Card, Image, Icon } from "semantic-ui-react";
import { isNull } from "util";

import PostMenu from "./Menu";
import CommentList from "../comment/List";
import Avatar from "../../../../other/Avatar";
import { RootState } from "MyTypes";
import { fetchComments } from "../../../../../store/comment/actions";
import { Post as PostType } from "../../../../../store/post/models";
import { User } from "../../../../../store/auth/models";

type OwnProps = {
  postId: string;
};

type StateProps = {
  postData: PostType;
  user: User | null;
  commentsCount: number;
};

type DispatchProps = {
  fetchComments: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class Post extends React.Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    const { postData, postId, commentsCount } = this.props;
    if (postId !== nextProps.postId) return true;
    if (commentsCount !== nextProps.commentsCount) return true;
    if (postData.content !== nextProps.postData.content) return true;
    return false;
  }
  render() {
    const { postData, postId, user, commentsCount } = this.props;
    const {
      authorName,
      date,
      content,
      image,
      likedBy,
      authorGender
    } = postData;
    const isPostOwner: boolean = !isNull(user) && user._id === postData.owner;
    return (
      <Card className="posts__card">
        <Card.Content>
          {isPostOwner && <PostMenu postId={postId} />}
          <Avatar gender={authorGender} />
          <Card.Header>{authorName}</Card.Header>
          <Card.Meta>{moment(date).fromNow()}</Card.Meta>
          <Card.Description>{content}</Card.Description>
        </Card.Content>
        {image && <Image src={image} />}
        <Card.Content>
          <span className="posts__likes">
            <Icon name="heart" />
            {likedBy.length} {`like${likedBy.length !== 1 ? "s" : ""}`}
          </span>
          <Icon name="comment" />
          <span>
            {commentsCount ? commentsCount : 0}{" "}
            {`comment${commentsCount !== 1 ? "s" : ""}`}
          </span>
        </Card.Content>
        <Card.Content className="comments">
          <CommentList postId={postId} />
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = (
  state: RootState,
  { postId }: OwnProps
): StateProps => {
  return {
    postData: state.post.byId[postId],
    user: state.auth.user,
    commentsCount: state.comment.countByPostId[postId]
      ? state.comment.countByPostId[postId]
      : 0
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    fetchComments: () => dispatch(fetchComments())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
