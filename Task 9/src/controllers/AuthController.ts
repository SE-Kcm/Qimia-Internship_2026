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
        try {
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
                        for (const error of result.error.issues) {
                            this.ui.addErrorMessage("email", error.path[0] as string, error.message);
                            console.log(error.message);
                        }
                        return;
                    } else {
                        this.ui.removeErrorMessage("email", "specific");
                    }
                    if (this.service.login(result.data)) {
                        console.log("Found user");
                        this.ui.removeErrorMessage("email", "general");
                        //TODO
                    } else {
                        this.ui.addErrorMessage("email", "general", "Girdiğiniz bilgiler hatalı. Lütfen tekrar deneyiniz.");
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
                        for (const error of result.error.issues) {
                            this.ui.addErrorMessage("phone", error.path[0] as string, error.message);

                            console.log(error.message);
                        }
                        return;
                    } else {
                        this.ui.removeErrorMessage("phone", "specific");
                    }
                    if (this.service.login(result.data)) {
                        console.log("Found user");
                        this.ui.removeErrorMessage("phone", "general");
                        //TODO
                    } else {
                        this.ui.addErrorMessage("phone", "general", "Girdiğiniz bilgiler hatalı. Lütfen tekrar deneyiniz.");
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
                        for (const error of result.error.issues) {
                            this.ui.addErrorMessage("email", error.path[0] as string, error.message);

                            console.log(error.message);
                        }
                        return;
                    } else {
                        this.ui.removeErrorMessage("email", "specific");
                    }
                    if (this.service.signUpRequest(result.data)) {
                        this.ui.removeErrorMessage("email", "general");
                        const userId = this.service.createAccount(result.data);
                        if (userId != -1) {
                            this.ui.showSecondPage();
                            const signUpInformationForm = document.getElementById("signUpInformationForm") as HTMLFormElement;
                            if (signUpInformationForm) {
                                this.registerForm(signUpInformationForm, (formData) => {
                                    const firstName = formData.get("firstName") as string;
                                    const lastName = formData.get("lastName") as string;
                                    // const countryCode = formData.get("countryCode") as string;
                                    // const phoneNumber = formData.get("phoneNumber") as string;
                                    const birthday = formData.get("birthday") as string;
                                    const country = formData.get("country") as string;
                                    const city = formData.get("city") as string;
                                    const address = formData.get("address") as string;
                                    const newUserInfo = { firstName, lastName, birthday, country, city, address };
                                    this.service.saveUserInformation(userId, newUserInfo);
                                });
                            }
                        }
                    } else {
                        this.ui.addErrorMessage("email", "general", "Bu e-posta adresiyle zaten bir hesap bulunmaktadır.");
                    }
                });
            } //signUpEmailForm does not have to exists because AuthController is being used for Login.html and signUp.html --> don't throw Error

            const signUpPhoneForm = document.getElementById("signUpPhoneForm") as HTMLFormElement;
            if (signUpPhoneForm) {
                this.registerForm(signUpPhoneForm, (formData) => {
                    const countryCode = formData.get("countryCode") as string;
                    const phoneNumber = formData.get("phoneNumber") as string;
                    const password = formData.get("password") as string;
                    // console.log({ countryCode, phone, password });
                    const result = AuthSchema.safeParse({ countryCode, phoneNumber, password });
                    if (!result.success) {
                        for (const error of result.error.issues) {
                            this.ui.addErrorMessage("phone", error.path[0] as string, error.message);

                            console.log(error.message);
                        }
                        return;
                    } else {
                        this.ui.removeErrorMessage("phone", "specific");
                    }
                    if (this.service.signUpRequest(result.data)) {
                        this.ui.removeErrorMessage("phone", "general");
                        const userId = this.service.createAccount(result.data);
                        if (userId != -1) {
                            this.ui.showSecondPage();
                            const signUpInformationForm = document.getElementById("signUpInformationForm") as HTMLFormElement;
                            if (signUpInformationForm) {
                                this.registerForm(signUpInformationForm, (formData) => {
                                    const firstName = formData.get("firstName") as string;
                                    const lastName = formData.get("lastName") as string;
                                    // const countryCode = formData.get("countryCode") as string;
                                    // const phoneNumber = formData.get("phoneNumber") as string;
                                    const birthday = formData.get("birthday") as string;
                                    const country = formData.get("country") as string;
                                    const city = formData.get("city") as string;
                                    const address = formData.get("address") as string;
                                    const newUserInfo = { firstName, lastName, birthday, country, city, address };
                                    this.service.saveUserInformation(userId, newUserInfo);
                                });
                            }
                        }
                    } else {
                        this.ui.addErrorMessage("phone", "general", "Bu telefon numarasıyla zaten bir hesap bulunmaktadır.");
                    }
                });
            } //signUpPhoneForm does not have to exists because AuthController is being used for Login.html and signUp.html --> don't throw Error
        } catch (error) {
            alert(error);
        }
    }

    registerForm(form: HTMLFormElement, handler: (formData: FormData) => void) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            handler(formData);
        });
    }
}
