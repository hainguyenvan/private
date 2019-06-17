import { NgModule } from '@angular/core';

import { AdminLoginComponent } from './admin-login.component';
import { AdminLoginRouting } from './admin-login.routing';

import { Layout01Module } from '../../../core/layout/01/layout01.module';

// import {
//     Header01Component,
//     Footer01Component,
// } from '../../core/layout/index';


@NgModule({
    imports: [
        AdminLoginRouting,
        Layout01Module
    ],
    declarations: [
        // Header01Component,
        // Footer01Component,
        AdminLoginComponent
    ],
    providers: [
    ]
})
export class AdminLoginModule { }