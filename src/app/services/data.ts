import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, forkJoin, Observable, of, Subject, takeUntil } from "rxjs";

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
  private cancel$ = new Subject<void>();
  private apiUrl = "https://backend-portfolio-steel.vercel.app/api";
  isLoading = false;
  progressBarValue = 0;
  isFirstLoad = true;

  fetchWithProgress(): Observable<IData | null> {
    this.isLoading = true;
    this.progressBarValue = 0;

    return new Observable<IData | null>((observer) => {
      let fakeInterval = setInterval(() => {
        if (this.progressBarValue < 90) {
          this.progressBarValue += 5;
        }
      }, 100);

      this.http
        .get<IData>(`${this.apiUrl}/home`)
        .pipe(
          takeUntil(this.cancel$),
          catchError(() => {
            clearInterval(fakeInterval);
            this.progressBarValue = 0;
            observer.next(this.emptyData());
            observer.complete();
            return of(null);
          })
        )
        .subscribe({
          next: (data) => {
            clearInterval(fakeInterval);
            this.progressBarValue = 100;
            observer.next(this.normalizeData(data));
            observer.complete();
          },
          complete: () => {
            console.log("success");
            this.isLoading = false;
            this.isFirstLoad = false;
            clearInterval(fakeInterval);
          },
        });
    });
  }
  private normalizeData(data: Partial<IData> | null): IData {
    return {
      projects: data?.projects ?? [],
      experiences: data?.experiences ?? [],
      contact: data?.contact ?? {
        email: "",
        phone: "",
        linkedin: "",
        github: "",
      },
      updates: data?.updates ?? [],
      personal: data?.personal ?? {
        name: "",
        location: "",
        title: "",
        bio: "",
        skills: [],
        image: "",
      },
    };
  }

  private emptyData(): IData {
    return this.normalizeData(null);
  }

  cancelRequest() {
    if (!this.isFirstLoad) {
      this.cancel$.next();
      this.isLoading = false;
      this.progressBarValue = 0;
    }
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
