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

  // Community Details State (Zig-Zag)
  protected readonly selectedCommunity = signal<any | null>(null);

  // Community Blog State
  protected readonly selectedCommunityBlog = signal<any | null>(null);
  protected readonly newCommentText = signal<Record<string, string>>({});
  protected readonly expandedComments = signal<Set<string>>(new Set());

  // --- Admin State ---
  protected readonly isAdminMode = signal(false);
  protected readonly showLoginPage = signal(false);
  protected readonly activeAdminModule = signal('ZigZag'); // 'ZigZag', 'Comunidades', 'Usuarios'
  
  // Admin Editing State
  protected readonly showEditModal = signal(false);
  protected readonly editingItem = signal<any | null>(null);
  protected readonly editingModule = signal<string>('');

  protected readonly featuredCommunities = signal([
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
    }
  ]);

  protected readonly allCommunities = signal([
    { id: 'c1', title: 'Residencial Aurora', members: 320, status: 'Activa', description: 'Desarrollos en marcha: Parques y Seguridad IoT.' },
    { id: 'c2', title: 'Club Tecno Distrito', members: 1450, status: 'Activa', description: 'Compartiendo proyectos Open Source y Robótica.' },
    { id: 'c3', title: 'Ecovalle Sostenible', members: 0, status: 'Próximamente', description: 'Comunidad en fase de planificación de bio-huertos.' }
  ]);

  protected readonly adminUsers = signal([
    { id: 'u1', name: 'Carlos Admin', email: 'carlos@admin.com', role: 'Super Admin', status: 'Activo' },
    { id: 'u2', name: 'Laura Gestora', email: 'laura@community.com', role: 'Gestor', status: 'Activo' },
    { id: 'u3', name: 'Pedro Ventas', email: 'pedro@ventas.com', role: 'Asesor', status: 'Deshabilitado' }
  ]);

  // Blog data for "Residencial Aurora"
  protected readonly communityBlogData = {
    id: 'aurora',
    name: 'Residencial Aurora',
    coverImage: 'assets/image2.jpeg',
    profileImage: 'assets/image3.jpeg',
    description: 'Bienvenidos al espacio oficial de Residencial Aurora. Aquí encontrarás las últimas noticias, avisos y actividades de nuestra comunidad. Un lugar donde la naturaleza y la arquitectura moderna se encuentran.',
    members: 320,
    status: 'Activa',
    location: 'Valle Central, Ciudad Verde',
    founded: 'Enero 2021',
    contact: 'admin@residencialaurora.com'
  };

  protected communityPosts: any[] = [
    {
      id: 'post1',
      author: 'Administración Aurora',
      authorInitials: 'AA',
      authorColor: '#556B2F',
      date: 'Hace 2 horas',
      content: '📢 Recordatorio: La reunión mensual de condóminos será este sábado 14 de junio a las 10:00 AM en el Salón de Usos Múltiples. Agenda: revisión del presupuesto Q3, proyecto de iluminación LED y elección de comité de jardines. ¡Su participación es muy importante para nosotros!',
      image: 'assets/image4.jpeg',
      reactions: { like: 24, heart: 8, clap: 5 },
      userReaction: null as string | null,
      comments: [
        { id: 'c1', author: 'María González', initials: 'MG', color: '#7A8F4D', text: '¡Confirmado! Ahí estaremos 👍', date: 'Hace 1 hora' },
        { id: 'c2', author: 'Carlos Ramírez', initials: 'CR', color: '#8B6914', text: '¿Habrá estacionamiento disponible para visitantes?', date: 'Hace 45 min' },
        { id: 'c3', author: 'Laura Mendez', initials: 'LM', color: '#6B4C9A', text: 'Excelente iniciativa, espero que podamos avanzar con el proyecto de jardines 🌿', date: 'Hace 30 min' }
      ]
    },
    {
      id: 'post2',
      author: 'Comité de Jardines',
      authorInitials: 'CJ',
      authorColor: '#2E7D4F',
      date: 'Ayer a las 3:00 PM',
      content: '🌱 ¡Gran noticia! Esta semana comenzamos la siembra de las nuevas áreas verdes en el sector norte. Plantaremos 45 árboles nativos y un jardín de plantas aromáticas para todos los residentes. ¡Gracias a todos los que se sumaron al comité voluntario!',
      image: 'assets/image3.jpeg',
      reactions: { like: 61, heart: 32, clap: 18 },
      userReaction: null as string | null,
      comments: [
        { id: 'c4', author: 'Roberto Silva', initials: 'RS', color: '#C0552A', text: '¡Qué proyecto tan hermoso! Me apunto para ayudar el fin de semana 🙌', date: 'Ayer' },
        { id: 'c5', author: 'Ana López', initials: 'AL', color: '#1A6B8A', text: 'Me encantan las plantas aromáticas, ¿habrá lavanda?', date: 'Ayer' }
      ]
    },
    {
      id: 'post3',
      author: 'Seguridad Aurora',
      authorInitials: 'SA',
      authorColor: '#374151',
      date: 'Hace 3 días',
      content: '🔒 Aviso de seguridad: A partir del próximo lunes entrarán en operación las nuevas cámaras de circuito cerrado instaladas en los accesos principales, estacionamiento y áreas comunes. El sistema incluye detección inteligente de movimiento y almacenamiento en la nube por 30 días.',
      image: null,
      reactions: { like: 48, heart: 5, clap: 12 },
      userReaction: null as string | null,
      comments: [
        { id: 'c6', author: 'Pedro Vargas', initials: 'PV', color: '#7C3D8A', text: 'Excelente medida, estábamos esperando esto 👏', date: 'Hace 3 días' }
      ]
    }
  ];

  protected setActiveTab(tab: string): void {
    this.activeTab.set(tab);
    this.selectedCommunity.set(null);
    this.selectedCommunityBlog.set(null);
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
    setTimeout(() => this.setupIntersectionObserver(), 100);
  }

  // --- Blog Methods ---
  protected openCommunityBlog(): void {
    this.selectedCommunityBlog.set(this.communityBlogData);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected closeCommunityBlog(): void {
    this.selectedCommunityBlog.set(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected reactToPost(postId: string, reactionType: string): void {
    const post = this.communityPosts.find(p => p.id === postId);
    if (!post) return;
    if (post.userReaction === reactionType) {
      post.reactions[reactionType]--;
      post.userReaction = null;
    } else {
      if (post.userReaction) {
        post.reactions[post.userReaction]--;
      }
      post.reactions[reactionType]++;
      post.userReaction = reactionType;
    }
    this.communityPosts = [...this.communityPosts];
  }

  protected toggleComments(postId: string): void {
    const current = this.expandedComments();
    const next = new Set(current);
    if (next.has(postId)) {
      next.delete(postId);
    } else {
      next.add(postId);
    }
    this.expandedComments.set(next);
  }

  protected isCommentsExpanded(postId: string): boolean {
    return this.expandedComments().has(postId);
  }

  protected getCommentText(postId: string): string {
    return this.newCommentText()[postId] || '';
  }

  protected setCommentText(postId: string, value: string): void {
    this.newCommentText.update(prev => ({ ...prev, [postId]: value }));
  }

  protected addComment(postId: string): void {
    const text = this.getCommentText(postId).trim();
    if (!text) return;
    const post = this.communityPosts.find(p => p.id === postId);
    if (!post) return;
    post.comments.push({
      id: `c${Date.now()}`,
      author: 'Tú',
      initials: 'TU',
      color: '#556B2F',
      text,
      date: 'Ahora'
    });
    this.communityPosts = [...this.communityPosts];
    this.setCommentText(postId, '');
    const next = new Set(this.expandedComments());
    next.add(postId);
    this.expandedComments.set(next);
  }

  protected getTotalReactions(post: any): number {
    return (post.reactions.like || 0) + (post.reactions.heart || 0) + (post.reactions.clap || 0);
  }

  // --- Admin Methods ---
  protected openLoginPage(): void {
    this.showLoginPage.set(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected closeLoginPage(): void {
    this.showLoginPage.set(false);
  }

  protected submitLogin(): void {
    this.showLoginPage.set(false);
    this.isAdminMode.set(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected logoutAdmin(): void {
    this.isAdminMode.set(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  protected switchAdminModule(moduleName: string): void {
    this.activeAdminModule.set(moduleName);
  }

  protected openEditModal(moduleName: string, item: any | null = null): void {
    this.editingModule.set(moduleName);
    if (item) {
      this.editingItem.set({ ...item }); // clone to edit
    } else {
      let newItem: any = { id: `new_${Date.now()}` };
      if (moduleName === 'ZigZag') {
        newItem = { ...newItem, badge: '', title: '', description: '', image: 'assets/image2.jpeg', stats: { residents: 0, amenities: 0, phase: '' } };
      } else if (moduleName === 'Comunidades') {
        newItem = { ...newItem, title: '', members: 0, status: 'Activa', description: '' };
      } else if (moduleName === 'Usuarios') {
        newItem = { ...newItem, name: '', email: '', role: 'Gestor', status: 'Activo' };
      }
      this.editingItem.set(newItem);
    }
    this.showEditModal.set(true);
  }

  protected closeEditModal(): void {
    this.showEditModal.set(false);
    this.editingItem.set(null);
  }

  protected saveEdit(): void {
    const module = this.editingModule();
    const item = this.editingItem();
    if (!item) return;

    if (module === 'ZigZag') {
      const current = [...this.featuredCommunities()];
      const index = current.findIndex(i => i.id === item.id);
      if (index >= 0) current[index] = item;
      else current.push(item);
      this.featuredCommunities.set(current);
    } else if (module === 'Comunidades') {
      const current = [...this.allCommunities()];
      const index = current.findIndex(i => i.id === item.id);
      if (index >= 0) current[index] = item;
      else current.push(item);
      this.allCommunities.set(current);
    } else if (module === 'Usuarios') {
      const current = [...this.adminUsers()];
      const index = current.findIndex(i => i.id === item.id);
      if (index >= 0) current[index] = item;
      else current.push(item);
      this.adminUsers.set(current);
    }
    
    this.closeEditModal();
  }

  protected deleteItem(moduleName: string, id: string): void {
    if (moduleName === 'ZigZag') {
      this.featuredCommunities.update(arr => arr.filter(i => i.id !== id));
    } else if (moduleName === 'Comunidades') {
      this.allCommunities.update(arr => arr.filter(i => i.id !== id));
    } else if (moduleName === 'Usuarios') {
      this.adminUsers.update(arr => arr.filter(i => i.id !== id));
    }
  }

  protected updateEditingItemField(field: string, value: any): void {
    const current = this.editingItem();
    if (current) {
      if (field.includes('.')) {
        const parts = field.split('.');
        if (parts.length === 2) {
          const mainField = parts[0];
          const subField = parts[1];
          this.editingItem.set({
            ...current,
            [mainField]: {
              ...current[mainField],
              [subField]: value
            }
          });
        }
      } else {
        this.editingItem.set({ ...current, [field]: value });
      }
    }
  }

  // --- Theme ---
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

  // --- Carousel ---
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
