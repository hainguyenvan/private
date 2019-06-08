import { NgModule } from '@angular/core';

import { Footer01Component } from './footer.component';
import { Header01Component } from './header.component';

@NgModule({
    imports: [
    ],
    declarations: [
        Header01Component,
        Footer01Component
    ],
    exports: [
        Header01Component,
        Footer01Component
    ]
})

export class Layout01Module { }