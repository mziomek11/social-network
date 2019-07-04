import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Comment } from "semantic-ui-react";

import FormInsideComment from "../shared/FormInsideComment";
import { RootState } from "MyTypes";
import { getImage } from "../../../../other/Avatar";
import { closeReplying } from "../../../../../store/comment/actions";
import { addSubComment } from "../../../../../store/subComment/actions";
import { User } from "../../../../../store/auth/models";

type OwnProps = {
  commentId: string;
  onAddingDone: () => void;
};

type StateProps = {
  user: User | null;
  addingSubComment: boolean;
};

type DispatchProps = {
  addSubComment: (content: string) => void;
  closeReplying: () => void;
};

type Props = OwnProps & DispatchProps & StateProps;

class SubCommentAddForm extends React.Component<Props> {
  componentWillReceiveProps({ addingSubComment }: Props) {
    if (this.props.addingSubComment && !addingSubComment) {
      this.props.onAddingDone();
      this.props.closeReplying();
    }
  }
  handleSubmit = (content: string) => {
    if (content.length === 0 || this.props.addingSubComment) return;
    this.props.addSubComment(content);
  };
  render() {
    if (!this.props.user) return null;
    return (
      <Comment>
        <Comment.Avatar src={getImage(this.props.user.gender)} />
        <FormInsideComment
          startContent=""
          onSubmit={(content: string) => this.handleSubmit(content)}
          onCancel={() => this.props.closeReplying()}
          proccessing={this.props.addingSubComment}
        />
      </Comment>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    user: state.auth.user,
    addingSubComment: state.subComment.status.addingSubComment
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { commentId }: OwnProps
): DispatchProps => {
  return {
    addSubComment: (content: string) =>
      dispatch(addSubComment({ commentId, content })),
    closeReplying: () => dispatch(closeReplying(commentId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCommentAddForm);
