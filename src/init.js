import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;
const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${PORT}`);
//Listens the port and handle the request
app.listen(PORT, handleListening);
