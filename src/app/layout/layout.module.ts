import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../shared/modules/angular-material/custom-material.module';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';
import { LogTableComponent } from './log-table/log-table.component';



@NgModule({
  declarations: [MainComponent,
    LoginComponent,
    ChatInterfaceComponent, LogTableComponent],
  imports: [
    CommonModule,
    RouterModule,
    CustomMaterialModule
  ],
  exports: [MainComponent]
})
export class LayoutModule { }
