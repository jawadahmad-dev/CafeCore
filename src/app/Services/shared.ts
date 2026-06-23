import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class Shared {
  private toastService = inject(MessageService);
  private loading = new BehaviorSubject<boolean>(false);
  private readonly secretkey = "qwerty321"
  $obsloading = this.loading.asObservable();
  show() {
    setTimeout(() => this.loading.next(true));
  }
  hide() {
    setTimeout(() => this.loading.next(false));
  }
  toaster(Serverty: string, Summary: string, Details?: string, Icon?: string, Life?: number) {
    this.toastService.add({ severity: Serverty, summary: Summary, detail: Details, icon: Icon, life: Life ? Life : 3000 });
  }

  EnCrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretkey).toString();
  }

  DeCrypt(value: string): string {
    return CryptoJS.AES.decrypt(value, this.secretkey).toString(CryptoJS.enc.Utf8);
  }
}
