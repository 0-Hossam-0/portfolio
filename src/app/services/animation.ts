import { Injectable } from '@angular/core';

interface CodeSnippet {
  text: string;
  type: 'keyword' | 'function' | 'string' | 'comment' | 'operator' | 'number' | 'variable' | 'class';
  language?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private codeSnippets: CodeSnippet[] = [
    // React & JavaScript
    { text: 'const [state, setState] = useState()', type: 'keyword', language: 'react' },
    { text: 'function App() {', type: 'function', language: 'javascript' },
    { text: 'return <div>Hello World</div>', type: 'keyword', language: 'react' },
    { text: 'useEffect(() => {', type: 'function', language: 'react' },
    { text: 'import React from "react"', type: 'keyword', language: 'react' },
    { text: 'export default Component', type: 'keyword', language: 'javascript' },
    { text: 'async/await', type: 'keyword', language: 'javascript' },
    { text: 'fetch("/api/data")', type: 'function', language: 'javascript' },
    { text: '.then(response => response.json())', type: 'function', language: 'javascript' },
    { text: 'const handleClick = () => {}', type: 'function', language: 'javascript' },
    { text: 'useState', type: 'function', language: 'react' },
    { text: 'useCallback', type: 'function', language: 'react' },
    { text: 'useMemo', type: 'function', language: 'react' },
    { text: 'useContext', type: 'function', language: 'react' },
    
    // TypeScript
    { text: 'interface User {', type: 'keyword', language: 'typescript' },
    { text: 'type Props = {', type: 'keyword', language: 'typescript' },
    { text: 'enum Status {', type: 'keyword', language: 'typescript' },
    { text: 'const user: User = {}', type: 'variable', language: 'typescript' },
    { text: 'Generic<T>', type: 'class', language: 'typescript' },
    { text: 'extends Component<Props>', type: 'class', language: 'typescript' },
    
    // CSS & Styling
    { text: 'display: flex;', type: 'string', language: 'css' },
    { text: 'justify-content: center;', type: 'string', language: 'css' },
    { text: 'background: linear-gradient()', type: 'string', language: 'css' },
    { text: 'transform: translateY(-50%)', type: 'string', language: 'css' },
    { text: '@media (max-width: 768px)', type: 'operator', language: 'css' },
    { text: 'grid-template-columns: 1fr', type: 'string', language: 'css' },
    { text: 'animation: fadeIn 0.3s ease', type: 'string', language: 'css' },
    { text: 'box-shadow: 0 4px 6px rgba()', type: 'string', language: 'css' },
    
    // HTML & JSX
    { text: '<div className="container">', type: 'operator', language: 'html' },
    { text: '<button onClick={handleClick}>', type: 'operator', language: 'react' },
    { text: '</div>', type: 'operator', language: 'html' },
    { text: '<Component {...props} />', type: 'operator', language: 'react' },
    { text: '<input type="text" />', type: 'operator', language: 'html' },
    
    // Node.js & Backend
    { text: 'app.get("/api", (req, res) => {', type: 'function', language: 'nodejs' },
    { text: 'res.json({ success: true })', type: 'function', language: 'nodejs' },
    { text: 'const express = require("express")', type: 'keyword', language: 'nodejs' },
    { text: 'mongoose.connect()', type: 'function', language: 'nodejs' },
    { text: 'JWT.sign(payload, secret)', type: 'function', language: 'nodejs' },
    { text: 'app.listen(3000)', type: 'function', language: 'nodejs' },
    { text: 'middleware(req, res, next)', type: 'function', language: 'nodejs' },
    
    // Database
    { text: 'SELECT * FROM users', type: 'keyword', language: 'sql' },
    { text: 'WHERE id = ?', type: 'keyword', language: 'sql' },
    { text: 'INSERT INTO posts', type: 'keyword', language: 'sql' },
    { text: 'UPDATE users SET', type: 'keyword', language: 'sql' },
    { text: 'JOIN orders ON', type: 'keyword', language: 'sql' },
    { text: 'GROUP BY category', type: 'keyword', language: 'sql' },
    
    // DevOps & Tools
    { text: 'git commit -m "feat: add feature"', type: 'comment', language: 'git' },
    { text: 'docker build -t app:latest', type: 'comment', language: 'docker' },
    { text: 'npm run build', type: 'comment', language: 'npm' },
    { text: 'yarn start', type: 'comment', language: 'yarn' },
    { text: 'kubectl apply -f deployment.yaml', type: 'comment', language: 'kubernetes' },
    { text: 'terraform plan', type: 'comment', language: 'terraform' },
    
    // Control Flow
    { text: 'if (condition) {', type: 'keyword', language: 'javascript' },
    { text: 'for (let i = 0; i < length; i++)', type: 'keyword', language: 'javascript' },
    { text: 'try { ... } catch (error) {', type: 'keyword', language: 'javascript' },
    { text: 'switch (value) {', type: 'keyword', language: 'javascript' },
    { text: 'while (isRunning) {', type: 'keyword', language: 'javascript' },
    
    // Modern JavaScript
    { text: 'Promise.resolve()', type: 'function', language: 'javascript' },
    { text: 'Array.map(item => item.id)', type: 'function', language: 'javascript' },
    { text: '...spread', type: 'operator', language: 'javascript' },
    { text: 'destructuring', type: 'keyword', language: 'javascript' },
    { text: 'const { name, age } = user', type: 'variable', language: 'javascript' },
    { text: 'await Promise.all()', type: 'function', language: 'javascript' },
    
    // Numbers and Operators
    { text: '200', type: 'number', language: 'http' },
    { text: '404', type: 'number', language: 'http' },
    { text: '500', type: 'number', language: 'http' },
    { text: '===', type: 'operator', language: 'javascript' },
    { text: '!==', type: 'operator', language: 'javascript' },
    { text: '&&', type: 'operator', language: 'javascript' },
    { text: '||', type: 'operator', language: 'javascript' },
    { text: '=>', type: 'operator', language: 'javascript' },
    { text: '?.', type: 'operator', language: 'javascript' },
    { text: '??', type: 'operator', language: 'javascript' },
    
    // Modern Frameworks
    { text: 'Next.js', type: 'class', language: 'nextjs' },
    { text: 'Vue.js', type: 'class', language: 'vue' },
    { text: 'Angular', type: 'class', language: 'angular' },
    { text: 'Svelte', type: 'class', language: 'svelte' },
    { text: 'Nuxt.js', type: 'class', language: 'nuxt' },
    
    // Cloud & Services
    { text: 'AWS Lambda', type: 'class', language: 'aws' },
    { text: 'Firebase', type: 'class', language: 'firebase' },
    { text: 'Vercel', type: 'class', language: 'vercel' },
    { text: 'Netlify', type: 'class', language: 'netlify' },
    { text: 'Supabase', type: 'class', language: 'supabase' },
  ];

