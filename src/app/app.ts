import { Component, type OnInit } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { Toast } from "./public components/toast/toast";
import { CommonModule } from "@angular/common";
import { Loading } from "./public components/loading/loading";
import { Error } from "./public components/error/error";

@Component({
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrls: ["./app.css"],
  imports: [RouterOutlet, Toast, Loading, CommonModule, Error],
  standalone: true,
})
export class App implements OnInit {
  errorDetail: string | null = null;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
