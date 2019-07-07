import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Icon, Menu, Loader } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { deleteComment } from "../../../../../store/comment/actions";

type DispatchProps = {
  deleteComment: () => void;
};

type StateProps = {
  deletingComment: boolean;
};

type OwnProps = {
  commentId: string;
  onUpdateClick: () => void;
  canDelete: boolean;
  canUpdate: boolean;
};

type Props = DispatchProps & StateProps & OwnProps;

type State = {
  isOpen: boolean;
};

class CommentMenu extends React.Component<Props, State> {
  private toggleContainer: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();
  }
  componentDidMount() {
    window.addEventListener("click", this.onClickOutsideHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.onClickOutsideHandler);
  }
  onClickOutsideHandler = ({ target }: any) => {
    const { toggleContainer, state } = this;
    if (!toggleContainer.current) return;
    if (state.isOpen && !toggleContainer.current.contains(target)) {
      this.setState({ isOpen: false });
    }
  };
  handleDeleteClick = () => this.props.deleteComment();
  handleUpdateClick = () => {
    this.setState({ isOpen: false });
    this.props.onUpdateClick();
  };
  render() {
    const { isOpen } = this.state;
    const { canDelete, canUpdate, deletingComment } = this.props;
    return (
      <div className="posts__menu-container" ref={this.toggleContainer}>
        <Icon
          name="options"
          onClick={() => this.setState({ isOpen: !isOpen })}
          className="posts__menu-icon"
        />
        {isOpen && (
          <Menu vertical className="posts__menu" size="small">
            {canDelete && (
              <Menu.Item onClick={this.handleDeleteClick}>
                {deletingComment ? (
                  <Loader active size="tiny" />
                ) : (
                  <React.Fragment>
                    <Icon name="trash" />
                    Delete
                  </React.Fragment>
                )}
              </Menu.Item>
            )}
            {canUpdate && (
              <Menu.Item onClick={this.handleUpdateClick}>
                <Icon name="pencil" />
                Update
              </Menu.Item>
            )}
          </Menu>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    deletingComment: state.comment.status.deletingComment
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { commentId }: OwnProps
): DispatchProps => {
  return {
    deleteComment: () => dispatch(deleteComment(commentId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentMenu);
