export type InputType = "text" | "search" | "email" | "password" | "number" | "submit" | "tel";
export default class InputField {
    private input;
    constructor(type: InputType, value: string | number, id: string, classNames: string[]);
    getElement(): HTMLInputElement;
}
//# sourceMappingURL=InputField.d.ts.map