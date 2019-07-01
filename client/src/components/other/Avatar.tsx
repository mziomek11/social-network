import React from "react";
import { Image } from "semantic-ui-react";

import { Gender } from "../../store/models";
import manImage from "../../images/avatar-male.png";
import womanImage from "../../images/avatar-female.png";

type OwnProps = {
  gender: Gender;
};

const Avatar: React.FC<OwnProps> = ({ gender }) => {
  return (
    <Image
      src={getImage(gender)}
      floated="left"
      size="mini"
    />
  );
};

export const getImage = (gender: Gender): string =>
  gender === Gender.Male ? manImage : womanImage;

export default Avatar;
