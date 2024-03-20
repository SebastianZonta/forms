import { Routes } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';

export const routes: Routes = [
    { path: 'template', component: TemplateComponent },
    { path: 'reactive', component: ReactiveComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'reactive' }
];
