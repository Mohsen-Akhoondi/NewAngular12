export class RadioBoxModel {
    Name: string;
    Value: any;
    Checked: boolean;
    ElementName: string;
    constructor(_Name: string, _Value: any, _Checked: boolean, _ElementName: string) {
        this.Name = _Name;
        this.Value = _Value;
        this.Checked = _Checked;
        this.ElementName = _ElementName;
    }
}
