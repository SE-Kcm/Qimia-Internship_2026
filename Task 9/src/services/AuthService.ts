import { EmailAuthSchema, type EmailAuth } from "../models/EmailAuthSchema.js";
import { UserSchema, type User } from "../models/User.js";
import { z } from "zod";
//import { z } from "https://esm.sh";
import type { PhoneAuth } from "../models/PhoneAuthSchema.js";
import type { AuthType } from "../models/AuthSchema.js";

export default class AuthService {
    users: User[];
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
        // if (
        //     typeof userData.id != "number" ||
        //     typeof userData.firstName != "string" ||
        //     typeof userData.lastName != "string" ||
        //     typeof userData.email != "string" ||
        //     typeof userData.password != "string" ||
        //     typeof userData.countryCode != "string" ||
        //     typeof userData.phoneNumber != "string"
        // ) {
        //     throw new Error("Invalid User data!");
        // }
        const UsersSchema = z.array(UserSchema);
        const results = UsersSchema.safeParse(userData);
        if (!results.success) {
            throw new Error("Validation of User data failed!");
        }
        this.users = results.data;
        const lastUser = this.users[this.users.length - 1];
        if (lastUser) {
            this.nextId = lastUser.id + 1;
        }
    }

    login(credentials: AuthType): boolean {
        console.log("Credentials:", credentials);
        console.log("Users:", this.users);
        for (const user of this.users) {
            if (
                (("email" in credentials && "email" in user && user.email === credentials.email) ||
                    ("phoneNumber" in credentials && "phoneNumber" in user && user.phoneNumber === credentials.phoneNumber && user.countryCode == credentials.countryCode)) &&
                user.password === credentials.password
            ) {
                return true;
            }
        }
        return false;
    }
    signUpRequest(credentials: AuthType): boolean {
        for (const user of this.users) {
            if ("email" in credentials) {
                if ("email" in user && user.email != credentials.email) {
                    return true;
                }
            } else if ("phoneNumber" in user && "phoneNumber" in credentials)
                if (user.countryCode != credentials.countryCode && user.phoneNumber != credentials.phoneNumber) {
                    return true;
                }
        }
        return false;
    }

    createAccount(credentials: AuthType) {
        let user: User;
        if ("email" in credentials) {
            user = {
                id: this.nextId,
                email: credentials.email,
                password: credentials.password,
            };
            this.nextId++;
            this.users.push(user);
        } else if ("phoneNumber" in credentials) {
            user = {
                id: this.nextId,
                countryCode: credentials.countryCode,
                phoneNumber: credentials.phoneNumber,
                password: credentials.password,
            };
            this.nextId++;
            this.users.push(user);
        }
        console.log("Credentials:", credentials);
        console.log("Users:", this.users);
    }
}
