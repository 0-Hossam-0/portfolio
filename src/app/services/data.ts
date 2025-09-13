import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, Observable, of } from 'rxjs';

export interface IData {
  projects: {
    id: string;
    title: string;
    technologies: string[];
    githubLink: string;
    description: string;
    images: string[];
  }[];
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
  updates: {
    title: string;
    description: string;
    postDate: Date;
    images: string[];
  }[];
  experiences: {
    title: string;
    description: string;
    technologies: string[];
    completionDate: Date;
    startDate: Date;
    provider: string;
  }[];
  personal: {
    name: string;
    location: string;
    title: string;
    bio: string;
    skills: string[];
    image: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://backend-portfolio-steel.vercel.app/api';

  getAllData(): Observable<IData | null> {
    return forkJoin({
      projects: this.http.get<IData['projects']>(`${this.apiUrl}/project`),
      experiences: this.http.get<IData['experiences']>(
        `${this.apiUrl}/experience`
      ),
      contact: this.http.get<IData['contact']>(`${this.apiUrl}/contact`),
      updates: this.http.get<IData['updates']>(`${this.apiUrl}/update`),
      personal: this.http.get<IData['personal']>(`${this.apiUrl}/personal`),
    }).pipe(
      catchError((error) => {
        console.log('Error Fetch', error);
        return of(null);
      })
    );
  }

  getHeaderData(): Observable<{
    contactData: IData['contact'];
    personalData: IData['personal'];
  } | null> {
    return forkJoin({
      contactData: this.http.get<IData['contact']>(`${this.apiUrl}/contact`),
      personalData: this.http.get<IData['personal']>(`${this.apiUrl}/personal`),
    });
  }

  getProjects(): Observable<IData['projects'] | null> {
    return this.http.get<IData['projects']>(`${this.apiUrl}/project`).pipe(
      catchError((error) => {
        console.log('Error Fetch', error);
        return of(null);
      })
    );
  }

  getProjectByTitle(
    title: string
  ): Observable<IData['projects'][number] | null> {
    return this.http.get<IData['projects'][number]>(
      `${this.apiUrl}/project/${title}`
    );
  }

  sendEmail(formData: any): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/contact/send-email`,
      formData
    );
  }

  getUpdate(title: string): Observable<IData['updates'][number]> {
    return this.http.get<IData['updates'][number]>(
      `${this.apiUrl}/update/${title}`
    );
  }

  getUpdates(): Observable<IData['updates']> {
    return this.http.get<IData['updates']>(`${this.apiUrl}/update`);
  }
}
