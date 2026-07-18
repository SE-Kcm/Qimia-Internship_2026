import { type User } from "../models/User.js";
import type { AuthType } from "../models/AuthSchema.js";
import type { UserInformation } from "../models/UserInformation.js";
export default class AuthService {
    users: User[];
    nextId: number;
    constructor();
    init(): Promise<void>;
    login(credentials: AuthType): boolean;
    signUpRequest(credentials: AuthType): boolean;
    createAccount(credentials: AuthType): number;
    saveUserInformation(userId: number, newUserInfo: UserInformation): void;
}
//# sourceMappingURL=AuthService.d.ts.map