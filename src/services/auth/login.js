import axios from "axios";
const baseURL = "https://merrix.com/wp-json";
let config = {
    method: "post",
    url: "https://merrix.com/wp-json/custom-plugin/login",
    headers: {
        'Cookie': 'wordpress_logged_in_e02a49bf4ebb8bf91082758355b80528=Mohammadshakeri%7C1626669639%7ClajihUws5dIIWQkksKPnMqr6kKZO6hJNhLsfhIn0Tup%7C5118f3227b7a91d5307395cfd870a2ca95491900dd4c5f8b31b29e8a96292b60'
    }
};

class Signin {
    constructor() {
        this.service = axios.create({});
    }
    check(data, endpoint) {
        return this.service.post(`${baseURL}${endpoint}`, data, config);
    }
}

const login = new Signin();
export default login;