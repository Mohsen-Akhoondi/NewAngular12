export class TreeModel {
    Owner: any;
    GetChildren: Function;
    GetRoots: Function;
    constructor() {
        this.Owner = null;
        this.GetChildren = null;
        this.GetRoots = null;
    }
}