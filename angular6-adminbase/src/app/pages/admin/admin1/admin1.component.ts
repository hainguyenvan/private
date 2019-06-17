import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'admin1-page',
    templateUrl: './admin1.component.html',
    styleUrls: ['./admin1.component.css']
})
export class Admin1Component implements OnInit {

    private title: any = 'admin1 page';
    
    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }

}