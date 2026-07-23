import { Component, signal } from '@angular/core';
import { CountUpComponent } from '../../components/count-up/count-up';

@Component({
  selector: 'app-participa',
  standalone: true,
  imports: [CountUpComponent],
  template: `
    <div class="page-container">
      <!-- Header -->
      <section class="page-header text-center">
        <div class="header-badge">RED TAPALEHUI</div>
        <h1 class="page-title">Una Comunidad Sin Fronteras</h1>
        <p class="page-subtitle">
          No necesitas residir físicamente en Tapalehui para formar parte del ecosistema. Suma tus talentos, proyectos y vocación a una red global regenerativa.
        </p>
      </section>

      <!-- Grid Visual de Audiencias (9 Tarjetas) -->
      <section class="audiencias-section">
        <div class="section-title-wrap text-center">
          <span class="section-subtitle">¿A QUIÉN BUSCAMOS?</span>
          <h2 class="section-title">Encuentra Tu Perfil en la Red</h2>
          <p class="section-desc">Diversidad de roles articulados en un propósito común.</p>
        </div>

        <div class="audiencias-grid">
          @for (aud of audiencias; track aud.title) {
            <div class="audiencia-card">
              <div class="aud-icon">{{ aud.icon }}</div>
              <h3 class="aud-title">{{ aud.title }}</h3>
              <p class="aud-desc">{{ aud.desc }}</p>
            </div>
          }
        </div>
      </section>

      <!-- Áreas de Participación (3 Pilares de Acción) -->
      <section class="areas-section">
        <div class="section-title-wrap text-center">
          <span class="section-subtitle">CAMPOS DE ACCIÓN</span>
          <h2 class="section-title"><app-count-up end="3"></app-count-up> Áreas de Participación</h2>
        </div>

        <div class="areas-grid">
          <div class="area-card">
            <div class="area-tag">PILAR <app-count-up end="1"></app-count-up></div>
            <h3>Proyectos Productivos</h3>
            <p>
              Iniciativas de bio-agricultura, agregación de valor a la cosecha local, huertos medicinales y emprendimientos sostenibles con comercio justo.
            </p>
            <ul>
              <li>🌿 Agricultura Regenerativa</li>
              <li>🐝 Apicultura & Miel Orgánica</li>
              <li>🍞 Bioconstrucción y Talleres</li>
            </ul>
          </div>

          <div class="area-card highlight">
            <div class="area-tag">PILAR <app-count-up end="2"></app-count-up></div>
            <h3>Investigación en Sustentabilidad</h3>
            <p>
              Desarrollo de prototipos de ecotecnología, monitoreo de la biodiversidad, física de suelos y sistemas de purificación de agua sin químicos.
            </p>
            <ul>
              <li>📊 Monitoreo de Suelos</li>
              <li>💧 Tecnologías Hídricas</li>
              <li>☀️ Energías Renovables</li>
            </ul>
          </div>

          <div class="area-card">
            <div class="area-tag">PILAR <app-count-up end="3"></app-count-up></div>
            <h3>Educación Ambiental y Social</h3>
            <p>
              Seminarios, campamentos escolares, residencias artísticas y programas de formación para escuelas y comunidades vecinas.
            </p>
            <ul>
              <li>🎒 Visitas Guiadas Escolares</li>
              <li>🎨 Residencias Artísticas</li>
              <li>🧠 Talleres de Gobernanza</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Call to Action Principal "Quiero unirme" -->
      <section class="cta-join-section">
        <div class="cta-join-box text-center">
          <h2>¿Listo para dar el siguiente paso?</h2>
          <p>
            Completa tu registro en la Red Tapalehui y conecta con miembros, eventos y oportunidades de voluntariado.
          </p>
          <button (click)="openModal()" class="btn-join-main">
            ✨ Quiero Unirme a la Red
          </button>
        </div>
      </section>

      <!-- Modal "Quiero Unirme" -->
      @if (showModal()) {
        <div class="modal-backdrop" (click)="closeModal()">
          <div class="modal-content" (click)="$event.stopPropagation()">
            <button class="modal-close" (click)="closeModal()">✕</button>
            <h2 class="modal-title">Únete a la Red Tapalehui</h2>
            <p class="modal-subtitle">Indícanos tu perfil para ponernos en contacto contigo.</p>

            @if (formSubmitted()) {
              <div class="success-message">
                ✅ ¡Gracias por registrarte! Hemos recibido tu solicitud y te contactaremos en breve.
              </div>
            } @else {
              <form (submit)="submitForm($event)" class="modal-form">
                <div class="form-group">
                  <label>Nombre Completo</label>
                  <input type="text" required placeholder="Tu nombre" class="form-input" />
                </div>

                <div class="form-group">
                  <label>Correo Electrónico</label>
                  <input type="email" required placeholder="tu&#64;correo.com" class="form-input" />
                </div>

                <div class="form-group">
                  <label>Perfil de Participación</label>
                  <select class="form-input">
                    <option>Especialista / Investigador</option>
                    <option>Voluntario / Estudiante</option>
                    <option>Productor / Chef</option>
                    <option>Universidad / Escuela</option>
                    <option>Familia / Habitante</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>¿Cómo te gustaría colaborar?</label>
                  <textarea rows="3" placeholder="Platícanos tus áreas de interés..." class="form-input"></textarea>
                </div>

                <button type="submit" class="btn-submit-modal">Enviar Registro &rarr;</button>
              </form>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 3rem 1.5rem 5rem;
      display: flex;
      flex-direction: column;
      gap: 4rem;
    }

    .text-center { text-align: center; }

    .header-badge {
      display: inline-block;
      padding: 0.35rem 0.9rem;
      border-radius: 20px;
      background: var(--color-terracotta-bg);
      color: var(--color-terracotta);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
    }

    .page-title {
      font-family: 'Outfit', sans-serif;
      font-size: 2.75rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 0.75rem;
    }

    .page-subtitle {
      font-size: 1.1rem;
      color: var(--text-muted);
      max-width: 700px;
      margin: 0 auto;
    }

    .section-subtitle {
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      color: var(--color-brand-primary);
    }

    .section-title {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-main);
      margin: 0.4rem 0;
    }

    .section-desc {
      color: var(--text-muted);
      margin-bottom: 2rem;
    }

    /* Audiencias Grid (9 Tarjetas) */
    .audiencias-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .audiencia-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1.75rem;
      box-shadow: 0 4px 12px rgba(0,0,0,.06);
      transition: all 0.25s ease;
    }

    .audiencia-card:hover {
      transform: translateY(-4px);
      border-color: var(--border-highlight);
      box-shadow: 0 12px 28px rgba(0,0,0,.12);
      background: var(--card-bg-hover);
    }

    .aud-icon {
      font-size: 2.2rem;
      margin-bottom: 1rem;
    }

    .aud-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.4rem;
    }

    .aud-desc {
      font-size: 0.88rem;
      color: var(--text-muted);
      line-height: 1.5;
    }

    /* Áreas Grid */
    .areas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .area-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 2rem;
    }

    .area-card.highlight {
      background: var(--color-terracotta-bg);
      border-color: var(--color-terracotta);
    }

    .area-tag {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--color-terracotta);
      letter-spacing: 0.1em;
      margin-bottom: 0.75rem;
    }

    .area-card h3 {
      font-family: 'Outfit', sans-serif;
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 0.75rem;
    }

    .area-card p {
      font-size: 0.92rem;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 1.25rem;
    }

    .area-card ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 0.88rem;
      color: var(--color-brand-primary);
      font-weight: 600;
    }

    /* CTA Join */
    .cta-join-box {
      background: var(--bg-surface);
      border: 1px solid var(--border-highlight);
      border-radius: 24px;
      padding: 3.5rem 2rem;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
    }

    .cta-join-box h2 {
      font-family: 'Outfit', sans-serif;
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 0.75rem;
    }

    .cta-join-box p {
      color: var(--text-muted);
      max-width: 600px;
      margin: 0 auto 2rem;
    }

    .btn-join-main {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2.4rem;
      border-radius: 30px;
      background-color: #C67C52;
      color: #ffffff;
      font-family: 'Outfit', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      letter-spacing: 0.02em;
      border: 2px solid #C67C52;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(198, 124, 82, 0.45);
      transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
    }

    .btn-join-main:hover {
      transform: translateY(-3px);
      background-color: #B06940;
      box-shadow: 0 10px 28px rgba(198, 124, 82, 0.55);
    }

    /* Modal */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    .modal-content {
      background: #FFFFFF;
      border: 1px solid rgba(41, 92, 43, 0.25);
      border-radius: 20px;
      padding: 2.5rem;
      max-width: 500px;
      width: 100%;
      position: relative;
      color: #1F1F1F;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      animation: modalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both;
    }

    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.9) translateY(20px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    :host-context(body.dark-theme) .modal-content {
      background: #2B312B;
      border-color: rgba(160, 183, 107, 0.3);
      color: #F8F7F2;
    }

    .modal-close {
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
      background: rgba(0,0,0,0.06);
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4A5568;
      font-size: 1.1rem;
      cursor: pointer;
      line-height: 1;
    }

    :host-context(body.dark-theme) .modal-close {
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.15);
      color: #A0AEC0;
    }

    .modal-title {
      font-family: 'Outfit', sans-serif;
      font-size: 1.75rem;
      font-weight: 800;
      margin-bottom: 0.4rem;
      color: #1F1F1F;
    }

    :host-context(body.dark-theme) .modal-title {
      color: #F8F7F2;
    }

    .modal-subtitle {
      font-size: 0.9rem;
      color: #4A5568;
      margin-bottom: 1.5rem;
    }

    :host-context(body.dark-theme) .modal-subtitle {
      color: #A0AEC0;
    }

    .modal-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      text-align: left;
    }

    .form-group label {
      font-size: 0.85rem;
      font-weight: 700;
      color: #1F1F1F;
    }

    :host-context(body.dark-theme) .form-group label {
      color: #F8F7F2;
    }

    .form-input {
      padding: 0.75rem 1rem;
      border-radius: 10px;
      background: #F4F4F2;
      border: 1px solid rgba(0, 0, 0, 0.2);
      color: #1F1F1F;
      font-size: 0.9rem;
      width: 100%;
    }

    .form-input::placeholder {
      color: #9CA3AF;
    }

    :host-context(body.dark-theme) .form-input {
      background: #202520;
      border-color: rgba(255, 255, 255, 0.2);
      color: #F8F7F2;
    }

    :host-context(body.dark-theme) .form-input::placeholder {
      color: #6B7280;
    }

    .btn-submit-modal {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.9rem;
      border-radius: 30px;
      background-color: #295C2B;
      background-image: linear-gradient(135deg, #295C2B 0%, #1C421E 100%);
      color: #ffffff;
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: 0.02em;
      border: 1.5px solid #295C2B;
      cursor: pointer;
      margin-top: 0.5rem;
      width: 100%;
      box-shadow: 0 4px 16px rgba(41, 92, 43, 0.32);
      transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
    }

    .btn-submit-modal:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(41, 92, 43, 0.45);
      opacity: 0.92;
    }

    :host-context(body.dark-theme) .btn-submit-modal {
      background-color: #497541;
      background-image: linear-gradient(135deg, #497541 0%, #295C2B 100%);
    }

    .success-message {
      background: var(--color-terracotta-bg);
      border: 1px solid var(--color-terracotta);
      padding: 1.25rem;
      border-radius: 12px;
      color: var(--color-terracotta);
      text-align: center;
      font-weight: 700;
    }
  `]
})
export class ParticipaComponent {
  showModal = signal(false);
  formSubmitted = signal(false);

