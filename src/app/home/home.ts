import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Rest } from '../Services/rest';
import { Shared } from '../Services/shared';
import { Hero } from '../Core/models/hero.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  restService = inject(Rest);
  sharedService = inject(Shared);
  heroData: Hero | null = null;

  ngOnInit(): void {
    setTimeout(() => this.getHero());
  }

  getHero() {
    this.restService.getHero().then((res) => {
      this.heroData = res.val();
      console.log(res.val())
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
