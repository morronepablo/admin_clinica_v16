import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMethodsRoutingModule } from './payment-methods-routing.module';
import { PaymentMethodsComponent } from './payment-methods.component';
import { AddMethodComponent } from './add-method/add-method.component';
import { EditMethodComponent } from './edit-method/edit-method.component';
import { ListMethodComponent } from './list-method/list-method.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PaymentMethodsComponent,
    AddMethodComponent,
    EditMethodComponent,
    ListMethodComponent,
  ],
  imports: [
    CommonModule,
    PaymentMethodsRoutingModule,
    //
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class PaymentMethodsModule {}
