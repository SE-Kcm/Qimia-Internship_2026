import AuthService from "../services/AuthService.js";
import UI from "./LoginUI.js";
export default class AuthController {
    ui: UI;
    service: AuthService;
    constructor();
    init(): Promise<void>;
    registerForm(form: HTMLFormElement, handler: (formData: FormData) => void): void;
}
//# sourceMappingURL=AuthController.d.ts.map