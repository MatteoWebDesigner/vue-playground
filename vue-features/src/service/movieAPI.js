import axios from "axios";

function buyMovieAPI(id, count) {
  return axios.post("https://my-json-server.typicode.com/typicode/demo/posts", {
    id,
    count
  });
}

export { buyMovieAPI };
