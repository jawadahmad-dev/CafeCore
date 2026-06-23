import { Component, AfterViewInit, signal, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { Rest } from '../Services/rest';
import { Shared } from '../Services/shared';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit, OnDestroy {
  restService = inject(Rest);
  sharedService = inject(Shared)
  // Contact Form fields
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      scrollWheelZoom: false
    }).setView([57.70887, 11.97456], 15);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors'
      }
    ).addTo(this.map);

    const customIcon = L.divIcon({
      className: 'custom-marker-container',
      html: `
        <div class="marker-pulse"></div>
        <div class="custom-marker">
          <span class="marker-emoji">🥖</span>
        </div>
      `,
      iconSize: [40, 45],
      iconAnchor: [20, 45],
      popupAnchor: [0, -45]
    });

    L.marker([57.70887, 11.97456], { icon: customIcon })
      .addTo(this.map)
      .bindPopup('<strong>Nordic Crumb</strong>456 Sandgatan Street, Gothenburg')
      .openPopup();

    setTimeout(() => {
      if (this.map) {
        this.map.invalidateSize();
      }
    }, 100);
  }

  contactSubmitted = signal(false);

  submitContact() {
    if (!(this.contactForm.email && this.contactForm.name && this.contactForm.subject && this.contactForm.message)) {
      this.sharedService.toaster('error', 'Error', 'Please fill all the fields')
      return;
    }

    const payload = {
      access_key: '8d942cc3-455b-42b0-9987-77397f3fe578',
      name: this.contactForm.name,
      email: this.contactForm.email,
      subject: this.contactForm.subject,
      message: this.contactForm.message
    };

    this.restService.sendContactForm(payload).subscribe({
      next: () => {
        this.sharedService.toaster('success', 'Sent', 'Contact form submitted successfully!')
        this.resetContact();
      },
      error: (err) => {
        this.sharedService.toaster('error', 'Error', err.message)
      }
    })
  }

  resetContact() {
    this.contactForm = { name: '', email: '', subject: '', message: '' };
    this.contactSubmitted.set(false);
  }
}
