"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class UserModel {
    constructor() {
        this.users = [];
    }
    // Get all users
    findAll() {
        return this.users;
    }
    findById(id) {
        const foundUser = this.users.find((user) => user.id === id);
        if (!foundUser)
            return undefined;
        return foundUser;
    }
    // Get user by username
    findByUsername(username) {
        const user = this.users.find((user) => user.username === username);
        if (user) {
            return user;
        }
        return undefined;
    }
    // Create user
    createUser(newUser) {
        const user = Object.assign({ id: (0, uuid_1.v4)() }, newUser);
        this.users.push(user);
        return user;
    }
    // Update user
    editUser(id, newData) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1)
            return undefined;
        const updatedUser = Object.assign(Object.assign({}, this.users[index]), newData);
        this.users[index] = updatedUser;
        return updatedUser;
    }
    // Delete user
    deleteUser(id) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1)
            return false;
        this.users.splice(index, 1);
        return true;
    }
}
exports.default = new UserModel();
