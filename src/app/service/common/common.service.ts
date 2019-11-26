import { Injectable } from '@angular/core';
import {EventEmitter} from 'eventemitter3';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public eventEmit: any;

  constructor() { 
    this.eventEmit = new EventEmitter();
  }

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
  //计算数组元素重复出现次数
  countNum(arr,element){
    var count=0;
    for(var i=0;i<arr.length;i++){
      if(arr[i]==element)
      count++;
    }
    return count;
  }
  convertToChinaNum(num) {
      var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
      var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千','万', '十', '百', '千','亿');//可继续追加更高位转换值
      if(!num || isNaN(num)){
          return "零";
      }
      var english = num.toString().split("")
      var result = "";
      for (var i = 0; i < english.length; i++) {
          var des_i = english.length - 1 - i;//倒序排列设值
          result = arr2[i] + result;
          var arr1_index = english[des_i];
          result = arr1[arr1_index] + result;
      }
      result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');
      result = result.replace(/零+/g, '零');
      result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');
      result = result.replace(/亿万/g, '亿');
      result = result.replace(/零+$/, '')
      result = result.replace(/^一十/g, '十');
      return result;
  }
}
