import axios from "axios";
import settings from "../helpers/settings";

const bimetri = axios.create({
  baseURL: settings.apiURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default bimetri;