  openModal() {
    this.showModal.set(true);
    this.formSubmitted.set(false);
  }

  closeModal() {
    this.showModal.set(false);
  }

  submitForm(e: Event) {
    e.preventDefault();
    this.formSubmitted.set(true);
    setTimeout(() => {
      this.closeModal();
    }, 2500);
  }

  audiencias = [
    { icon: '🏡', title: 'Habitantes', desc: 'Residentes de La Vista y la zona que buscan construir tejido social activo.' },
    { icon: '🔬', title: 'Especialistas', desc: 'Ingenieros, arquitectos bioclimáticos y biólogos para proyectos clave.' },
    { icon: '📚', title: 'Investigadores', desc: 'Académicos en permacultura, física de suelos y dinámicas sociales.' },
    { icon: '🧑‍🌾', title: 'Productores', desc: 'Agricultores locales que suman cosechas y técnicas regenerativas.' },
    { icon: '🍳', title: 'Chefs', desc: 'Gastrónomos enfocados en cocina de origen y consumo responsable.' },
    { icon: '🏛️', title: 'Universidades', desc: 'Instituciones para prácticas profesionales y estancias de campo.' },
    { icon: '🎒', title: 'Escuelas', desc: 'Comunidades educativas para talleres y concientización ambiental.' },
    { icon: '👨‍👩‍👧‍👦', title: 'Familias', desc: 'Grupos familiares buscando contacto directo con la tierra y el bienestar.' },
    { icon: '🎓', title: 'Estudiantes', desc: 'Jóvenes aprendices y voluntarios en faenas y ecotecnología.' }
  ];
}
