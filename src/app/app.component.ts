import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { CommonService } from './shared/apis/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutModule, RouterOutlet],
  providers:[CommonService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatui';
}
