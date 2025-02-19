import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { ChatInterfaceComponent } from './layout/chat-interface/chat-interface.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'chat',
        component: ChatInterfaceComponent
    },
];
