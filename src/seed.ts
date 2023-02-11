export function seedDatabase(firebase: any) {
  const users = [
    {
      userId: "1",
      username: "tiendat",
      fullName: "Tiến Đạt",
      emailAddress: "karlhadwen@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now()
    },
    {
      userId: "2",
      username: "linhlinh",
      fullName: "Linh Linh",
      emailAddress: "raphael@sanzio.com",
      following: [],
      followers: ["9EJ0nvS7zyV9ATvtJQnYQQyBoP83"],
      dateCreated: Date.now()
    },
    {
      userId: "3",
      username: "dali",
      fullName: "Salvador Dalí",
      emailAddress: "salvador@dali.com",
      following: [],
      followers: ["9EJ0nvS7zyV9ATvtJQnYQQyBoP83"],
      dateCreated: Date.now()
    },
    {
      userId: "4",
      username: "tuananh",
      fullName: "Tuấn Anh",
      emailAddress: "george@orwell.com",
      following: [],
      followers: ["9EJ0nvS7zyV9ATvtJQnYQQyBoP83"],
      dateCreated: Date.now()
    }
  ];
  // eslint-disable-next-line prefer-const, no-plusplus
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection("users").add(users[k]);
  }

  // eslint-disable-next-line prefer-const, no-plusplus
  for (let i = 1; i <= 5; ++i) {
    console.log("render");
    firebase
      .firestore()
      .collection("photos")
      .add({
        photoId: i,
        userId: "2",
        imageSrc: `/images/users/linhlinh/${i}.jpeg`,
        caption: "I had amazing experiences here.",
        likes: [],
        comments: [
          {
            displayName: "tuananh",
            comment: "Great!"
          },
          {
            displayName: "tiendat",
            comment: "Looking great!"
          }
        ],
        userLatitude: "40.7128°",
        userLongitude: "74.0060°",
        dateCreated: Date.now()
      });
  }
}
