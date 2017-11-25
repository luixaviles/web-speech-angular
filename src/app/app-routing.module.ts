import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebSpeechComponent } from './web-speech/web-speech.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'web-speech',
    pathMatch: 'full'
  },
  {
    path: 'web-speech',
    component: WebSpeechComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
