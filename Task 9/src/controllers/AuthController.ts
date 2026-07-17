import { AuthSchema, type AuthType } from "../models/AuthSchema.js";
import { EmailAuthSchema, type EmailAuth } from "../models/EmailAuthSchema.js";
import { PhoneAuthSchema, type PhoneAuth } from "../models/PhoneAuthSchema.js";
import AuthService from "../services/AuthService.js";
import UI from "./LoginUI.js";
// import * as z from "zod";
//import { z } from "zod";

export default class AuthController {
    ui: UI;
    service: AuthService;

    constructor() {
        this.ui = new UI();
        this.service = new AuthService();
    }

    async init() {
        await this.service.init();

        const emailTab = document.getElementById("emailTab") as HTMLButtonElement;
        const phoneTab = document.getElementById("phoneTab") as HTMLButtonElement;

        if (emailTab) {
            emailTab.addEventListener("click", () => {
                this.ui.openLoginOptions("E-Mail", emailTab);
            });
        } else {
            throw new Error("E-Mail-Tab not found");
        }

        if (phoneTab) {
            phoneTab.addEventListener("click", () => {
                this.ui.openLoginOptions("Phone", phoneTab);
            });
        } else {
            throw new Error("Phone-Tab not found");
        }

        const LoginEmailForm = document.getElementById("LoginEmailForm") as HTMLFormElement;
        if (LoginEmailForm) {
            this.registerForm(LoginEmailForm, (formData) => {
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                const result = AuthSchema.safeParse({ email, password });
                if (!result.success) {
                    alert(result.error);
                    return;
                }
                if (this.service.login(result.data)) {
                    console.log("Found user");
                    //TODO
                } else {
                    alert("Invalid Credentials!");
                }
            });
        } //LoginEmailForm does not have to exists because AuthController is being used for Login.html and signUp.html --> don't throw Error

        const LoginPhoneForm = document.getElementById("LoginPhoneForm") as HTMLFormElement;
        if (LoginPhoneForm) {
            this.registerForm(LoginPhoneForm, (formData) => {
                const countryCode = formData.get("countryCode") as string;
                const phoneNumber = formData.get("phoneNumber") as string;
                const password = formData.get("password") as string;
                const result = AuthSchema.safeParse({ countryCode, phoneNumber, password });
                if (!result.success) {
                    alert(result.error);
                    return;
                }
                if (this.service.login(result.data)) {
                    console.log("Found user");
                    //TODO
                } else {
                    alert("Invalid Credentials!");
                }
            });
        } //LoginPhoneForm does not have to exists because AuthController is being used for Login.html and signUp.html --> don't throw Error
        const signUpEmailForm = document.getElementById("signUpEmailForm") as HTMLFormElement;
        if (signUpEmailForm) {
            this.registerForm(signUpEmailForm, (formData) => {
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                const result = AuthSchema.safeParse({ email, password });
                if (!result.success) {
                    alert(result.error);
                    return;
                }
                if (this.service.signUpRequest(result.data)) {
                    this.service.createAccount(result.data);
                } else {
                    console.log("Invalid Credentials!");
                }
            });
        } //signUpEmailForm does not have to exists because AuthController is being used for Login.html and signUp.html --> don't throw Error

        const signUpPhoneForm = document.getElementById("signUpPhoneForm") as HTMLFormElement;
        if (signUpPhoneForm) {
            this.registerForm(signUpPhoneForm, (formData) => {
                const countryCode = formData.get("countryCode") as string;
                const phone = formData.get("phoneNumber") as string;
                const password = formData.get("password") as string;
                const result = AuthSchema.safeParse({ countryCode, phone, password });
                if (!result.success) {
                    alert(result.error);
                    return;
                }
                if (this.service.signUpRequest(result.data)) {
                    this.service.createAccount(result.data);
                } else {
                    console.log("Invalid Credentials!");
                }
            });
        } //signUpPhoneForm does not have to exists because AuthController is being used for Login.html and signUp.html --> don't throw Error
    }

    registerForm(form: HTMLFormElement, handler: (formData: FormData) => void) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            handler(formData);
        });
    }
}
