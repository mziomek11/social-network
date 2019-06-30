import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Redirect, BrowserRouterProps } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

import { postActions } from "../../../../store/post";

type DispatchProps = {
  deletePost: (id: string) => void;
};

type OwnProps = {
  id: string;
};

type Props = DispatchProps & OwnProps & BrowserRouterProps;

const PostMenu: React.FC<Props> = ({ deletePost, id}) => {
  const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [shouldRedirect, setShouldRedirect] = React.useState<boolean>(false);
  const handleDeleteClick = () => deletePost(id);
  const handleUpdateClick = () => setShouldRedirect(true);

  if (shouldRedirect) return <Redirect exact to={`post/${id}/update`} />;
  return (
    <div className="card-menu-container">
      <Icon
        name="options"
        onClick={() => setMenuOpen(!isMenuOpen)}
        className="card-menu-icon"
      />
      {isMenuOpen && (
        <Menu vertical className="card-menu" size="small">
          <Menu.Item onClick={handleDeleteClick}>Delete</Menu.Item>
          <Menu.Item onClick={handleUpdateClick}>Update</Menu.Item>
        </Menu>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    deletePost: (id: string) => dispatch(postActions.deletePost(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(PostMenu);
