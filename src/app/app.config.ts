import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions,
} from "@angular/router";
import { routes } from "./app.routes";
import { HttpClientModule } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions({}),
      withInMemoryScrolling({
        scrollPositionRestoration: "top",
        anchorScrolling: "enabled",
      })
    ),
    importProvidersFrom(HttpClientModule),
  ],
};
