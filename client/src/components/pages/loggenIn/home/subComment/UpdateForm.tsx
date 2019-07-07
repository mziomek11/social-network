import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import FormInsideComment from "../shared/FormInsideComment";
import { RootState } from "MyTypes";
import { UpdateOpinionData } from "../../../../../store/models";
import { updateSubComment } from "../../../../../store/subComment/actions";

type OwnProps = {
  subCommentId: string;
  startContent: string;
  onUpdateDone: () => void;
  onCancelClick: () => void;
};

type StateProps = {
  updatingSubComment: boolean;
};

type DispatchProps = {
  updateSubComment: (data: UpdateOpinionData) => void;
};

type Props = OwnProps & StateProps & DispatchProps;

class SubCommentUpdate extends React.Component<Props, {}> {
  componentWillReceiveProps({ updatingSubComment }: Props) {
    if (this.props.updatingSubComment && !updatingSubComment)
      this.props.onUpdateDone();
  }
  handleSubmit = (content: string) => {
    if (content.length > 0) this.props.updateSubComment({ content });
  };
  render() {
    return (
      <FormInsideComment
        startContent={this.props.startContent}
        onCancel={() => this.props.onCancelClick()}
        onSubmit={(content: string) => this.handleSubmit(content)}
        proccessing={this.props.updatingSubComment}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    updatingSubComment: state.subComment.status.updatingSubComment
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { subCommentId }: OwnProps
): DispatchProps => {
  return {
    updateSubComment: (data: UpdateOpinionData) =>
      dispatch(updateSubComment(subCommentId, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCommentUpdate);
