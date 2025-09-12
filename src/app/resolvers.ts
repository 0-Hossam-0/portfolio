import { ResolveFn, Router } from '@angular/router';
import { DataService } from './services/data';
import { inject } from '@angular/core';
import { catchError, forkJoin, map, of } from 'rxjs';

export const homeResolver: ResolveFn<any> = (route, state) => {
  const dataService = inject(DataService);
  return dataService.getAllData();
};

export const projectResolver: ResolveFn<any> = (route) => {
  const router = inject(Router);
  const projectService = inject(DataService);
  const title = route.paramMap.get('title');

  if (!title) {
    // Immediately navigate to not-found if no title
    return router.createUrlTree(['/not-found']);
  }

  return forkJoin({
    projectData: projectService.getProjectByTitle(title),
    headerData: projectService.getAllData(),
  }).pipe(
    map(({ projectData, headerData }) => {
      if (!projectData || !headerData) {
        return router.createUrlTree(['/not-found']);
      }
      return { projectData, headerData };
    }),
    catchError((error) => {
      console.error('Project resolver error:', error);
      return of(router.createUrlTree(['/not-found']));
    })
  );
};

export const updateResolver: ResolveFn<any> = (route, state) => {
  const dataService = inject(DataService);
  const urlTitle = route.paramMap.get('title');
  if (urlTitle) {
    const originalTitle = urlTitle
      .split('-')
      .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
      .join(' ');

    return forkJoin({
      updateData: dataService.getUpdate(originalTitle),
      headerData: dataService.getAllData(),
    });
  }
  return null;
};
