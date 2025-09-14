import { Component, type OnInit, type OnDestroy, Input } from "@angular/core";
import { ThemeService } from "../../services/theme";
import { ScrollService } from "../../services/scroll";
import { Experience } from "./components/experience/experience";
import { Contact } from "./components/contact/contact";
import { Blog } from "./components/blog/blog";
import { Home } from "./components/home/home";
import { Portfolio } from "./components/portfolio/portfolio";
import { About } from "./components/about/about";
import { Header } from "./components/header/header";
import { AnimationService } from "../../services/animation";
import { DataService, IData } from "../../services/data";
import { CommonModule } from "@angular/common";
import { Footer } from "./components/footer/footer";
import { ActivatedRoute } from "@angular/router";

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
    Header,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  showButton = false;
  isLoading = true;
  private scrollTicking = false;
  allData!: IData;
  constructor(
    private scrollService: ScrollService,
    private themeService: ThemeService,
    private animationService: AnimationService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataService.fetchWithProgress().subscribe({
      next: (data) => {
        if (data) {
          this.allData = data;
          this.isLoading = false;
        }
      },
    });
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

  scrollToTop(): void {
    this.scrollService.smoothScrollToSection("#home");
  }

  ngAfterViewInit(): void {
    this.scrollService.initScrollListener();
    this.animationService.initScrollAnimations();
  }
}
