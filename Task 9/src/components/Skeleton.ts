export default class Skeleton {
    // width: string;
    // height: string;
    // constructor(width: string, height: string) {
    //     this.width = width;
    //     this.height = height;
    // }

    create(width: string, height: string): HTMLDivElement {
        const skeleton = document.createElement("div");
        skeleton.classList.add("skeleton");
        skeleton.classList.add(width);
        skeleton.classList.add(height);

        return skeleton;
    }
}
