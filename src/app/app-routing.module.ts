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
  { path: 'improvement-plan', loadChildren: './pages/improvement-plan/improvement-plan.module#ImprovementPlanPageModule' },
  { path: 'evaluation-index', loadChildren: './pages/evaluation-index/evaluation-index.module#EvaluationIndexPageModule' },
  { path: 'evaluation-model', loadChildren: './pages/evaluation-model/evaluation-model.module#EvaluationModelPageModule' },
  { path: 'expert-review', loadChildren: './pages/expert-review/expert-review.module#ExpertReviewPageModule' },
  { path: 'leader-review', loadChildren: './pages/leader-review/leader-review.module#LeaderReviewPageModule' },
  { path: 'monitor-evaluation', loadChildren: './pages/monitor-evaluation/monitor-evaluation.module#MonitorEvaluationPageModule' },
  { path: 'view-self-evaluation', loadChildren: './pages/view-self-evaluation/view-self-evaluation.module#ViewSelfEvaluationPageModule' },
  { path: 'show-highlight', loadChildren: './pages/show-highlight/show-highlight.module#ShowHighlightPageModule' },
  { path: 'message-interaction', loadChildren: './pages/message-interaction/message-interaction.module#MessageInteractionPageModule' },
  { path: 'overall-evaluation', loadChildren: './pages/overall-evaluation/overall-evaluation.module#OverallEvaluationPageModule' },
  { path: 'company-assess', loadChildren: './pages/company-assess/company-assess.module#CompanyAssessPageModule' },
  { path: 'assess-info/:assessId', loadChildren: './pages/assess-info/assess-info.module#AssessInfoPageModule' },
  { path: 'leader-check', loadChildren: './pages/leader-check/leader-check.module#LeaderCheckPageModule' },
  { path: 'department-check', loadChildren: './pages/department-check/department-check.module#DepartmentCheckPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
