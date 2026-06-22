import { Component, AfterViewInit, signal, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements AfterViewInit, OnDestroy {
  // Reservation Form fields
  reservation = {
    name: '',
    email: '',
    date: '',
    time: '09:00',
    guests: '2'
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
  reservationSubmitted = signal(false);

  submitReservation() {
    if (this.reservation.name && this.reservation.email && this.reservation.date) {
      this.reservationSubmitted.set(true);
    }
  }

  resetReservation() {
    this.reservation = {
      name: '',
      email: '',
      date: '',
      time: '09:00',
      guests: '2'
    };
    this.reservationSubmitted.set(false);
  }
}
