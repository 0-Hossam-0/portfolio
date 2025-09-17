import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { ThemeService } from "../../../../services/theme";
import { ScrollService } from "../../../../services/scroll";
import { Subscription } from "rxjs";
import { IData } from "../../../../services/data";
import { Github, Linkedin, LucideAngularModule, Home } from "lucide-angular";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: "./header.html",
  styleUrls: ["./header.css"],
})
export class Header implements OnInit {
  activeSection = "home";
  mobileMenuOpen = false;
  progressWidth = 0;
  private subscriptions: Subscription[] = [];
  private _headerData!: {
    personalData: IData["personal"];
    contactData: IData["contact"];
  };
  constructor(
    private themeService: ThemeService,
    private scrollService: ScrollService,
    private router: Router
  ) {}
  githubIcon = Github;
  linkedinIcon = Linkedin;
  homeIcon = Home;

  @Input({ required: true })
  set headerData(value: {
    personalData: IData["personal"];
    contactData: IData["contact"];
  }) {
    this._headerData = value;
  }
  get headerData(): {
    personalData: IData["personal"];
    contactData: IData["contact"];
  } {
    return this._headerData;
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.scrollService.activeSection$.subscribe((section) => {
        this.activeSection = section;
        this.updateActiveNavItems();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;

    if (this.mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        document.addEventListener(
          "click",
          this.closeMobileMenuOnOutsideClick.bind(this)
        );
      }, 100);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener(
        "click",
        this.closeMobileMenuOnOutsideClick.bind(this)
      );
    }
  }

  private closeMobileMenuOnOutsideClick(event: Event): void {
    const target = event.target as HTMLElement;
    const mobileMenu = document.querySelector('div[class*="fixed inset-x-0"]');
    const mobileMenuBtn = document.querySelector(
      'button[aria-label="Toggle mobile menu"]'
    );

    if (
      this.mobileMenuOpen &&
      !mobileMenu?.contains(target) &&
      !mobileMenuBtn?.contains(target)
    ) {
      this.mobileMenuOpen = false;
      document.body.style.overflow = "";
      document.removeEventListener(
        "click",
        this.closeMobileMenuOnOutsideClick.bind(this)
      );
    }
  }
  navigateToHome(event: Event): void {
    event.preventDefault();

    this.mobileMenuOpen = false;
    document.body.style.overflow = "";
    document.removeEventListener(
      "click",
      this.closeMobileMenuOnOutsideClick.bind(this)
    );

    const currentUrl = this.router.url;

    if (
      currentUrl === "/" ||
      currentUrl === "/home" ||
      currentUrl.startsWith("/#")
    ) {
      this.activeSection = "home";
      this.updateActiveNavItems();
      this.scrollService.smoothScrollToSection("#home");
    } else {
      this.router.navigate(["/"]);
    }
  }

  navigateToSection(event: Event, section: string): void {
    event.preventDefault();

    // Close mobile menu
    this.mobileMenuOpen = false;
    document.body.style.overflow = "";
    document.removeEventListener(
      "click",
      this.closeMobileMenuOnOutsideClick.bind(this)
    );

    const currentUrl = this.router.url;
    if (currentUrl === "/" || currentUrl.startsWith("/#")) {
      this.activeSection = section;
      this.updateActiveNavItems();
      this.scrollService.smoothScrollToSection(`#${section}`);
    } else {
      this.router.navigate(["/"], { fragment: section });
    }
  }

  private updateActiveNavItems(): void {
    const navItems = document.querySelectorAll(".nav-item");
    const navContainers = document.querySelectorAll(".nav-item-container");

    navItems.forEach((item) => item.classList.remove("active"));
    navContainers.forEach((container) => container.classList.remove("active"));

    const activeNavItem = document.querySelector(
      `.nav-item[href="#${this.activeSection}"]`
    );
    const activeContainer = activeNavItem?.closest(".nav-item-container");

    if (activeNavItem) {
      activeNavItem.classList.add("active");
    }
    if (activeContainer) {
      activeContainer.classList.add("active");
    }

    const mobileNavItems = document.querySelectorAll(".mobile-menu a");
    mobileNavItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${this.activeSection}`) {
        item.classList.add("active");
      }
    });
  }
}
