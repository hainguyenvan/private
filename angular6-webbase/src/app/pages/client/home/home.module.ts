import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';

import { Layout01Module } from '../../../core/layout/01/layout01.module';

// import {
//     Header01Component,
//     Footer01Component,
// } from '../../core/layout/index';


@NgModule({
    imports: [
        HomeRouting,
        Layout01Module
    ],
    declarations: [
        // Header01Component,
        // Footer01Component,
        HomeComponent
    ],
    providers: [
    ]
})
export class HomeModule { }