import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Icon, Menu, Loader } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { postActions } from "../../../../../store/post";
import PostUpdate from "./PostUpdate";

type DispatchProps = {
  deletePost: (id: string) => void;
};

type StateProps = {
  deletingPost: boolean;
};

type OwnProps = {
  id: string;
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
  handleDeleteClick = () => this.props.deletePost(this.props.id);
  handleUpdateClick = () => this.setState({ isOpen: false, isUpdating: true });
  render() {
    const { isOpen, isUpdating } = this.state;
    const { id, deletingPost } = this.props;
    return (
      <div className="card-menu-container" ref={this.toggleContainer}>
        <Icon
          name="options"
          onClick={() => this.setState({ isOpen: !this.state.isOpen })}
          className="card-icon"
        />
        {isUpdating && (
          <PostUpdate
            id={id}
            closeWindow={() => this.setState({ isUpdating: false })}
          />
        )}
        {isOpen && (
          <Menu vertical className="card-menu" size="small">
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    deletePost: (id: string) => dispatch(postActions.deletePost(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostMenu);
