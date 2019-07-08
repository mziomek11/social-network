import React from "react";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "MyTypes";
import { PostsById, Post } from "./store/post/models";
import {
  addPostSocket,
  deletePostSocket,
  updatePostSocket
} from "./store/post/actions";
import { CommentsById, Comment } from "./store/comment/models";
import {
  addCommentSocket,
  deleteCommentSocket,
  updateCommentSocket,
  fetchComments
} from "./store/comment/actions";
import { SubCommentsById, SubComment } from "./store/subComment/models";
import {
  addSubCommentSocket,
  deleteSubCommentSocket,
  updateSubCommentSocket,
  fetchSubComments
} from "./store/subComment/actions";

type StateProps = {
  postsById: PostsById;
  commentsById: CommentsById;
  subCommentsById: SubCommentsById;

  commentCountByPostId: { [id: string]: number };
  subComCountByComId: { [id: string]: number };
};

type DispatchProps = {
  addPostSocket: (byId: PostsById, data: Post) => void;
  updatePostSocket: (byId: PostsById, data: Post) => void;
  deletePostSocket: (byId: PostsById, id: string) => void;

  addCommentSocket: (byId: CommentsById, data: Comment) => void;
  updateCommentSocket: (byId: CommentsById, data: Comment) => void;
  deleteCommentSocket: (byId: CommentsById, id: string) => void;

  addSubCommentSocket: (byId: SubCommentsById, data: SubComment) => void;
  updateSubCommentSocket: (byId: SubCommentsById, data: SubComment) => void;
  deleteSubCommentSocket: (byId: SubCommentsById, id: string) => void;

  fetchComments: (id: string, count: number) => void;
  fetchSubComments: (id: string, count: number) => void;
};

type Props = StateProps & DispatchProps;

class SocketManager extends React.Component<Props, {}> {
  shouldComponentUpdate() {
    return false;
  }
  componentDidMount() {
    const socket = socketIOClient("http://localhost:5000/");
    socket.on("postAdd", this.onPostAdd);
    socket.on("postUpdate", this.onPostUpdate);
    socket.on("postDelete", this.onPostDelete);

    socket.on("commentAdd", this.onCommentAdd);
    socket.on("commentUpdate", this.onCommentUpdate);
    socket.on("commentDelete", this.onCommentDelete);

    socket.on("subCommentAdd", this.onSubCommentAdd);
    socket.on("subCommentUpdate", this.onSubCommentUpdate);
    socket.on("subCommentDelete", this.onSubCommentDelete);
  }

  onPostAdd = (post: Post) => {
    this.props.addPostSocket(this.props.postsById, post);
  };
  onPostUpdate = (post: Post) => {
    if (this.props.postsById[post._id])
      this.props.updatePostSocket(this.props.postsById, post);
  };
  onPostDelete = (id: string) => {
    if (this.props.postsById[id])
      this.props.deletePostSocket(this.props.postsById, id);
  };

  onCommentAdd = (comment: Comment) => {
    const post: Post | null = this.props.postsById[comment.post];
    if (post) {
      const updatedPost: Post = {
        ...post,
        commentsCount: post.commentsCount + 1
      };
      this.props.updatePostSocket(this.props.postsById, updatedPost);
      this.props.addCommentSocket(this.props.commentsById, comment);
    }
  };
  onCommentUpdate = (comment: Comment) => {
    if (this.props.commentsById[comment._id])
      this.props.updateCommentSocket(this.props.commentsById, comment);
  };
  onCommentDelete = ({ postId, com }: { postId: string; com: string }) => {
    const { commentsById, postsById, commentCountByPostId } = this.props;
    const post: Post | null = postsById[postId];
    if (post) {
      const comToDelete: Comment | null = commentsById[com];
      const updatedPost: Post = {
        ...post,
        commentsCount: post.commentsCount - 1
      };

      if (comToDelete) {
        const fetchedComsAfterDelete: number = commentCountByPostId[postId] - 1;
        if (fetchedComsAfterDelete === 0 && post.commentsCount > 1) {
          this.props.fetchComments(postId, 0);
        }
        this.props.deleteCommentSocket(this.props.commentsById, com);
      }

      this.props.updatePostSocket(this.props.postsById, updatedPost);
    }
  };

  onSubCommentAdd = (subComment: SubComment) => {
    const commnet: Comment | null = this.props.commentsById[subComment.comment];
    if (commnet) {
      const updatedComment: Comment = {
        ...commnet,
        subCommentsCount: commnet.subCommentsCount + 1
      };
      this.props.updateCommentSocket(this.props.commentsById, updatedComment);
      this.props.addSubCommentSocket(this.props.subCommentsById, subComment);
    }
  };
  onSubCommentUpdate = (subComment: SubComment) => {
    if (this.props.subCommentsById[subComment._id])
      this.props.updateSubCommentSocket(this.props.subCommentsById, subComment);
  };
  onSubCommentDelete = ({ subCom, com }: { subCom: string; com: string }) => {
    const { subCommentsById, commentsById, subComCountByComId } = this.props;
    const comment: Comment | null = commentsById[com];
    if (comment) {
      const subComToDelete: SubComment | null = subCommentsById[subCom];
      const updatedComment: Comment = {
        ...comment,
        subCommentsCount: comment.subCommentsCount - 1
      };

      if (subComToDelete) {
        const fetchedSubComsAfterDelete: number = subComCountByComId[com] - 1;
        if (fetchedSubComsAfterDelete === 0 && comment.subCommentsCount > 1) {
          this.props.fetchSubComments(com, 0);
        }
        this.props.deleteSubCommentSocket(this.props.subCommentsById, subCom);
      }

      this.props.updateCommentSocket(this.props.commentsById, updatedComment);
    }
  };
  render() {
    return null;
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    postsById: state.post.byId,
    commentsById: state.comment.byId,
    subCommentsById: state.subComment.byId,
    commentCountByPostId: state.comment.countByPostId,
    subComCountByComId: state.subComment.countByCommentId
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    addPostSocket: (posts: PostsById, post: Post) =>
      dispatch(addPostSocket(posts, post)),
    deletePostSocket: (posts: PostsById, id: string) =>
      dispatch(deletePostSocket(posts, id)),
    updatePostSocket: (posts: PostsById, post: Post) =>
      dispatch(updatePostSocket(posts, post)),

    addCommentSocket: (comms: CommentsById, data: Comment) =>
      dispatch(addCommentSocket(comms, data)),
    deleteCommentSocket: (comms: CommentsById, id: string) =>
      dispatch(deleteCommentSocket(comms, id)),
    updateCommentSocket: (comms: CommentsById, data: Comment) =>
      dispatch(updateCommentSocket(comms, data)),

    addSubCommentSocket: (comms: SubCommentsById, data: SubComment) =>
      dispatch(addSubCommentSocket(comms, data)),
    deleteSubCommentSocket: (comms: SubCommentsById, id: string) =>
      dispatch(deleteSubCommentSocket(comms, id)),
    updateSubCommentSocket: (comms: SubCommentsById, data: SubComment) =>
      dispatch(updateSubCommentSocket(comms, data)),

    fetchComments: (id: string, count: number) =>
      dispatch(fetchComments(id, count)),
    fetchSubComments: (id: string, count: number) =>
      dispatch(fetchSubComments(id, count))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocketManager);
