import {
  Component,
  type OnInit,
  type OnDestroy,
  ChangeDetectorRef,
} from "@angular/core";
import { ScrollService } from "../../services/scroll";
import { Experience } from "./components/experience/experience";
import { Contact } from "./components/contact/contact";
import { Blog } from "./components/blog/blog";
import { Home } from "./components/home/home";
import { Portfolio } from "./components/portfolio/portfolio";
import { About } from "./components/about/about";
import { Header } from "./components/header/header";
import { AnimationService } from "../../services/animation";
import { IData } from "../../services/data";
import { CommonModule } from "@angular/common";
import { Footer } from "./components/footer/footer";
import { ActivatedRoute } from "@angular/router";
import { allData$ } from "../../events/events";
import { Subscription } from "rxjs";

@Component({
  selector: "home-page-root",
  templateUrl: "./home.html",
  styleUrls: ["./home.css"],
  standalone: true,
  imports: [
    Header,
    Home,
    About,
    Experience,
    Contact,
    Blog,
    Portfolio,
    CommonModule,
    Footer,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  showButton = false;
  private scrollTicking = false;
  allData!: IData;
  private sub!: Subscription;
  constructor(
    private scrollService: ScrollService,
    private animationService: AnimationService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.allData = this.route.snapshot.data["allData"];
    if (this.allData.hasError) {
      this.sub = allData$.subscribe((data) => {
        if (data.hasError) return;
        this.cd.detectChanges();
        this.animationService.initScrollAnimations();
        this.allData = data;
        this.allData.updates.sort(
          (a, b) => b.postDate.getTime() - a.postDate.getTime()
        );
      });
    }
    this.allData.updates.sort(
      (a, b) => b.postDate.getTime() - a.postDate.getTime()
    );

    window.addEventListener("scroll", this.handleScroll.bind(this));
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          this.scrollService.smoothScrollToSection(`#${fragment}`);
        }, 100);
      }
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener("scroll", this.handleScroll.bind(this));
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private handleScroll(): void {
    if (!this.scrollTicking) {
      requestAnimationFrame(() => {
        this.showButton = window.pageYOffset > 300;
        this.scrollTicking = false;
      });
      this.scrollTicking = true;
    }
  }

  ngAfterViewInit(): void {
    this.scrollService.initScrollListener();
    this.animationService.initScrollAnimations();
  }
}
