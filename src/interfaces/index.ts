import { UserInfo, User } from "firebase/auth";

export interface IUser {
  userId: string;
  username: string;
  fullName: string;
  emailAddress: string;
  following: string[];
  followers: string[];
  dateCreated: number;
}
export interface IDetailUser extends IUser {
  docId: string;
}
export interface IComment {
  comment: string;
  displayName: string;
}
export interface IPhoto {
  docId: string;
  photoId: string;
  userId: string;
  imageSrc: string;
  caption: string;
  likes: Array<string>;
  comments: Array<IComment>;
  userLatitude: string;
  userLongitude: string;
  dateCreated: number;
}
export interface IDetailPhoto extends IPhoto {
  username: string;
  isLoggedInUserLikePhoto: boolean;
}
export type AuthUser = UserInfo & User;
