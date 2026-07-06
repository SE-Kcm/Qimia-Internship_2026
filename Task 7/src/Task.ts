export default class Task {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }

    getName(): string {
        return this.name;
    }

    getId(): number {
        return this.id;
    }
}
