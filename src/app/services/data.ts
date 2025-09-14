import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, forkJoin, map, Observable, of } from "rxjs";

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
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}
  private apiUrl = "https://backend-portfolio-steel.vercel.app/api";
  isLoading = false;
  progressBarValue = 0;

  fetchWithProgress(): Observable<IData | null> {
    this.isLoading = true;
    this.progressBarValue = 0;

    return new Observable<IData | null>((observer) => {
      let fakeInterval = setInterval(() => {
        if (this.progressBarValue < 90) {
          this.progressBarValue += 5;
        }
      }, 100);

      this.http.get<IData>(`${this.apiUrl}/home`).subscribe({
        next: (data) => {
          clearInterval(fakeInterval);
          this.progressBarValue = 100;
          this.isLoading = false;

          // ✅ Normalize response
          const safeData: IData = {
            projects: data?.projects ?? [],
            experiences: data?.experiences ?? [],
            contact: data?.contact ?? null,
            updates: data?.updates ?? [],
            personal: data?.personal ?? null,
          };

          observer.next(safeData);
          observer.complete();
        },
        error: () => {
          clearInterval(fakeInterval);
          this.progressBarValue = 0;
          this.isLoading = false;

          // ✅ Return a valid empty IData instead of null or {}
          observer.next({
            projects: [],
            experiences: [],
            contact: { email: "", phone: "", linkedin: "", github: "" },
            updates: [],
            personal: { name: "", location: "", title: "", bio: "", skills: [], image: "" },
          });
          observer.complete();
        },
      });
    });
  }

  getHeaderData(): Observable<{
    contactData: IData["contact"];
    personalData: IData["personal"];
  } | null> {
    return forkJoin({
      contactData: this.http.get<IData["contact"]>(`${this.apiUrl}/contact`),
      personalData: this.http.get<IData["personal"]>(`${this.apiUrl}/personal`),
    });
  }

  getProjects(): Observable<IData["projects"] | null> {
    return this.http.get<IData["projects"]>(`${this.apiUrl}/project`).pipe(
      catchError((error) => {
        return of(null);
      })
    );
  }

  getProjectByTitle(
    title: string
  ): Observable<IData["projects"][number] | null> {
    return this.http.get<IData["projects"][number]>(
      `${this.apiUrl}/project/${title}`
    );
  }

  sendEmail(formData: any): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/contact/send-email`,
      formData
    );
  }

  getUpdate(title: string): Observable<IData["updates"][number]> {
    return this.http.get<IData["updates"][number]>(
      `${this.apiUrl}/update/${title}`
    );
  }

  getUpdates(): Observable<IData["updates"]> {
    return this.http.get<IData["updates"]>(`${this.apiUrl}/update`);
  }
}
