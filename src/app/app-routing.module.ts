import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'error',
    loadChildren: () => import('./modules/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule)
      }
    ]
  },
  { path: '**', redirectTo: '/error/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
