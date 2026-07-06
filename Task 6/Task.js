export default class Task {
    constructor(name, id) {
        this._name = name;
        this._id = id;
    }

    getName() {
        return this._name;
    }

    getId() {
        return this._id;
    }
}
