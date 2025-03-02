import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';

export const routes: Routes = [
    {path: '', component: ContentPageComponent},
    {path: 'events', component: EventPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
