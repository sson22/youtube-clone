import Video from "../models/Video";

/* Call back
export const home = async (req, res) => {
  console.log("start");
  Video.find({}, (error, videos) => {
    return res.render("home", { pageTitle: "Home", videos });
  });
  console.log("finished");
};
*/

//Renders Home page
export const home = async (req, res) => {
  //Use async and await, try-catch for the error
  //await only works inside of the async function
  const videos = await Video.find({}).sort({ createdAt: "desc" }); //await makes program to wait until this line finishes before executing the next line
  return res.render("home", { pageTitle: "Home", videos });
};
//Renders View page
export const view = async (req, res) => {
  // const id = req.params.id;
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("view", { pageTitle: video.title, video });
};
//Renders the Edit page
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};
//Handles posting of edited information
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

//Renders Upload page
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Uploading Video" });
};
//Handle Upload
export const postUpload = async (req, res) => {
  //Recieve the information sent from upload page
  const { title, description, hashtags } = req.body;

  /*
  //Create a video object using the information recieved
  const video = new Video({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  //Send the created object to db and save it
  await video.save();
  */
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Uploading Video",
      errorMessage: error._message,
    });
  }
};
//Delete Video
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
