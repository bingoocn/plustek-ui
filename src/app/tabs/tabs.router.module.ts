import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
            loadChildren: () =>
              import('../index/index.module').then(m => m.IndexPageModule)
          }
        ]
      },
      {
        path: 'notice',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../notice/notice.module').then(m => m.NoticePageModule)
          }
        ]
      },
      {
        path: 'workbench',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../workbench/workbench.module').then(m => m.WorkbenchPageModule)
          }
        ]
      },
      {
        path: 'mine',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../mine/mine.module').then(m => m.MinePageModule)
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
