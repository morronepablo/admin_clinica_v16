import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentMethodsComponent } from './payment-methods.component';
import { AddMethodComponent } from './add-method/add-method.component';
import { ListMethodComponent } from './list-method/list-method.component';
import { EditMethodComponent } from './edit-method/edit-method.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentMethodsComponent,
    children: [
      {
        path: 'register',
        component: AddMethodComponent,
      },
      {
        path: 'list',
        component: ListMethodComponent,
      },
      {
        path: 'list/edit/:id',
        component: EditMethodComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentMethodsRoutingModule {}
