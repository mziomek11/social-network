import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Icon, Menu, Loader } from "semantic-ui-react";

import { RootState } from "MyTypes";
import { commentActions } from "../../../../../store/comment";

type DispatchProps = {
  deleteComment: (id: string) => void;
};

type StateProps = {
  deletingComment: boolean;
};

type OwnProps = {
  id: string;
  onUpdateClick: () => void;
  canDelete: boolean;
  canUpdate: boolean;
};

type Props = DispatchProps & StateProps & OwnProps;

const CommentMenu: React.FC<Props> = ({
  deleteComment,
  id,
  deletingComment,
  onUpdateClick,
  canDelete,
  canUpdate
}) => {
  const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);
  const handleDeleteClick = () => deleteComment(id);
  const handleUpdateClick = () => {
    setMenuOpen(false);
    onUpdateClick();
  };

  return (
    <div className="card-menu-container">
      <Icon
        name="options"
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="card-icon"
      />
      {isMenuOpen && (
        <Menu vertical className="card-menu" size="small">
          {canDelete && (
            <Menu.Item onClick={handleDeleteClick}>
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
            <Menu.Item onClick={handleUpdateClick}>
              <Icon name="pencil" />
              Update
            </Menu.Item>
          )}
        </Menu>
      )}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    deletingComment: state.comment.status.deletingComment
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    deleteComment: (id: string) => dispatch(commentActions.deleteComment(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentMenu);
