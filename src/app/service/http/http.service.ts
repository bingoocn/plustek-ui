import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // readonly baseIp = 'http://10.100.240.200:10008';
  readonly baseIp = 'http://10.100.240.163:10008';
  readonly portalIp = 'http://10.100.240.163:10002';
  // 请求头
  public header = new HttpHeaders({
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded'
  })

  constructor(
    private http: HttpClient,
    public  toastController: ToastController,
    public  alertController: AlertController,
    public  loadingController: LoadingController
  ) { }

  /**
   * Get 网络请求
   * @param apiName 
   * @param params 
   */
  public getRequest(apiName: string, params?: {[key: string]: any}):any {
    let url = this.baseIp + apiName;
    return new Promise((resolve, reject) => {
      this.http.get(url, { params: params }).subscribe(response => {
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  }

  /**
   * Post 网络请求
   * @param apiName 
   * @param params 
   */
  public postRequest(apiName: string, body: any | null, params?: {[key: string]: any}):any {
    let url = this.baseIp + apiName;
    body = JSON.stringify(body);
    return new Promise((resolve, reject) => {
      this.http.post(url, body, { params: params }).subscribe(response => {
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  }

  /**
   * Put 网络请求
   * @param apiName
   * @param params
   */
  public putRequest(apiName: string, params?: {[key: string]: any}) {
    let url = this.baseIp + apiName;
    let body = JSON.stringify(params);
    return new Promise((resolve, reject) => {
      this.http.put(url, body).subscribe(response => {
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  }

  /**
   * delete 网络请求
   * @param apiName
   * @param params
   */
  public delRequest(apiName: string, params?: {[key: string]: any}) {
    let url = this.baseIp + apiName;
    return new Promise((resolve, reject) => {
      this.http.delete(url, { params: params }).subscribe(response => {
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  }

  /**
   * 登录 网络请求
   * @param apiName
   * @param params
   */
  public loginRequest(apiName: string, params?: {[key: string]: any}) {
    let url = this.portalIp + apiName;
    let body = null;
    return new Promise((resolve, reject) => {
      this.http.post(url, body, { params: params }).subscribe(response => {
        resolve(response);
      }, error => {
        reject(error);
      })
    })
  }

  /**
   * 请求失败处理
   * @param content
   */
  public requestFailed(error:any) {
    let msg = "";
    if(!error && error.response) return false; 
    switch (error.response.status) {
      case 400:
        msg = '错误请求';
      case 401:
        msg = '网页已过期，请重新登录';
      case 403:
        msg = '拒绝访问';
      case 404:
        msg = '请求错误，未找到该资源';
      case 405:
        msg = '请求方法未允许';
      case 408:
        msg = '请求超时';
      case 500:
        msg = '服务端出错';
      case 501:
        msg = '网络未实现';
      case 502:
        msg = '网络错误';
      case 503:
        msg = '服务不可用';
      case 504:
        msg = '网络超时';
      case 505:
        msg = 'http版本不支持该请求';
      default:
        msg = `连接错误${error.response.status}`
    }
    return msg;
  }

  /**
   * 统一调用此方法显示loading
   * @param content 显示内容
   */
  async presentLoading(content: string) {
    const loading = await this.loadingController.create({
      message: content,
      duration: 5000,
      translucent: true
    })
    await loading.present();
  }
  /**
   * 关闭loading
   */
  async hideLoading() {
    await this.loadingController.dismiss();
  }
  /**
   * 统一调用此方法显示toast
   * @param message 显示信息
   * @param position 显示位置
   * @param color toast主题颜色
   */
  async presentToast(
    message: string, 
    position?: 'top'|'bottom'|'middle', 
    color?: string
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color || 'dark',
      position: position || 'middle'
    })
    toast.present();
  }

  /**
   * 统一调用此方法显示alert
   * @param header
   * @param subHeader
   * @param message
   */
  async presentAlert(header: string, subHeader: string, message: string){
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['ok']
    })
    await alert.present();
  }
}
