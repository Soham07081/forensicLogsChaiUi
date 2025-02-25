import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.css'
})
export class LogTableComponent {
  displayedColumns: string[] = ["User", "ObjectAccessed", "Action", "IPAddress", "Status"];
  logData: any;

  @ViewChild('pieCanvasActions') pieCanvasActions!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieCanvasStatus') pieCanvasStatus!: ElementRef<HTMLCanvasElement>;

  pieChartActions: any;
  pieChartStatus: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.logData !== undefined && data.logData !== null) {
      this.logData = data.logData;
    }
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createActionChart();
    this.createStatusChart();
  }

  // ✅ Pie Chart 1: Action Distribution
  createActionChart() {
    if (!this.logData || this.logData.length === 0) return;

    // Count occurrences of each action type
    const actionCounts: { [key: string]: number } = {};
    this.logData.forEach((log: any) => {
      actionCounts[log.action] = (actionCounts[log.action] || 0) + 1;
    });

    const labels = Object.keys(actionCounts);
    const dataValues = Object.values(actionCounts);

    this.pieChartActions = new Chart(this.pieCanvasActions.nativeElement, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: dataValues,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(100, 200, 100, 0.5)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // ✅ Pie Chart 2: Success vs. Failure
  createStatusChart() {
    if (!this.logData || this.logData.length === 0) return;

    // Count Success vs. Failure
    let successCount = 0;
    let failureCount = 0;

    this.logData.forEach((log: any) => {
      if (log.status === "Success") {
        successCount++;
      } else if (log.status === "Failure") {
        failureCount++;
      }
    });

    this.pieChartStatus = new Chart(this.pieCanvasStatus.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Success', 'Failure'],
        datasets: [{
          data: [successCount, failureCount],
          backgroundColor: ['rgba(54, 235, 162, 0.5)', 'rgba(255, 99, 132, 0.5)'],
          borderColor: ['rgba(54, 235, 162, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}