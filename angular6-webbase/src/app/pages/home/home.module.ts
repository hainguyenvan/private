import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';

// import {
//     Header01Component,
//     Footer01Component,
// } from '../../core/layout/index';


@NgModule({
    imports: [
        HomeRouting,
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