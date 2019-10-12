import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { LoginGuardGuard } from 'src/app/guard/login-guard.guard';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'index',
        children: [
          {
            path: '',
            loadChildren: () => import('../index/index.module').then(m => m.IndexPageModule),
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'notice',
        children: [
          {
            path: '',
            loadChildren: () => import('../notice/notice.module').then(m => m.NoticePageModule),
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'workbench',
        children: [
          {
            path: '',
            loadChildren: () => import('../workbench/workbench.module').then(m => m.WorkbenchPageModule),
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'mine',
        children: [
          {
            path: '',
            loadChildren: () => import('../mine/mine.module').then(m => m.MinePageModule),
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/index',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
