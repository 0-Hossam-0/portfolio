import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from "@angular/core";
import { AnimationService } from "../../../../services/animation";
import { IData } from "../../../../services/data";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.html",
  styleUrls: ["./home.css"],
})
export class Home implements OnInit, AfterViewInit {
  @ViewChild("codeRain") codeRainRef!: ElementRef;
  @ViewChild("typingText") typingTextRef!: ElementRef;
  private _personalData!: IData["personal"];
  constructor(
    private animationService: AnimationService,
    private http: HttpClient
  ) {}
  @Input({ required: true })
  set personalData(value: IData["personal"]) {
    this._personalData = value;
  }
  get personalData(): IData["personal"] {
    return this._personalData;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.animationService.createCodeRain(this.codeRainRef.nativeElement);
    this.startTypingAnimation();
  }

  onDownloadClick() {
    this.http
      .get("https://backend-portfolio-steel.vercel.app/api/download", {
        responseType: "blob",
      })
      .subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Hossam-Ahmed-Ali.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }

  private startTypingAnimation(): void {
    const typingElement = this.typingTextRef.nativeElement;
    const text = `Hello, I'm ${this.personalData.name}`;
    const nameStart = text.indexOf(`${this.personalData.name}`);
    let currentIndex = 0;

    typingElement.innerHTML = "";
    typingElement.style.width = "auto";
    typingElement.style.borderRight = "3px solid #2563eb";

    const typeCharacter = () => {
      if (currentIndex < text.length) {
        const char = text[currentIndex];

        if (currentIndex === nameStart) {
          typingElement.innerHTML += '<span class="text-gradient">';
        }

        typingElement.innerHTML += char;

        if (currentIndex === nameStart + 4) {
          typingElement.innerHTML += "</span>";
        }

        currentIndex++;
        setTimeout(typeCharacter, 150);
      } else {
        setTimeout(() => {
          typingElement.style.borderRight = "none";
          const cursor = document.createElement("span");
          cursor.className = "typing-cursor";
          cursor.style.animation = "blink 1s infinite";
          typingElement.parentNode?.appendChild(cursor);
        }, 500);
      }
    };

    setTimeout(typeCharacter, 1000);
  }
}
