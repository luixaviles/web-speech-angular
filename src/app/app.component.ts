import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalHelpComponent } from './shared/components/modal-help/modal-help.component';

@Component({
  selector: 'wsa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  openHelp(): void {
    this.dialog.open(ModalHelpComponent);
  }

}
