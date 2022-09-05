export class CustomCheckBoxModel {
  icon?: String;
  rounded?: boolean = false;
  color?: String;
  colorHex?: String;
  colorInside?: String;
  styleCheckBox: string;
  AriaWidth: number;
  constructor(styleCheckBox?: string, AriaWidth?: number, icon?: String, rounded?: boolean, color?: String, colorHex?: String, colorInside?: String) {
    this.icon = icon;
    this.rounded = rounded;
    this.color = color;
    this.colorHex = colorHex;
    this.colorInside = colorInside;
    this.styleCheckBox = styleCheckBox;
    this.AriaWidth = AriaWidth;
  }
}