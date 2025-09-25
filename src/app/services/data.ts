import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, forkJoin, Observable, of, Subject, takeUntil } from "rxjs";
import { allData$, hasError$, isFirstLoad$, loadingStatus$ } from "../events/events";

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
    completionDate: Date | null;
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
  hasError?: boolean;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private http: HttpClient) {}
  private cancel$ = new Subject<void>();
  private apiUrl = "https://backend-portfolio-steel.vercel.app/api";
  // private apiUrl = "http://localhost:3000/api";

  fetchWithProgress(): Observable<IData | null> {
    loadingStatus$.next({
      isLoading: true,
      status: "pending",
    });

    return new Observable<IData | null>((observer) => {
      this.http
        .get<IData>(`${this.apiUrl}/home`, {
          observe: "response",
        })
        .pipe(
          takeUntil(this.cancel$),
          catchError(() => {
            loadingStatus$.next({
              isLoading: false,
              status: "error",
            });
            isFirstLoad$.next(true);
            observer.next(this.emptyData());
            observer.complete();
            return of(null);
          })
        )
        .subscribe({
          next: (response) => {
            if (response && response.ok) {
              loadingStatus$.next({
                isLoading: false,
                status: "success",
              });
              isFirstLoad$.next(false);
              const normalized = this.normalizeData(response.body);
              observer.next(normalized);
              allData$.next(normalized);
              observer.complete();
            }
          },
        });
    });
  }

  private normalizeData(
    data: Partial<IData> | null
  ): IData & { hasError?: boolean } {
    return {
      projects: data?.projects ?? [],
      experiences:
        data?.experiences?.map((experience) => ({
          ...experience,
          completionDate: experience.completionDate ? new Date(experience.completionDate) : null,
          startDate: new Date(experience.startDate),
        })) ?? [],
      contact: data?.contact ?? {
        email: "",
        phone: "",
        linkedin: "",
        github: "",
      },
      updates:
        data?.updates?.map((update) => ({
          ...update,
          postDate: new Date(update.postDate),
        })) ?? [],
      personal: data?.personal ?? {
        name: "",
        location: "",
        title: "",
        bio: "",
        skills: [],
        image: "",
      },
      hasError: loadingStatus$.getValue().status === "error",
    };
  }

  private emptyData(): IData {
    return this.normalizeData(null);
  }

  cancelRequest() {
    this.cancel$.next();
    loadingStatus$.next({
      isLoading: false,
      status: "pending",
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
