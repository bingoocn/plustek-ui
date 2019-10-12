import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly baseIp = 'http://a.itying.com/api';

  constructor(
    private http: HttpClient,
    public  toastController: ToastController,
    public  alertController: AlertController,
    public  loadingController: LoadingController
  ) { }

  /**
   * Get 网络请求
   * @param api 
   * @param params 
   */
  public getRequest(api: string, params: any) {
    
  }
}
