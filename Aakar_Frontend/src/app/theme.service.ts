// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  toggleDarkMode() {
    const newMode = !this.darkMode.value;
    console.log('Toggling dark mode:', newMode); // Debug log
    this.darkMode.next(newMode);
  }

  isDarkMode(): boolean {
    return this.darkMode.value;
  }
}
