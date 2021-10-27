import axios from "axios"
class Authentication {
    constructor() {
        this.service = axios.create({});
    }
    signin(data) {
        const { username, password } = data;
        return this.service.post("/auth/login", { userName: username, password: password })
    }

    signup(data) {
        const { name, username, password } = data;
        return this.service.post("/auth/register", { name: name, userName: username, password: password })
    }

}

const auth = new Authentication();
export default auth;