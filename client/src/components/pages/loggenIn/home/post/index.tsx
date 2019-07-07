import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Card, Image, Icon } from "semantic-ui-react";
import { isNull } from "util";

import PostMenu from "./Menu";
import CommentList from "../comment/List";
import Avatar from "../../../../other/Avatar";
import { RootState } from "MyTypes";
import { Post as PostType } from "../../../../../store/post/models";
import { User } from "../../../../../store/auth/models";

type OwnProps = {
  postId: string;
};

type StateProps = {
  postData: PostType;
  user: User | null;
};

type Props = OwnProps & StateProps;

class Post extends React.Component<Props, {}> {
  shouldComponentUpdate(nextProps: Props) {
    const { postData, postId } = this.props;
    const { commentsCount, content } = postData;
    if (postId !== nextProps.postId) return true;
    if (commentsCount !== nextProps.postData.commentsCount) return true;
    if (content !== nextProps.postData.content) return true;
    return false;
  }
  render() {
    const { postData, postId, user } = this.props;
    const {
      authorName,
      date,
      content,
      image,
      likedBy,
      authorGender,
      commentsCount
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
            {`${commentsCount} comment${commentsCount !== 1 ? "s" : ""}`}
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
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Post);
