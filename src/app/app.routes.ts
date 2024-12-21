import { WebComponent } from './pages/Web/Web.component';
import { OtherComponent } from './pages/other/other.component';
import { CategoryComponent } from './pages/category/category.component';
import { LinkagesComponent } from './pages/linkages/linkages.component';
import { TestComponent } from './pages/test/test.component';
import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthenticationGuard } from './authentication.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'test',
    pathMatch: 'full',
  },
  // {
  //   path: '',
  //   component: DefaultLayoutComponent,
  //   data: {
  //     title: 'Home'
  //   },
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'theme',
  //       loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'base',
  //       loadChildren: () => import('./views/base/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'buttons',
  //       loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'forms',
  //       loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'icons',
  //       loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'notifications',
  //       loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'widgets',
  //       loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'charts',
  //       loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
  //     },
  //     {
  //       path: 'pages',
  //       loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
  //     }
  //   ]
  // },
  // {
  //   path: '404',
  //   loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
  //   data: {
  //     title: 'Page 404'
  //   }
  // },
  // {
  //   path: '500',
  //   loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
  //   data: {
  //     title: 'Page 500'
  //   }
  // },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
  //   data: {
  //     title: 'Login Page'
  //   }
  // },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
  //   data: {
  //     title: 'Register Page'
  //   }
  // },

  // newcontent
  //loginpage is /test
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'content',
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'linkages',
        component: LinkagesComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'other',
        component: OtherComponent,
      },
      {
        path: 'web',
        component: WebComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'category' },
];
