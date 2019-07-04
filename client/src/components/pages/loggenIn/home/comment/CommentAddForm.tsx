import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { addComment } from "../../../../../store/comment/actions";

type OwnProps = {
  postId: string;
  onAddingDone: () => void;
};

type StateProps = {
  addingComment: boolean;
};

type DispatchProps = {
  addComment: (content: string) => void;
};

type Props = OwnProps & DispatchProps & StateProps;

type State = {
  comment: string;
  isTyping: boolean;
};

class CommentAddForm extends React.Component<Props, State> {
  readonly state: State = {
    comment: "",
    isTyping: false
  };
  componentWillReceiveProps({ addingComment }: Props) {
    if (this.props.addingComment && !addingComment) {
      this.setState({ comment: "", isTyping: false });
      this.props.onAddingDone();
    }
  }
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { addingComment, addComment } = this.props;
    const { comment } = this.state;
    if (comment.length > 0 && !addingComment) addComment(comment);
  };
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.props.addingComment) this.setState({ comment: e.target.value });
  };
  render() {
    return this.state.isTyping ? (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          fluid
          placeholder="Your comment..."
          size="small"
          value={this.state.comment}
          onChange={this.handleChange}
          className="card-input"
          autoFocus
        />
      </Form>
    ) : (
      <span
        className="comments-clickable"
        onClick={() => {
          console.log("siema");
          this.setState({ isTyping: true });
        }}
      >
        Write comment...
      </span>
    );
  }
}

// const CommentAddForm: React.FC<Props> = ({ addComment, addingComment }) => {
//   React.useEffect(() => {
//     console.log(addingComment)
//   }, [addingComment])
//   const [comment, setComment] = React.useState<string>("");
//   const [isTyping, setIsTyping] = React.useState<boolean>(false);
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (comment.length === 0 && !addingComment) return;
//     addComment(comment);
//     setComment("");
//     setIsTyping(false);
//   };
//   return isTyping ? (
//     <Form onSubmit={handleSubmit}>
//       <Form.Input
//         fluid
//         placeholder="Your comment..."
//         size="small"
//         value={comment}
//         onChange={e => setComment(e.target.value)}
//         className="card-input"
//         autoFocus
//       />
//     </Form>
//   ) : (
//     <span className="comments-clickable" onClick={() => setIsTyping(true)}>
//       Write comment...
//     </span>
//   );
// };

const mapStateToProps = (state: RootState): StateProps => {
  return {
    addingComment: state.comment.status.addingComment
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { postId }: OwnProps
): DispatchProps => {
  return {
    addComment: (content: string) =>
      dispatch(
        addComment({
          postId,
          content
        })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentAddForm);
