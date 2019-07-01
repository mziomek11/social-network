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

const PostMenu: React.FC<Props> = ({ deletePost, id, deletingPost }) => {
  const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [isUpdatingPost, setUpdatingPost] = React.useState<boolean>(false);
  const handleDeleteClick = () => deletePost(id);
  const handleUpdateClick = () => {
    setMenuOpen(false);
    setUpdatingPost(true);
  };

  return (
    <div className="card-menu-container">
      <Icon
        name="options"
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="card-icon"
      />
      {isUpdatingPost && (
        <PostUpdate id={id} closeWindow={() => setUpdatingPost(false)} />
      )}
      {isMenuOpen && (
        <Menu vertical className="card-menu" size="small">
          <Menu.Item onClick={handleDeleteClick}>
            {deletingPost ? (
              <Loader active size="tiny" />
            ) : (
              <React.Fragment>
                <Icon name="trash" />
                Delete
              </React.Fragment>
            )}
          </Menu.Item>
          <Menu.Item onClick={handleUpdateClick}>
            <Icon name="pencil" />
            Update
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

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
