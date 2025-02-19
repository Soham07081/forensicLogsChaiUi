import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.css'
})
export class LogTableComponent {
  displayedColumns: string[] = ['TimeStamp', 'ObjectAccessed', 'IPAddress', 'Status', "User"];
  logData: any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.logData !== undefined && data.logData !== null) {
      this.logData = data.logData;
    }
  }

}
