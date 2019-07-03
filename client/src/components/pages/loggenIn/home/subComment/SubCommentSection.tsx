import React from "react";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";

import AddForm from "./SubCommentAddForm";
import SubComments from "./SubComments";
import { RootState } from "MyTypes";

type OwnProps = {
  postId: string;
  commentId: string;
  subCommentsCount: number;
};

type StateProps = {
  isAddFormOpen: boolean;
};

type Props = OwnProps & StateProps;

const SubCommentSection: React.FC<Props> = ({
  postId,
  commentId,
  subCommentsCount,
  isAddFormOpen
}) => {
  const [subCommentsToShow, setSubCommnetsToShow] = React.useState<number>(0);
  React.useEffect(() => {
    if (isAddFormOpen && subCommentsToShow === 0)
      setSubCommnetsToShow(subCommentsPerAdd);
  }, [isAddFormOpen, subCommentsToShow]);
  const subCommentsPerAdd: number = 2;
  const canShowMoreSubComments: boolean = subCommentsToShow < subCommentsCount;
  return (
    <React.Fragment>
      {canShowMoreSubComments && (
        <div
          className="comments-clickable subcommets-show-more"
          onClick={() =>
            setSubCommnetsToShow(subCommentsToShow + subCommentsPerAdd)
          }
        >
          {subCommentsToShow === 0 ? (
            <React.Fragment>
              <Icon name="share" flipped="vertically" /> Show answers
            </React.Fragment>
          ) : (
            "More answers"
          )}
        </div>
      )}
      <SubComments
        toShow={subCommentsToShow}
        postId={postId}
        commentId={commentId}
      />
      <AddForm commentId={commentId} />
    </React.Fragment>
  );
};

const mapStateToProps = (
  state: RootState,
  { commentId }: OwnProps
): StateProps => {
  return {
    isAddFormOpen: state.comment.replyingOpen.indexOf(commentId) > -1
  };
};

export default connect(mapStateToProps)(SubCommentSection);
