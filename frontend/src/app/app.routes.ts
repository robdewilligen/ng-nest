import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { ListComponent } from "./list/list.component";
import { DetailsComponent } from "./details/details.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const routes: Routes =
    [
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
        {
            path: 'list',
            redirectTo: '',
            pathMatch: 'full'
        },
        {   // Wildcard route, should always be last in this order!
            path: '**',
            component: NotFoundComponent
        }
    ];
