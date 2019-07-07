import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import FormInsideComment from "../shared/FormInsideComment";
import { RootState } from "MyTypes";
import { UpdateOpinionData } from "../../../../../store/models";
import { updateComment } from "../../../../../store/comment/actions";

type OwnProps = {
  commentId: string;
  startContent: string;
  onUpdateDone: () => void;
  onCancelClick: () => void;
};

type StateProps = {
  updatingComment: boolean;
};

type DispatchProps = {
  updateComment: (data: UpdateOpinionData) => void;
};

type Props = OwnProps & StateProps & DispatchProps;

class CommentUpdate extends React.Component<Props, {}> {
  componentWillReceiveProps({ updatingComment }: Props) {
    if (this.props.updatingComment && !updatingComment)
      this.props.onUpdateDone();
  }
  handleSubmit = (content: string) => {
    if (content.length > 0) this.props.updateComment({ content });
  };
  render() {
    return (
      <FormInsideComment
        startContent={this.props.startContent}
        onCancel={() => this.props.onCancelClick()}
        onSubmit={(content: string) => this.handleSubmit(content)}
        proccessing={this.props.updatingComment}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    updatingComment: state.comment.status.updatingComment
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { commentId }: OwnProps
): DispatchProps => {
  return {
    updateComment: (data: UpdateOpinionData) =>
      dispatch(updateComment(commentId, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentUpdate);
