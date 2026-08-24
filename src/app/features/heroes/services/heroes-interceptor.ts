import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { timer, throwError, of } from 'rxjs';
import { delayWhen, switchMap, finalize } from 'rxjs/operators';
import { Spinner } from './spinner'


export const heroesInterceptor: HttpInterceptorFn = (req, next) => {
  const randomDelay = Math.floor(Math.random() * (6000 - 2000 + 1)) + 2000;
  const isSuccess = Math.random() < 0.9;
  const spinner = inject(Spinner);
  
  if (req.method === 'POST') {
    spinner.show();
    return next(req).pipe(
      delayWhen(() => timer(randomDelay)),
      switchMap(event => {
        if (event instanceof HttpResponse && !isSuccess) {
          return throwError(
            () =>
              new HttpErrorResponse({
                error: { message: 'Operation failed' },
                status: 500,
                statusText: 'Internal Server Error',
                url: req.url
              })
          );
        }
        return of(event);
      }),
      finalize(() => {
        spinner.hide();
      })
    );
  }
  return next(req);
};
