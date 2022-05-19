//Fake user information to check login functionality
const fakeUser = {
  username: "Nicolas",
  loggedIn: false,
};
//Fake video database to check view/edit page funcionality
const videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 1,
    id: 0,
  },
  {
    title: "Second Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 1,
  },
  {
    title: "Third Video",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
];
//Renders Home page
export const trending = (req, res) => {
  res.render("home", { pageTitle: "Home", fakeUser, videos });
};
//Renders View page
export const view = (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  const video = videos[id];
  res.render("view", { pageTitle: `Viewing ${video.title}`, fakeUser, video });
};
//Renders the Edit page
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id];
  res.render("edit", { pageTitle: `Editing ${video.title}`, fakeUser, video });
};
//Handles posting of edited information
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body; //req.body : Javascript representation of value in the form
  videos[id].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Uploading Video", fakeUser });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
