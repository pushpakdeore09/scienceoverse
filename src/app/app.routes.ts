import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { CertificatePageComponent } from './pages/certificate-page/certificate-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
    {path: '', component: ContentPageComponent},
    {path: 'events', component: EventPageComponent},
    {path: 'certificate', component: CertificatePageComponent},
    {path: 'signup', component:SignUpComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
