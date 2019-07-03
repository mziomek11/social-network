import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { UpdateOpinionData } from "../../../../../store/models";
import { updateSubComment } from "../../../../../store/subComment/actions";

type OwnProps = {
  subCommentId: string;
  startContent: string;
  onUpdateDone: () => void;
};

type StateProps = {
  updatingSubComment: boolean;
};

type DispatchProps = {
  updateSubComment: (data: UpdateOpinionData) => void;
};

type Props = OwnProps & StateProps & DispatchProps;

type State = Readonly<{
  content: string;
}>;

class SubCommentUpdate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    this.setState({ content: this.props.startContent });
  }
  componentWillReceiveProps({ updatingSubComment }: Props) {
    if (this.props.updatingSubComment && !updatingSubComment)
      this.props.onUpdateDone();
  }
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { updateSubComment } = this.props;
    const { content } = this.state;
    if (content.length > 0) {
      updateSubComment({ content });
    }
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="comment-update-form">
        <Form.Input
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
          size="small"
          className="comment-update-input"
          autoFocus
        />
      </Form>
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
