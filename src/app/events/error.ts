import { Subject } from "rxjs";
import { IData } from "../services/data";

export const hasError$ = new Subject<boolean>();
export const allData$ = new Subject<any>();
