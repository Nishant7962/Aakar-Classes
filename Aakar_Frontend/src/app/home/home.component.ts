import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  images: string[] = [
    '../../assets/img/Poster01.jpeg',
    '../../assets/img/Poster02.jpeg',
    '../../assets/img/Poster03.jpeg',
    '../../assets/img/Poster04.jpeg',
    '../../assets/img/Poster05.jpeg',
    '../../assets/img/Poster06.jpeg',
    '../../assets/img/Poster07.jpeg',
    '../../assets/img/Poster08.jpeg',
    '../../assets/img/Poster09.jpeg'
  ];
  slideIndex: number = 0;
  slideInterval: any;

  ngOnInit(): void {
    // Initialize the slider
  }

  ngAfterViewInit(): void {
    this.startSlides();
  }

  startSlides(): void {
    this.slideInterval = setInterval(() => {
      this.showSlides(1);
    }, 3000); // Change image every 3 seconds
  }

  showSlides(n: number): void {
    const slides = document.querySelector('.slides') as HTMLElement;
    const totalSlides = this.images.length;

    this.slideIndex += n;
    if (this.slideIndex > totalSlides) { this.slideIndex = 1; }
    if (this.slideIndex < 1) { this.slideIndex = totalSlides; }

    slides.style.transform = `translateX(-${(this.slideIndex - 1) * 100}%)`;
  }

  moveSlide(n: number): void {
    clearInterval(this.slideInterval);
    this.showSlides(n);
    this.startSlides(); // Restart auto sliding after manual slide
  }
}