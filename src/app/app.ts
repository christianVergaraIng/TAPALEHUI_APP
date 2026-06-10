import { Component, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  protected readonly title = signal('community-app');
  protected readonly activeTab = signal('Inicio');
  protected readonly menuItems = ['Inicio', 'Quienes Somos', 'Comunidades', 'Desarrollos'];
  protected readonly isDarkMode = signal(true);
  
  // Carousel State
  protected readonly currentSlideIndex = signal(0);
  private observer: IntersectionObserver | null = null;

  // Community Details State
  protected readonly selectedCommunity = signal<any | null>(null);

  protected readonly featuredCommunities = [
    {
      id: 'c1',
      badge: 'Residencial',
      title: 'Residencial Aurora',
      description: 'Ubicado en el corazón del valle, Aurora ofrece una vida en perfecta armonía con la naturaleza, donde la arquitectura moderna y la sostenibilidad convergen.',
      image: 'assets/image2.jpeg',
      stats: { residents: 120, amenities: 8, phase: 'Completado' }
    },
    {
      id: 'c2',
      badge: 'Eco-Aldea',
      title: 'Ecovalle Sostenible',
      description: 'Una comunidad diseñada para el futuro. Cuenta con paneles solares, sistemas de captación de agua y bio-huertos que garantizan una huella de carbono neutral.',
      image: 'assets/image3.jpeg',
      stats: { residents: 45, amenities: 12, phase: 'En Construcción' }
    },
    {
      id: 'c3',
      badge: 'Tecnología',
      title: 'Torre Prisma Digital',
      description: 'El primer desarrollo vertical inteligente de la ciudad, con domótica integrada en cada departamento y conectividad total en áreas comunes.',
      image: 'assets/image4.jpeg',
      stats: { residents: 300, amenities: 5, phase: 'Pre-venta' }
    },
    {
      id: 'c4',
      badge: 'Exclusivo',
      title: 'Altos del Bosque',
      description: 'Lujo y privacidad en su máxima expresión. Villas exclusivas rodeadas de bosque protegido, con diseño minimalista y vistas espectaculares.',
      image: 'assets/image2.jpeg',
      stats: { residents: 24, amenities: 4, phase: 'Completado' }
    }
  ];

  protected setActiveTab(tab: string): void {
    this.activeTab.set(tab);
    this.selectedCommunity.set(null); // Reset detail view when changing tabs
    // Re-initialize animations after view switches if needed
    if (tab === 'Inicio') {
      setTimeout(() => this.setupIntersectionObserver(), 100);
    }
  }

  protected viewCommunityDetails(community: any): void {
    this.selectedCommunity.set(community);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected closeCommunityDetails(): void {
    this.selectedCommunity.set(null);
    setTimeout(() => this.setupIntersectionObserver(), 100); // re-init observer when going back to list
  }

  protected toggleTheme(): void {
    const nextMode = !this.isDarkMode();
    this.isDarkMode.set(nextMode);
    this.applyThemeClasses(nextMode);
  }

  private applyThemeClasses(isDark: boolean): void {
    if (isDark) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  // Carousel Methods
  protected goToSlide(index: number): void {
    this.currentSlideIndex.set(index);
  }

  protected nextSlide(): void {
    this.currentSlideIndex.update(i => (i + 1) % 3);
  }

  protected prevSlide(): void {
    this.currentSlideIndex.update(i => (i === 0 ? 2 : i - 1));
  }

  ngAfterViewInit(): void {
    this.applyThemeClasses(this.isDarkMode());
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Create new observer to detect when 35% of an element is visible
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Once animated, stop observing this element
          this.observer?.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.35,
      rootMargin: '0px'
    });

    // Observe all .scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      this.observer?.observe(el);
    });
  }
}
