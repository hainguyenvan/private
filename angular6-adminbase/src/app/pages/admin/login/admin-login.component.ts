import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-page-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

    onLogin() {
        let link = ["/admin/user-list"];
        this.router.navigate(link);
    }
}