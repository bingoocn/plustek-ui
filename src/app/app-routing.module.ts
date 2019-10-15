import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // 底部导航模块
  { path: 'index', loadChildren: './index/index.module#IndexPageModule' },
  { path: 'notice', loadChildren: './notice/notice.module#NoticePageModule' },
  { path: 'workbench', loadChildren: './workbench/workbench.module#WorkbenchPageModule' },
  { path: 'mine', loadChildren: './mine/mine.module#MinePageModule' },
  // 系统登录注册
  { path: 'login', loadChildren: './login/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './login/register/register.module#RegisterPageModule' },
  // 具体业务模块
  { path: 'case', loadChildren: './pages/case/case.module#CasePageModule' },
  { path: 'internal-communication', loadChildren: './pages/internal-communication/internal-communication.module#InternalCommunicationPageModule' },
  { path: 'experience', loadChildren: './pages/experience/experience.module#ExperiencePageModule' },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
