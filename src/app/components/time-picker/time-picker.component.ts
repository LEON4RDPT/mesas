import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-time-picker',
  template: `
    <select 
      class="w-full border rounded px-3 py-2" 
      [ngModel]="selectedTime" 
      (ngModelChange)="onTimeChange($event)"
    >
      <option *ngFor="let time of allowedTimes" [value]="time">
        {{ time }}
      </option>
    </select>
  `,
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class TimePickerComponent implements OnInit, OnChanges {
  // The minimum time (in "HH:mm" format) from which to start listing times
  @Input() minTime: string = '00:00';
  // Minutes increment (default is 15 minutes)
  @Input() increment: number = 15;
  // Emits the selected time as a string ("HH:mm")
  @Output() timeChange = new EventEmitter<string>();

  allowedTimes: string[] = [];
  selectedTime: string = '';

  ngOnInit() {
    this.generateAllowedTimes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['minTime'] && !changes['minTime'].isFirstChange()) {
      this.generateAllowedTimes();
    }
  }

  generateAllowedTimes() {
    const [startHour, startMinute] = this.minTime.split(':').map(Number);
    const times: string[] = [];
    for (let h = startHour; h < 24; h++) {
      for (let m = 0; m < 60; m += this.increment) {
        // If we are in the starting hour, skip minutes before minTime
        if (h === startHour && m < startMinute) {
          continue;
        }
        const hh = h.toString().padStart(2, '0');
        const mm = m.toString().padStart(2, '0');
        times.push(`${hh}:${mm}`);
      }
    }
    this.allowedTimes = times;
    if (times.length > 0) {
      this.selectedTime = times[0];
      this.timeChange.emit(this.selectedTime);
    }
  }

  onTimeChange(time: string) {
    this.selectedTime = time;
    this.timeChange.emit(time);
  }
}
