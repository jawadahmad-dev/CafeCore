import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { Shared } from './Services/shared';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const sharedService = inject(Shared)

  Promise.resolve().then(() => sharedService.show())

  return next(req).pipe(
    finalize(() => sharedService.hide())
  )
};
