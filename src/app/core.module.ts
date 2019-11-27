import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';

@NgModule({
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule {

}
