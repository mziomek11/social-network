import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import { RootState } from "MyTypes";

type OwnProps = {
  postId: string;
  commentsToShow: number;
  onShowMoreClick: () => void;
};

type StateProps = {
  commentsCount: number;
};

type Props = OwnProps & StateProps;

const ShowMore: React.FC<Props> = ({
  commentsCount,
  commentsToShow,
  onShowMoreClick
}) => {
  const canShowMoreSubComments: boolean = commentsToShow < commentsCount;
  if (!canShowMoreSubComments) return null;
  return (
    <div
      className="clickable"
      onClick={() => onShowMoreClick()}
    >
      {commentsToShow === 0 ? (
        <React.Fragment>
          <Icon name="share" flipped="vertically" /> Show answers
        </React.Fragment>
      ) : (
        "More comments"
      )}
    </div>
  );
};

const mapStateToProps = (
  state: RootState,
  { postId }: OwnProps
): StateProps => {
  return {
    commentsCount: state.comment.countByPostId[postId]
  };
};

export default connect(mapStateToProps)(ShowMore);
