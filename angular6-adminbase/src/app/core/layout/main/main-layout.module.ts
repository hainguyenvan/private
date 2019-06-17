import { NgModule } from '@angular/core';

import { MainMenuComponent } from './menu.component';
import { MainHeaderComponent } from './header.component';

@NgModule({
    imports: [
    ],
    declarations: [
        MainHeaderComponent,
        MainMenuComponent
    ],
    exports: [
        MainHeaderComponent,
        MainMenuComponent
    ]
})

export class MainLayoutModule { }