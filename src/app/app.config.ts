import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { UsersApiService } from './users/services/users-api.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideHttpClient(), UsersApiService],
};
