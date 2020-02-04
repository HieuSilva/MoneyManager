import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
    selector:'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{

    constructor(private router: Router,
                private menuController: MenuController) {}

    ngOnInit() {

    }

    navigateTo(path: string) {
        this.router.navigate([path]);
        this.menuController.close();
    }
}