export const ROUTES = {
  DASHBOARD: "/",
  LOGIN: "/login",
  SIGN_UP: "/sign_up",
  PROFILE: "p/:username",
  NOT_FOUND: "/not_found"
};

export const SCREENSHOT_SLIDE = [
  "/images/icons/screenshot1-2x.png",
  "/images/icons/screenshot2-2x.png",
  "/images/icons/screenshot3-2x.png",
  "/images/icons/screenshot4-2x.png"
];

export const initialUser = {
  docId: "",
  userId: "",
  username: "",
  fullName: "",
  emailAddress: "",
  following: [],
  followers: [],
  dateCreated: 0
};
