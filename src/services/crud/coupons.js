import axios from "axios";
const baseURL = "https://admin.merrix.com/wp-json";
let config = {
    method: "get",
    url: "https://admin.merrix.com/wp-json/wc/v3/coupons",
    headers: {
        Authorization:
            "Basic Y2tfY2JhYmE5Mzk2YTliNWUxMTE2OTcwZmRjOTgxMjc2YWZlNWQ0MjQ1NDpjc183NTcxZDYzMjFlNTMxZTM4NWQwOWZkOTg4ZTUzMDkzNDlhNWE4OTNk",
    },
};

class Coupons {
    constructor() {
        this.service = axios.create({});
    }
    create() {

    }

    read(endpoint) {
        return this.service.get(`${baseURL}${endpoint}`, config);
    }

    update() {

    }

    delete() {

    }

}

const coupon = new Coupons();
export default coupon;