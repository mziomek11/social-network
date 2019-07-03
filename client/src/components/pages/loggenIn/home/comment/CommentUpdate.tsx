import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { UpdateOpinionData } from "../../../../../store/models";
import { updateComment } from "../../../../../store/comment/actions";

type OwnProps = {
  commentId: string;
  startContent: string;
  onUpdateDone: () => void;
};

type StateProps = {
  updatingComment: boolean;
};

type DispatchProps = {
  updateComment: (data: UpdateOpinionData) => void;
};

type Props = OwnProps & StateProps & DispatchProps;

type State = Readonly<{
  content: string;
}>;

class CommentUpdate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    this.setState({ content: this.props.startContent });
  }
  componentWillReceiveProps({ updatingComment }: Props) {
    if (this.props.updatingComment && !updatingComment)
      this.props.onUpdateDone();
  }
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { updateComment } = this.props;
    const { content } = this.state;
    if (content.length > 0) {
      updateComment({ content });
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