  createCodeRain(container: HTMLElement): void {
    container.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
      const codeElement = document.createElement('div');
      const randomSnippet = this.codeSnippets[Math.floor(Math.random() * this.codeSnippets.length)];
      
      codeElement.className = `code-element code-${randomSnippet.type}`;
      codeElement.textContent = randomSnippet.text;
      
      codeElement.style.left = Math.random() * 95 + '%';
      codeElement.style.animationDuration = Math.random() * 8 + 10 + 's';
      codeElement.style.animationDelay = Math.random() * 30 + 's';
      codeElement.style.fontSize = Math.random() * 4 + 13 + 'px';
      
      container.appendChild(codeElement);
    }
  }

  createExperienceCodeAnimation(container: HTMLElement): void {
    container.innerHTML = '';
    
    // Create animated grid background
    const gridBg = document.createElement('div');
    gridBg.className = 'experience-grid-bg';
    container.appendChild(gridBg);

    // Create floating light orbs
    for (let i = 0; i < 12; i++) {
      const orb = document.createElement('div');
      orb.className = 'floating-light-orb';
      orb.style.left = Math.random() * 100 + '%';
      orb.style.top = Math.random() * 100 + '%';
      orb.style.animationDuration = Math.random() * 8 + 12 + 's';
      orb.style.animationDelay = Math.random() * 10 + 's';
      
      // Random size for variety
      const size = Math.random() * 20 + 15;
      orb.style.width = size + 'px';
      orb.style.height = size + 'px';
      
      container.appendChild(orb);
    }

    // Create floating light beams
    for (let i = 0; i < 8; i++) {
      const beam = document.createElement('div');
      beam.className = 'floating-light-beam';
      beam.style.left = Math.random() * 100 + '%';
      beam.style.animationDuration = Math.random() * 15 + 20 + 's';
      beam.style.animationDelay = Math.random() * 12 + 's';
      beam.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      container.appendChild(beam);
    }

    // Create glowing particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-glow-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = Math.random() * 10 + 15 + 's';
      particle.style.animationDelay = Math.random() * 8 + 's';
      
      // Random size and opacity
      const size = Math.random() * 6 + 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      container.appendChild(particle);
    }

    // Create floating light rings
    for (let i = 0; i < 6; i++) {
      const ring = document.createElement('div');
      ring.className = 'floating-light-ring';
      ring.style.left = Math.random() * 100 + '%';
      ring.style.top = Math.random() * 100 + '%';
      ring.style.animationDuration = Math.random() * 12 + 18 + 's';
      ring.style.animationDelay = Math.random() * 15 + 's';
      
      // Random size
      const size = Math.random() * 40 + 30;
      ring.style.width = size + 'px';
      ring.style.height = size + 'px';
      
      container.appendChild(ring);
    }

    // Create floating light streaks
    for (let i = 0; i < 10; i++) {
      const streak = document.createElement('div');
      streak.className = 'floating-light-streak';
      streak.style.left = Math.random() * 100 + '%';
      streak.style.animationDuration = Math.random() * 6 + 8 + 's';
      streak.style.animationDelay = Math.random() * 10 + 's';
      streak.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      container.appendChild(streak);
    }

    // Create pulsing light dots
    for (let i = 0; i < 15; i++) {
      const dot = document.createElement('div');
      dot.className = 'floating-light-dot';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 100 + '%';
      dot.style.animationDuration = Math.random() * 4 + 6 + 's';
      dot.style.animationDelay = Math.random() * 8 + 's';
      
      container.appendChild(dot);
    }

    // Create floating light waves
    for (let i = 0; i < 5; i++) {
      const wave = document.createElement('div');
      wave.className = 'floating-light-wave';
      wave.style.left = Math.random() * 100 + '%';
      wave.style.top = Math.random() * 100 + '%';
      wave.style.animationDuration = Math.random() * 20 + 25 + 's';
      wave.style.animationDelay = Math.random() * 12 + 's';
      
      container.appendChild(wave);
    }
  }

  createFloatingElements(container: HTMLElement, type: string): void {
    container.innerHTML = '';
    
    switch (type) {
      case 'about':
        this.createAboutAnimation(container);
        break;
      case 'services':
        this.createServicesAnimation(container);
        break;
      case 'portfolio':
        this.createPortfolioAnimation(container);
        break;
      case 'experience':
        this.createExperienceCodeAnimation(container);
        break;
      case 'blog':
        this.createBlogAnimation(container);
        break;
      case 'contact':
        this.createContactAnimation(container);
        break;
    }
  }

  private createAboutAnimation(container: HTMLElement): void {
    // Create floating geometric shapes
    for (let i = 0; i < 8; i++) {
      const shape = document.createElement('div');
      shape.className = 'floating-skill';
      
      const size = Math.random() * 20 + 15;
      shape.style.width = size + 'px';
      shape.style.height = size + 'px';
      shape.style.left = Math.random() * 100 + '%';
      shape.style.animationDuration = Math.random() * 15 + 20 + 's';
      shape.style.animationDelay = Math.random() * 20 + 's';
      shape.style.background = `rgba(37, 99, 235, ${Math.random() * 0.3 + 0.2})`;
      shape.style.borderRadius = Math.random() > 0.5 ? '50%' : '20%';
      shape.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      container.appendChild(shape);
    }

    // Create floating achievement dots
    for (let i = 0; i < 12; i++) {
      const achievement = document.createElement('div');
      achievement.className = 'floating-achievement';
      achievement.style.left = Math.random() * 100 + '%';
      achievement.style.top = Math.random() * 100 + '%';
      achievement.style.animationDuration = Math.random() * 3 + 2 + 's';
      achievement.style.animationDelay = Math.random() * 5 + 's';
      
      container.appendChild(achievement);
    }
  }

  private createServicesAnimation(container: HTMLElement): void {
    // Create floating tool shapes
    for (let i = 0; i < 6; i++) {
      const tool = document.createElement('div');
      tool.className = 'floating-tech';
      
      const size = Math.random() * 15 + 10;
      tool.style.width = size + 'px';
      tool.style.height = size + 'px';
      tool.style.background = `rgba(37, 99, 235, ${Math.random() * 0.4 + 0.2})`;
      tool.style.borderRadius = Math.random() > 0.5 ? '50%' : '20%';
      tool.style.animationDuration = Math.random() * 20 + 25 + 's';
      tool.style.animationDelay = Math.random() * 15 + 's';
      
      container.appendChild(tool);
    }

    // Create floating gears
    for (let i = 0; i < 10; i++) {
      const gear = document.createElement('div');
      gear.className = 'floating-gear';
      gear.style.left = Math.random() * 100 + '%';
      gear.style.top = Math.random() * 100 + '%';
      gear.style.animationDuration = Math.random() * 4 + 3 + 's';
      gear.style.animationDelay = Math.random() * 6 + 's';
      
      container.appendChild(gear);
    }
  }

  private createPortfolioAnimation(container: HTMLElement): void {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f7dc6f'];

    // Create floating design elements
    for (let i = 0; i < 7; i++) {
      const designElement = document.createElement('div');
      designElement.className = 'floating-creative';
      
      const width = Math.random() * 25 + 15;
      const height = Math.random() * 15 + 10;
      designElement.style.width = width + 'px';
      designElement.style.height = height + 'px';
      designElement.style.background = colors[Math.floor(Math.random() * colors.length)];
      designElement.style.opacity = (Math.random() * 0.4 + 0.2).toString();
      designElement.style.borderRadius = Math.random() * 10 + 'px';
      designElement.style.left = Math.random() * 100 + '%';
      designElement.style.animationDuration = Math.random() * 18 + 22 + 's';
      designElement.style.animationDelay = Math.random() * 12 + 's';
      
      container.appendChild(designElement);
    }

    // Create floating color swatches
    for (let i = 0; i < 8; i++) {
      const color = document.createElement('div');
      color.className = 'floating-color';
      color.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      color.style.left = Math.random() * 100 + '%';
      color.style.top = Math.random() * 100 + '%';
      color.style.animationDuration = Math.random() * 6 + 8 + 's';
      color.style.animationDelay = Math.random() * 10 + 's';
      
      container.appendChild(color);
    }
  }

  private createBlogAnimation(container: HTMLElement): void {
    // Create floating paper/document elements
    for (let i = 0; i < 6; i++) {
      const paper = document.createElement('div');
      paper.className = 'floating-knowledge';
      
      const width = Math.random() * 20 + 15;
      const height = Math.random() * 25 + 20;
      paper.style.width = width + 'px';
      paper.style.height = height + 'px';
      paper.style.background = `rgba(37, 99, 235, ${Math.random() * 0.3 + 0.1})`;
      paper.style.borderRadius = '2px';
      paper.style.border = '1px solid rgba(37, 99, 235, 0.2)';
      paper.style.animationDuration = Math.random() * 18 + 22 + 's';
      paper.style.animationDelay = Math.random() * 15 + 's';
      paper.style.position = 'relative';
      paper.style.boxShadow = '2px 2px 4px rgba(0,0,0,0.1)';
      
      container.appendChild(paper);
    }

    // Create floating idea bulbs
    for (let i = 0; i < 8; i++) {
      const idea = document.createElement('div');
      idea.className = 'floating-idea';
      idea.style.left = Math.random() * 100 + '%';
      idea.style.top = Math.random() * 100 + '%';
      idea.style.animationDuration = Math.random() * 4 + 3 + 's';
      idea.style.animationDelay = Math.random() * 6 + 's';
      idea.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
      
      container.appendChild(idea);
    }
  }

  private createContactAnimation(container: HTMLElement): void {
    // Create floating message bubble shapes
    for (let i = 0; i < 5; i++) {
      const messageBubble = document.createElement('div');
      messageBubble.className = 'floating-message';
      
      const width = Math.random() * 30 + 20;
      const height = Math.random() * 20 + 15;
      messageBubble.style.width = width + 'px';
      messageBubble.style.height = height + 'px';
      messageBubble.style.background = `rgba(37, 99, 235, ${Math.random() * 0.3 + 0.2})`;
      messageBubble.style.borderRadius = '15px 15px 15px 5px';
      messageBubble.style.left = Math.random() * 100 + '%';
      messageBubble.style.animationDuration = Math.random() * 16 + 20 + 's';
      messageBubble.style.animationDelay = Math.random() * 12 + 's';
      
      container.appendChild(messageBubble);
    }

    // Create floating connection signals
    for (let i = 0; i < 8; i++) {
      const signal = document.createElement('div');
      signal.className = 'floating-signal';
      signal.style.left = Math.random() * 100 + '%';
      signal.style.top = Math.random() * 100 + '%';
      signal.style.animationDuration = Math.random() * 3 + 2 + 's';
      signal.style.animationDelay = Math.random() * 4 + 's';
      
      container.appendChild(signal);
    }
  }

  initScrollAnimations(): void {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const animationElements = document.querySelectorAll(
      '.animate-on-scroll, .animate-left, .animate-right, .animate-scale, .animate-rotate'
    );
    
    animationElements.forEach((el) => {
      animationObserver.observe(el);
    });
  }

  animateSkillBars(): void {
    document.querySelectorAll('.skill-fill').forEach((bar, index) => {
      const element = bar as HTMLElement;
      const width = element.getAttribute('data-width');
      element.style.width = '0%';
      
      setTimeout(() => {
        element.style.transition = 'width 1.5s ease';
        element.style.width = width + '%';
      }, 100 * index);
    });
  }
}
