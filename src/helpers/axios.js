import axios from "axios";

// backend local
// const protocol = "http";
// const host = "192.168.29.121";
// const port = "9099";

// local
const protocol = "http";
const host = "localhost";
const port = "5000";

// live
// const protocol = "https";
// const host = "api.jb-motors.rejoicehub.com";
// const port = "";

const trailUrl = "api/v1";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}/${trailUrl}/`;

const Axios = axios.create({
  baseURL: hostUrl,
  headers: {
    Authorization: localStorage.getItem("token")
      ? `Bearer ${JSON.parse(localStorage?.getItem("token"))}`
      : "",
  },
});

export default Axios;
