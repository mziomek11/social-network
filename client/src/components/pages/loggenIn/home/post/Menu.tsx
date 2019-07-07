import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Icon, Menu, Loader } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { deletePost } from "../../../../../store/post/actions";
import PostUpdateForm from "./UpdateForm";

type DispatchProps = {
  deletePost: () => void;
};

type StateProps = {
  deletingPost: boolean;
};

type OwnProps = {
  postId: string;
};

type Props = DispatchProps & StateProps & OwnProps;

type State = {
  isOpen: boolean;
  isUpdating: boolean;
};

class PostMenu extends React.Component<Props, State> {
  private toggleContainer: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.state = { isOpen: false, isUpdating: false };
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
  handleDeleteClick = () => this.props.deletePost();
  handleUpdateClick = () => this.setState({ isOpen: false, isUpdating: true });
  render() {
    const { isOpen, isUpdating } = this.state;
    const { postId, deletingPost } = this.props;
    return (
      <div className="posts__menu-container" ref={this.toggleContainer}>
        <Icon
          name="options"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          className="posts__menu-icon"
        />
        {isUpdating && (
          <PostUpdateForm
            postId={postId}
            closeWindow={() => this.setState({ isUpdating: false })}
          />
        )}
        {isOpen && (
          <Menu vertical className="posts__menu" size="small">
            <Menu.Item onClick={this.handleDeleteClick}>
              {deletingPost ? (
                <Loader active size="tiny" />
              ) : (
                <React.Fragment>
                  <Icon name="trash" />
                  Delete
                </React.Fragment>
              )}
            </Menu.Item>
            <Menu.Item onClick={this.handleUpdateClick}>
              <Icon name="pencil" />
              Update
            </Menu.Item>
          </Menu>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    deletingPost: state.post.status.deletingPost
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { postId }: OwnProps
): DispatchProps => {
  return {
    deletePost: () => dispatch(deletePost(postId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostMenu);
