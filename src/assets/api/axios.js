import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://us-central1-dzhabrailov--clone.cloudfunctions.net/api",
  //"http://localhost:5001/dzhabrailov--clone/us-central1/api",
});

export default instance;
