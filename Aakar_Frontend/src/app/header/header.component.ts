import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isChecked: boolean;

  constructor(private themeService: ThemeService) {
    this.isChecked = this.themeService.isDarkMode();
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
    this.isChecked = this.themeService.isDarkMode();
  }
}
