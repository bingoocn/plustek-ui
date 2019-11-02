import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  // 转换附件大小显示单位
  getFileSize(fileByte:any) {
    var fileSizeByte = fileByte;
    var fileSizeMsg = "";
    if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
    else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
    else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    else fileSizeMsg = "文件超过1TB";
    return fileSizeMsg;
  }
  // 校验是否分配相应底部菜单
  checkMenu(menu) {
    return new Promise((resolve, reject) => {
      const arr:any = [];
      for(let i=0; i<menu.length; i++) {
        if(menu[i].superiorMenuType == '01') {
          arr.push(menu[i]);
        }
      }
      resolve(arr);
    }) 
  }
  // 通用数组转树的的方法
  forma2Tree(json: any, pId: any, Id: any) {
    let pid = pId;
    let id = Id;
    let _arr = [];
    let _obj = {};
    if (!Array.isArray(json)) {
      return _arr;
    }
    json.forEach(x => {
      delete x.children;
    });
    json.forEach(x => {
      _obj[x[id]] = x;
    });
    json.forEach(x => {
      let parent = _obj[x[pid]];
      if (parent) {
        (parent.children || (parent.children = [])).push(x);
      } else {
        _arr.push(x);
      }
    });
    return _arr;

  }
}
