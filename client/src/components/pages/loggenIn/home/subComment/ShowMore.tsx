import React from "react";
import { Icon } from "semantic-ui-react";

type OwnProps = {
  onShowMoreClick: () => void;
  fetchedSubCommentsCount: number;
};

type Props = OwnProps;

const ShowMore: React.FC<Props> = ({
  onShowMoreClick,
  fetchedSubCommentsCount
}) => {
  return (
    <div
      className="clickable comments__show-more-subcomments"
      onClick={() => onShowMoreClick()}
    >
      {fetchedSubCommentsCount === 0 ? (
        <React.Fragment>
          <Icon name="share" flipped="vertically" /> Show answers
        </React.Fragment>
      ) : (
        "More answers"
      )}
    </div>
  );
};

export default ShowMore;
