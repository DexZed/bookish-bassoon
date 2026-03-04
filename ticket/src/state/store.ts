import { BehaviorSubject } from "rxjs";
import type { ITicket } from "../interfaces/DataInterfaces";
export const tickets$ = new BehaviorSubject<ITicket[]>([]);

fetch("/src/data/data.json")
.then(res=> res.json())
.then(data => tickets$.next(data))


