import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { homeResolver, projectResolver, updateResolver } from './resolvers';
import { ProjectsPage } from './pages/projects/projects';
import { ProjectPage } from './pages/project/project';
import { Updates } from './pages/updates/updates';
import { UpdatePage } from './pages/update/update';
import { NotFound } from './page/notfound/notfound';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    resolve: { allData: homeResolver },
  },
  {
    path: 'projects',
    component: ProjectsPage,
    pathMatch: 'full',
    resolve: { allData: homeResolver },
  },
  {
    path: 'project/:title',
    component: ProjectPage,
    resolve: { projectData: projectResolver },
  },
  {
    path: 'update/:title',
    component: UpdatePage,
    resolve: { updateData: updateResolver },
  },
  {
    path: 'updates',
    component: Updates,
    resolve: { allData: homeResolver },
  },
  {
    path: 'not-found',
    component: NotFound,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
  {
    path: '**/',
    redirectTo: 'not-found',
  },
];
