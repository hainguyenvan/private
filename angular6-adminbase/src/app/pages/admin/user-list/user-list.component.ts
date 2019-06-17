import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'user-list-page',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    private title: any = 'user list page';

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

}