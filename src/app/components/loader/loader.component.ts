import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';


@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() mode: string = 'PURPLE' 
  /**
   * white
   * purple
   */
}
