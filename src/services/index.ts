import { firebase, FieldValue } from "../lib/firebase";
import { IUser, IPhoto, IDetailPhoto, IDetailUser } from "../interfaces";

export const doseUsernameExist = async (username: string) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  return result.docs.length > 0;
};

export const getUserByUserId = async (userId: string) => {
  const result = await firebase.firestore().collection("users").where("userId", "==", userId).get();
  const [user]: Array<IDetailUser> = result.docs.map((item) => {
    const data = item.data() as IUser;
    return {
      ...data,
      docId: item.id
    };
  });
  return user;
};

export const getUserByUsername = async (username: string) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  const [user]: Array<IDetailUser> = result.docs.map((item) => {
    const data = item.data() as IUser;
    return {
      ...data,
      docId: item.id
    };
  });
  return user;
};

export const getSuggestedProfiles = async (userId: string, following: Array<string>) => {
  const result =
    following.length > 0
      ? await firebase
          .firestore()
          .collection("users")
          .where("userId", "not-in", following)
          .limit(10)
          .get()
      : await firebase.firestore().collection("users").limit(10).get();

  const profiles: Array<IDetailUser> = result.docs.map((profile) => {
    const data = profile.data() as IUser;
    return {
      ...data,
      docId: profile.id
    };
  });
  return profiles.filter((profile) => profile.userId !== userId);
};
export const updateLoggedInUserFollowing = async (
  loggedInUserDocId: string,
  profileId: string,
  isFollowingProfile: boolean
) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId)
    });
};
export const updateProfileFollower = async (
  profileDocId: string,
  loggedInUserId: string,
  isFollowingProfile: boolean
) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserId)
        : FieldValue.arrayUnion(loggedInUserId)
    });
};
export const getProfilePhotos = async (
  loggedInUserId: string,
  loggedInUserFollowing: Array<string>
) => {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", loggedInUserFollowing)
    .get();
  const profilePhotos: Array<IPhoto> = result.docs.map((photo) => {
    const data = photo.data() as IPhoto;
    return {
      ...data,
      docId: photo.id
    };
  });
  const detailProfilePhotos: Array<IDetailPhoto> = await Promise.all(
    profilePhotos.map(async (photo) => {
      let isLoggedInUserLikePhoto = false;
      if (photo.likes?.includes(loggedInUserId)) isLoggedInUserLikePhoto = true;
      const user = await getUserByUserId(photo.userId);
      const { username } = user;

      return { username, ...photo, isLoggedInUserLikePhoto };
    })
  );
  return detailProfilePhotos;
};

export const getPhotoByPhotoId = async (photoId: string) => {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("photoId", "==", photoId)
    .get();
  const [photo]: Array<IPhoto> = result.docs.map((photo) => {
    const data = photo.data() as IPhoto;
    return {
      ...data,
      docId: photo.id
    };
  });
  return photo;
};

export const getPhotosByUserId = async (userId: string) => {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", userId)
    .get();
  const photos: Array<IPhoto> = result.docs.map((photo) => {
    const data = photo.data() as IPhoto;
    return {
      ...data,
      docId: photo.id
    };
  });
  return photos;
};
