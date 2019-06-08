import { NgModule } from '@angular/core';

import { Admin1Component } from './admin1.component';
import { Admin1Routing } from './admin1.routing';

import { Layout01Module } from '../../../core/layout/01/layout01.module';

// import {
//     Header01Component,
//     Footer01Component,
// } from '../../core/layout/index';


@NgModule({
    imports: [
        Admin1Routing,
        Layout01Module
    ],
    declarations: [
        // Header01Component,
        // Footer01Component,
        Admin1Component
    ],
    providers: [
    ]
})
export class Admin1Module { }