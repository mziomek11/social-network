import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Icon, Menu, Loader } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { deleteSubComment } from "../../../../../store/subComment/actions";

type DispatchProps = {
  deleteSubComment: () => void;
};

type StateProps = {
  deletingSubComment: boolean;
};

type OwnProps = {
  subCommentId: string;
  onUpdateClick: () => void;
  canDelete: boolean;
  canUpdate: boolean;
};

type Props = DispatchProps & StateProps & OwnProps;

type State = {
  isOpen: boolean;
};

class SubCommentMenu extends React.Component<Props, State> {
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
  handleDeleteClick = () => this.props.deleteSubComment();
  handleUpdateClick = () => {
    this.setState({ isOpen: false });
    this.props.onUpdateClick();
  };
  render() {
    const { isOpen } = this.state;
    const { canDelete, canUpdate, deletingSubComment } = this.props;
    return (
      <div className="card-menu-container" ref={this.toggleContainer}>
        <Icon
          name="options"
          onClick={() => this.setState({ isOpen: !isOpen })}
          className="card-icon"
        />
        {isOpen && (
          <Menu vertical className="card-menu" size="small">
            {canDelete && (
              <Menu.Item onClick={this.handleDeleteClick}>
                {deletingSubComment ? (
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
    deletingSubComment: state.subComment.status.deletingSubComment
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { subCommentId }: OwnProps
): DispatchProps => {
  return {
    deleteSubComment: () => dispatch(deleteSubComment(subCommentId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubCommentMenu);
