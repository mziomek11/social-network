import React from "react";
import {connect} from "react-redux";
import { Icon } from "semantic-ui-react";

import { RootState } from "MyTypes";

type OwnProps = {
  commentId: string;
  subCommentsToShow: number;
  onShowMoreClick: () => void;
};

type StateProps = {
  subCommentsCount: number;
};

type Props = OwnProps & StateProps;

const ShowMore: React.FC<Props> = ({
  subCommentsCount,
  subCommentsToShow,
  onShowMoreClick
}) => {
  const canShowMoreSubComments: boolean = subCommentsToShow < subCommentsCount;
  if (!canShowMoreSubComments) return null;
  return (
    <div
      className="clickable comments__show-more-subcomments"
      onClick={() => onShowMoreClick()}
    >
      {subCommentsToShow === 0 ? (
        <React.Fragment>
          <Icon name="share" flipped="vertically" /> Show answers
        </React.Fragment>
      ) : (
        "More answers"
      )}
    </div>
  );
};

const mapStateToProps = (
  state: RootState,
  { commentId }: OwnProps
): StateProps => {
  return {
    subCommentsCount: state.subComment.countByCommentId[commentId]
  };
};

export default connect(mapStateToProps)(ShowMore);
