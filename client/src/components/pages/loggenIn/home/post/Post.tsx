import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Card, Image, Icon } from "semantic-ui-react";
import { isNull } from "util";

import PostMenu from "./PostMenu";
import CommentSection from "../comment/CommentSection";
import Avatar from "../../../../other/Avatar";
import { RootState } from "MyTypes";
import { Post as PostType } from "../../../../../store/post/models";
import { User } from "../../../../../store/auth/models";

type OwnProps = {
  id: string;
};

type StateProps = {
  postData: PostType;
  user: User | null;
  commentsCount: number;
};

type Props = OwnProps & StateProps;

const Post: React.FC<Props> = ({ postData, id, user, commentsCount }) => {
  const { authorName, date, content, image, likedBy, authorGender } = postData;
  const isPostOwner: boolean = !isNull(user) && user._id === postData.owner;
  return (
    <Card className="card-main">
      <Card.Content>
        {isPostOwner && <PostMenu id={id} />}
        <Avatar gender={authorGender} />
        <Card.Header>{authorName}</Card.Header>
        <Card.Meta>{moment(date).fromNow()}</Card.Meta>
        <Card.Description>{content}</Card.Description>
      </Card.Content>
      {image && <Image src={image} />}
      <Card.Content>
        <span className="card-likes">
          <Icon name="heart" />
          {likedBy.length} {`like${likedBy.length !== 1 ? "s" : ""}`}
        </span>
        <Icon name="comment" />
        <span>{commentsCount ? commentsCount : 0} comments</span>
      </Card.Content>
      <Card.Content>
        <CommentSection id={id} commentCount={commentsCount} />
      </Card.Content>
    </Card>
  );
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  return {
    postData: state.post.byId[ownProps.id],
    user: state.auth.user,
    commentsCount: state.comment.countByPostId[ownProps.id]
  };
};

export default connect(mapStateToProps)(Post);
