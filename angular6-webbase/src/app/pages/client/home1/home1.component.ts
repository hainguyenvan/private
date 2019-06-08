import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home1-page',
    templateUrl: './home1.component.html',
    styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {

    private title: any = 'home1 page';
    
    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

}