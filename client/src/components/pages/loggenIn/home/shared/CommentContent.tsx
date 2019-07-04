import React from "react";
import moment from "moment";
import { Comment } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { Opinion } from "../../../../../store/models";

type Props = {
  opinionData: Opinion;
  onReply: () => void;
};

const CommentContent: React.FC<Props> = ({ opinionData, onReply }) => {
  const { authorName, date, content, owner } = opinionData;
  return (
    <Comment.Content>
      <Comment.Author as={Link} to={`/profile/${owner}`}>
        {authorName}
      </Comment.Author>
      <Comment.Metadata>
        <div>{moment(date).fromNow()}</div>
      </Comment.Metadata>
      <Comment.Text>{content}</Comment.Text>
      <Comment.Actions>
        <Comment.Action onClick={() => onReply()}>Reply</Comment.Action>
        <Comment.Action onClick={() => null}>Like</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  );
};

export default CommentContent;
