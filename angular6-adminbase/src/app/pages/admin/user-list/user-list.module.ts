import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list.component';
import { UserListRouting } from './user-list.routing';

import { MainLayoutModule } from '../../../core/layout/main/main-layout.module';


@NgModule({
    imports: [
        UserListRouting,
        MainLayoutModule
    ],
    declarations: [
        UserListComponent
    ],
    providers: [
    ]
})
export class UserListModule { }