import React from "react";
import { connect } from "react-redux";
import { Card, Image, Icon, Form } from "semantic-ui-react";

import PostMenu from "./PostMenu";
import { RootState } from "MyTypes";
import { Post as PostType } from "../../../../store/post/models";
import { User } from "../../../../store/auth/models";
import { isNull } from "util";

type OwnProps = {
  id: string;
  showMenu?: boolean;
};

type StateProps = {
  postData: PostType;
  user: User | null;
};

type Props = OwnProps & StateProps;

const Post: React.FC<Props> = ({ postData, id, user, showMenu=true }) => {
  const [comment, setComment] = React.useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(comment);
    setComment("");
  };
  const { authorName, date, content, image, likedBy, comments } = postData;
  const isPostOwner: boolean = !isNull(user) && user._id === postData.owner;
  return (
    <Card className="card-main">
      <Card.Content>
        {isPostOwner && showMenu && <PostMenu id={id}/>}
        <Card.Header>{authorName}</Card.Header>
        <Card.Meta>{date.toString()}</Card.Meta>
        <Card.Description>{content}</Card.Description>
      </Card.Content>
      {image && <Image src={image} />}
      <Card.Content>
        <span className="card-likes">
          <Icon name="heart" />
          {likedBy.length} {`like${likedBy.length !== 1 ? "s" : ""}`}
        </span>
        <Icon name="comment" />
        <span>
          {comments.length} {`comment${comments.length !== 1 ? "s" : ""}`}
        </span>
      </Card.Content>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          fluid
          placeholder="Add comment..."
          size="large"
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="card-input"
        />
      </Form>
    </Card>
  );
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  return {
    postData: state.post.byId[ownProps.id],
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Post);
