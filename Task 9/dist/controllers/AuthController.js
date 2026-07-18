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
                    for (const error of result.error.issues) {
                        this.ui.addErrorMessage("email", error.path[0], error.message);
                        console.log(error.message);
                    }
                    return;
                }
                else {
                    this.ui.removeErrorMessage("email", "specific");
                }
                if (this.service.login(result.data)) {
                    console.log("Found user");
                    this.ui.removeErrorMessage("email", "general");
                    //TODO
                }
                else {
                    this.ui.addErrorMessage("email", "general", "Girdiğiniz bilgiler hatalı. Lütfen tekrar deneyiniz.");
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
                    for (const error of result.error.issues) {
                        this.ui.addErrorMessage("phone", error.path[0], error.message);
                        console.log(error.message);
                    }
                    return;
                }
                else {
                    this.ui.removeErrorMessage("phone", "specific");
                }
                if (this.service.login(result.data)) {
                    console.log("Found user");
                    this.ui.removeErrorMessage("phone", "general");
                    //TODO
                }
                else {
                    this.ui.addErrorMessage("phone", "general", "Girdiğiniz bilgiler hatalı. Lütfen tekrar deneyiniz.");
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
                    for (const error of result.error.issues) {
                        this.ui.addErrorMessage("email", error.path[0], error.message);
                        console.log(error.message);
                    }
                    return;
                }
                else {
                    this.ui.removeErrorMessage("email", "specific");
                }
                if (this.service.signUpRequest(result.data)) {
                    this.ui.removeErrorMessage("email", "general");
                    const userId = this.service.createAccount(result.data);
                    if (userId != -1) {
                        this.ui.showSecondPage();
                        const signUpInformationForm = document.getElementById("signUpInformationForm");
                        if (signUpInformationForm) {
                            this.registerForm(signUpInformationForm, (formData) => {
                                const firstName = formData.get("firstName");
                                const lastName = formData.get("lastName");
                                // const countryCode = formData.get("countryCode") as string;
                                // const phoneNumber = formData.get("phoneNumber") as string;
                                const birthday = formData.get("birthday");
                                const country = formData.get("country");
                                const city = formData.get("city");
                                const address = formData.get("address");
                                const newUserInfo = { firstName, lastName, birthday, country, city, address };
                                this.service.saveUserInformation(userId, newUserInfo);
                            });
                        }
                    }
                }
                else {
                    this.ui.addErrorMessage("email", "general", "Girdiğiniz bilgiler hatalı. Lütfen tekrar deneyiniz.");
                }
            });
        } //signUpEmailForm does not have to exists because AuthController is being used for Login.html and signUp.html --> don't throw Error
        const signUpPhoneForm = document.getElementById("signUpPhoneForm");
        if (signUpPhoneForm) {
            this.registerForm(signUpPhoneForm, (formData) => {
                const countryCode = formData.get("countryCode");
                const phoneNumber = formData.get("phoneNumber");
                const password = formData.get("password");
                // console.log({ countryCode, phone, password });
                const result = AuthSchema.safeParse({ countryCode, phoneNumber, password });
                if (!result.success) {
                    for (const error of result.error.issues) {
                        this.ui.addErrorMessage("phone", error.path[0], error.message);
                        console.log(error.message);
                    }
                    return;
                }
                else {
                    this.ui.removeErrorMessage("phone", "specific");
                }
                if (this.service.signUpRequest(result.data)) {
                    this.ui.removeErrorMessage("phone", "general");
                    const userId = this.service.createAccount(result.data);
                    if (userId != -1) {
                        this.ui.showSecondPage();
                        const signUpInformationForm = document.getElementById("signUpInformationForm");
                        if (signUpInformationForm) {
                            this.registerForm(signUpInformationForm, (formData) => {
                                const firstName = formData.get("firstName");
                                const lastName = formData.get("lastName");
                                // const countryCode = formData.get("countryCode") as string;
                                // const phoneNumber = formData.get("phoneNumber") as string;
                                const birthday = formData.get("birthday");
                                const country = formData.get("country");
                                const city = formData.get("city");
                                const address = formData.get("address");
                                const newUserInfo = { firstName, lastName, birthday, country, city, address };
                                this.service.saveUserInformation(userId, newUserInfo);
                            });
                        }
                    }
                }
                else {
                    this.ui.addErrorMessage("phone", "general", "Girdiğiniz bilgiler hatalı. Lütfen tekrar deneyiniz.");
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