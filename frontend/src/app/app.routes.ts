import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { ListComponent } from "./list/list.component";
import { DetailsComponent } from "./details/details.component";

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                title: 'Task list',
                component: ListComponent
            },
            {
                path: 'details/:id',
                title: 'Task details',
                component: DetailsComponent
            }
        ]
    },
];
