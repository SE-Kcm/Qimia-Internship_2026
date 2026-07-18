import { EmailAuthSchema } from "../models/EmailAuthSchema.js";
import { UserSchema } from "../models/User.js";
import { z } from "zod";
export default class AuthService {
    users;
    nextId = 1;
    constructor() {
        this.users = [];
    }
    async init() {
        const response = await fetch("../mocks/users.json");
        if (!response.ok) {
            throw new Error("Could not load users.");
        }
        const userData = await response.json();
        const UsersSchema = z.array(UserSchema);
        const results = UsersSchema.safeParse(userData);
        if (!results.success) {
            throw new Error("Validation of User data failed!");
        }
        const storedUsers = sessionStorage.getItem("users");
        if (storedUsers) {
            this.users = JSON.parse(storedUsers);
        }
        else {
            this.users = results.data;
            sessionStorage.setItem("users", JSON.stringify(this.users));
        }
        const lastUser = this.users[this.users.length - 1];
        if (lastUser) {
            this.nextId = lastUser.id + 1;
        }
    }
    login(credentials) {
        console.log("Credentials:", credentials);
        console.log("Users:", this.users);
        for (const user of this.users) {
            if ((("email" in credentials && "email" in user && user.email === credentials.email) ||
                ("phoneNumber" in credentials && "phoneNumber" in user && user.phoneNumber === credentials.phoneNumber && user.countryCode == credentials.countryCode)) &&
                user.password === credentials.password) {
                return true;
            }
        }
        return false;
    }
    signUpRequest(credentials) {
        for (const user of this.users) {
            if ("email" in credentials) {
                if ("email" in user && user.email == credentials.email) {
                    return false;
                }
            }
            else if ("phoneNumber" in user && "phoneNumber" in credentials)
                if (user.countryCode == credentials.countryCode && user.phoneNumber == credentials.phoneNumber) {
                    return false;
                }
        }
        return true;
    }
    createAccount(credentials) {
        let user;
        if ("email" in credentials) {
            user = {
                id: this.nextId,
                email: credentials.email,
                password: credentials.password,
            };
            this.nextId++;
            this.users.push(user);
            sessionStorage.setItem("users", JSON.stringify(this.users));
            console.log("Credentials:", credentials);
            console.log("Users:", this.users);
            return user.id;
        }
        else if ("phoneNumber" in credentials) {
            user = {
                id: this.nextId,
                countryCode: credentials.countryCode,
                phoneNumber: credentials.phoneNumber,
                password: credentials.password,
            };
            this.nextId++;
            this.users.push(user);
            sessionStorage.setItem("users", JSON.stringify(this.users));
            console.log("Credentials:", credentials);
            console.log("Users:", this.users);
            return user.id;
        }
        return -1;
    }
    saveUserInformation(userId, newUserInfo) {
        console.log("in SaveInformation");
        const user = this.users.find((user) => user.id == userId);
        if (user != undefined) {
            user.userInformation = newUserInfo;
            console.log(user);
            sessionStorage.setItem("users", JSON.stringify(this.users));
        }
    }
}
//# sourceMappingURL=AuthService.js.map