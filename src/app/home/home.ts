import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Testimonials
  testimonials: Testimonial[] = [
    {
      quote: "The cardamom buns here are transcendent. Walking in at 8 AM and feeling that warm, yeast-sweet steam is my favorite weekend ritual.",
      author: "Evelyn Thorne",
      role: "Local Architect & Regular",
      rating: 5
    },
    {
      quote: "Nordic Crumb embodies beautiful Swedish fika. The country sourdough has a crunchy, caramelized crust and an incredibly airy interior.",
      author: "Marcus Lindqvist",
      role: "Artisan Baker & Patron",
      rating: 5
    },
    {
      quote: "Minimalist layout, exquisite coffee, and friendly service. The pour-over is exceptionally clean. Truly a neighborhood sanctuary.",
      author: "Sofia Rostova",
      role: "Design Journalist",
      rating: 5
    }
  ];

  // Selected testimonial index for carousel
  activeTestimonial = signal(0);

  setTestimonial(index: number) {
    this.activeTestimonial.set(index);
  }

  nextTestimonial() {
    this.activeTestimonial.update(i => (i + 1) % this.testimonials.length);
  }

  prevTestimonial() {
    this.activeTestimonial.update(i => (i - 1 + this.testimonials.length) % this.testimonials.length);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
