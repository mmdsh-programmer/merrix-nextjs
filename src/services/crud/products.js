import axios from "axios";
const baseURL = "https://admin.merrix.com/wp-json";
let config = {
  method: "get",
  url: "https://admin.merrix.com/wp-json",
  headers: {
    Authorization:
      "Basic Y2tfY2JhYmE5Mzk2YTliNWUxMTE2OTcwZmRjOTgxMjc2YWZlNWQ0MjQ1NDpjc183NTcxZDYzMjFlNTMxZTM4NWQwOWZkOTg4ZTUzMDkzNDlhNWE4OTNk",
  },
};

class Products {
  constructor() {
    this.service = axios.create({});
  }
  read(endpoint) {
    return this.service.get(`${baseURL}${endpoint}`, config);
  }
}

const product = new Products();
export default product;