import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet
    ],
    providers: [],
    standalone: true
})
export class AppComponent {

}
