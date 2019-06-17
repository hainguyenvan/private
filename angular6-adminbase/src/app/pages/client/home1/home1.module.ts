import { NgModule } from '@angular/core';

import { Home1Component } from './home1.component';
import { Home1Routing } from './home1.routing';

import { Layout01Module } from '../../../core/layout/01/layout01.module';

// import {
//     Header01Component,
//     Footer01Component,
// } from '../../../core/layout/index';


@NgModule({
    imports: [
        Home1Routing,
        Layout01Module
    ],
    declarations: [
        // Header01Component,
        // Footer01Component,
        Home1Component
    ],
    providers: [
    ]
})
export class Home1Module { }