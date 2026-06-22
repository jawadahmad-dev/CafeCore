import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from './loader/loader';
import { Shared } from './Services/shared';
import { AsyncPipe } from '@angular/common';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loader, AsyncPipe, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('My-Shop');

  sharedService = inject(Shared);
}
