import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    private title: any = 'home page';
    
    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

}