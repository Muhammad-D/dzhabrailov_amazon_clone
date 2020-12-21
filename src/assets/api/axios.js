import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:5001/dzhabrailov--clone/us-central1/api",
  //"https://us-central1-dzhabrailov--clone.cloudfunctions.net/api",
});

export default instance;
