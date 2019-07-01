export interface Opinion {
  _id: string;
  owner: string;
  authorName: string;
  authorGender: Gender;
  content: string;
  date: Date;
  likedBy: string[];
}

export interface AddOpinionData {
  content: string;
  image?: string;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  None = ""
}
