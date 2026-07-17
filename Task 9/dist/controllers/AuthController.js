import { AuthSchema } from "../models/AuthSchema.js";
import { EmailAuthSchema } from "../models/EmailAuthSchema.js";
import { PhoneAuthSchema } from "../models/PhoneAuthSchema.js";
import AuthService from "../services/AuthService.js";
import UI from "./LoginUI.js";
// import * as z from "zod";
//import { z } from "zod";
export default class AuthController {
    ui;
    service;
    constructor() {
        this.ui = new UI();
        this.service = new AuthService();
    }
    async init() {
        await this.service.init();
        const emailTab = document.getElementById("emailTab");
        const phoneTab = document.getElementById("phoneTab");
        if (emailTab) {
            emailTab.addEventListener("click", () => {
                this.ui.openLoginOptions("E-Mail", emailTab);
            });
        }
        else {
            throw new Error("E-Mail-Tab not found");
        }
        if (phoneTab) {
            phoneTab.addEventListener("click", () => {
                this.ui.openLoginOptions("Phone", phoneTab);
            });
        }
        else {
            throw new Error("Phone-Tab not found");
        }
        const LoginEmailForm = document.getElementById("LoginEmailForm");
        if (LoginEmailForm) {
            this.registerForm(LoginEmailForm, (formData) => {
                const email = formData.get("email");
                const password = formData.get("password");
                const result = AuthSchema.safeParse({ email, password });
                if (!result.success) {
                    alert(result.error);
                    return;
                }
                if (this.service.login(result.data)) {
                    console.log("Found user");
                    //TODO
                }
                else {
                    alert("Invalid Credentials!");
                }
            });
        } //LoginEmailForm does not have to exists because AuthController is being used for Login.html and signUp.html --> don't throw Error
        const LoginPhoneForm = document.getElementById("LoginPhoneForm");
        if (LoginPhoneForm) {
            this.registerForm(LoginPhoneForm, (formData) => {
                const countryCode = formData.get("countryCode");
                const phoneNumber = formData.get("phoneNumber");
                const password = formData.get("password");
                const result = AuthSchema.safeParse({ countryCode, phoneNumber, password });
                if (!result.success) {
                    alert(result.error);
                    return;
                }
                if (this.service.login(result.data)) {
                    console.log("Found user");
                    //TODO
                }
                else {
                    alert("Invalid Credentials!");
                }
            });
        } //LoginPhoneForm does not have to exists because AuthController is being used for Login.html and signUp.html --> don't throw Error
        const signUpEmailForm = document.getElementById("signUpEmailForm");
        if (signUpEmailForm) {
            this.registerForm(signUpEmailForm, (formData) => {
                const email = formData.get("email");
                const password = formData.get("password");
                const result = AuthSchema.safeParse({ email, password });
                if (!result.success) {
                    alert(result.error);
                    return;
                }
                if (this.service.signUpRequest(result.data)) {
                    this.service.createAccount(result.data);
                }
                else {
                    console.log("Invalid Credentials!");
                }
            });
        } //signUpEmailForm does not have to exists because AuthController is being used for Login.html and signUp.html --> don't throw Error
        const signUpPhoneForm = document.getElementById("signUpPhoneForm");
        if (signUpPhoneForm) {
            this.registerForm(signUpPhoneForm, (formData) => {
                const countryCode = formData.get("countryCode");
                const phone = formData.get("phoneNumber");
                const password = formData.get("password");
                const result = AuthSchema.safeParse({ countryCode, phone, password });
                if (!result.success) {
                    alert(result.error);
                    return;
                }
                if (this.service.signUpRequest(result.data)) {
                    this.service.createAccount(result.data);
                }
                else {
                    console.log("Invalid Credentials!");
                }
            });
        } //signUpPhoneForm does not have to exists because AuthController is being used for Login.html and signUp.html --> don't throw Error
    }
    registerForm(form, handler) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            handler(formData);
        });
    }
}
//# sourceMappingURL=AuthController.js.map