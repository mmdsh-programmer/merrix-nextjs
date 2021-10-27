import axios from "axios";
const baseURL = "https://admin.merrix.com/wp-json";
let config = {
    method: "post",
    url: "https://admin.merrix.com/wp-json/wc/v3/orders",
    headers: {
        Authorization:
            "Basic Y2tfY2JhYmE5Mzk2YTliNWUxMTE2OTcwZmRjOTgxMjc2YWZlNWQ0MjQ1NDpjc183NTcxZDYzMjFlNTMxZTM4NWQwOWZkOTg4ZTUzMDkzNDlhNWE4OTNk",
    },
};

class Orders {
    constructor() {
        this.service = axios.create({});
    }
    create(data, endpoint) {
        return this.service.post(`${baseURL}${endpoint}`, data, config);
    }
}

const order = new Orders();
export default order;