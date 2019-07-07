import React from "react";

type OwnProps = {
  onShowMoreClick: () => void;
};

type Props = OwnProps;

const ShowMore: React.FC<Props> = ({ onShowMoreClick }) => {
  return (
    <div className="clickable" onClick={() => onShowMoreClick()}>
      More comments
    </div>
  );
};

export default ShowMore;
