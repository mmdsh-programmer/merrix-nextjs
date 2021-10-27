import axios from "axios"
class Users {
    constructor() {
        this.service = axios.create({});
    }
    create(user) {

    }

    read() {
        return this.service.get("/api/users")
    }

    update() {

    }

    delete() {

    }

}

const users = new Users();
export default users;