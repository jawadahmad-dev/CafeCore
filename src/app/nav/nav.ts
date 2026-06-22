import { Component, signal, HostListener, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  isMobileMenuOpen = signal(false);
  activeSection = signal('hero');
  isSubscribed = signal(false);

  private router = inject(Router);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => {
      const next = !v;
      this.toggleBodyScroll(next);
      return next;
    });
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    this.toggleBodyScroll(false);
  }

  private toggleBodyScroll(lock: boolean) {
    if (typeof document !== 'undefined') {
      if (lock) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    }
  }

  subscribeNewsletter(emailInput: HTMLInputElement) {
    if (emailInput.value) {
      this.isSubscribed.set(true);
      emailInput.value = '';
      setTimeout(() => {
        this.isSubscribed.set(false);
      }, 5000);
    }
  }

  // Returns true if the current path is active
  isRouteActive(routePath: string): boolean {
    return this.router.url.split('#')[0] === routePath;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Only scroll spy if we are on the Home page
    const currentUrl = this.router.url;
    if (currentUrl !== '/' && !currentUrl.startsWith('/#')) {
      return;
    }

    const sections = ['hero', 'about', 'testimonials', 'gallery'];
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Add offset for sticky header
    const offset = 120;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const top = element.offsetTop - offset;
        const bottom = top + element.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          this.activeSection.set(sectionId);
          break;
        }
      }
    }
  }
}
