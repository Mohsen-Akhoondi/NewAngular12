import { Injectable } from '@angular/core';

@Injectable()
export class CommonServices {
  FlatlistToTree(list, IDField, ParentIDField) {
    const map = {}, roots = [];
    let node, i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i][IDField]] = i;
      list[i].children = [];
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node[ParentIDField] && node[ParentIDField] !== node[IDField]) {
        list[map[node[ParentIDField]]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }
  PadLeft(str: string, len: number, ch = '0'): string {
    len = len - str.length + 1;
    return len > 0 ?
      new Array(len).join(ch) + str : str;
  }
  PadRight(str: string, len: number, ch = '0'): string {
    len = len - str.length + 1;
    return len > 0 ?
      str + new Array(len).join(ch) : str;
  }
  _arrayBufferToBase64(buffer) {
    let binary = '';
    if (buffer) {
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    } else {
      return '';
    }
  }
  getBase64FromFile(AFile) {
    const reader = new FileReader();
    reader.readAsDataURL(AFile);
    reader.onload = () => {
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('getBase64FromFile Error: ', error);
    };
  }
  ConvertToASPDateTime(date: string): any {
    if (date.toString().includes('/Date')) {
      const re = /-?\d+/;
      const m = re.exec(date);
      return new Date(parseInt(m[0], 10));
    } else {
      return date;
    }
  }
  downloadFile(AFileViewModel: any) {
    const byteCharacters = atob(AFileViewModel.FileBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const mimeType = AFileViewModel.Type;
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });
    const FileSaver = require('file-saver');
    const file = new File([blob], AFileViewModel.FileName, { type: mimeType });
    FileSaver.saveAs(file);

  }
  GroupBy(InputList: Array<any>, Field: string): Array<any> {
    const groupedObj = InputList.reduce((prev, cur) => {
      if (!prev[cur[Field]]) {
        prev[cur[Field]] = [cur];
      } else {
        prev[cur[Field]].push(cur);
      }
      return prev;
    }, {});
    return Object.keys(groupedObj).map(key => ({ key, List: groupedObj[key] }));
  }
}
