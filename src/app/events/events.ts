import { BehaviorSubject, Subject } from "rxjs";

export const hasError$ = new Subject<boolean>();
export const allData$ = new Subject<any>();
export const isFirstLoad$ = new BehaviorSubject<boolean>(true);
export const loadingStatus$ = new BehaviorSubject<{
  isLoading: boolean;
  status: "success" | "error" | "pending";
}>({
  isLoading: false,
  status: "error",
});
