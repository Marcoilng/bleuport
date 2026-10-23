import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const socialLinks = [
  { label: 'LinkedIn', short: 'in', href: '#' },
  { label: 'Instagram', short: '◎', href: '#' },
  { label: 'X', short: '𝕏', href: '#' },
];

const projects = [
  {
    number: '01',
    year: '2024',
    title: 'Faire circuler les idées.',
    category: 'Direction éditoriale · Stratégie',
    description: 'Une plateforme éditoriale imaginée pour donner une voix claire aux récits qui transforment les territoires, les entreprises et les imaginaires.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
    accent: '#2448f5',
  },
  {
    number: '02',
    year: '2023',
    title: 'Rendre visible l’invisible.',
    category: 'Branding · Campagne',
    description: 'Une identité graphique vive et sensible pour accompagner une nouvelle génération de créatrices et de créateurs engagés.',
    image: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1400&q=85',
    accent: '#111111',
  },
  {
    number: '03',
    year: '2022',
    title: 'Le futur se raconte maintenant.',
    category: 'Contenu · Influence',
    description: 'Un écosystème de contenus, d’événements et de prises de parole pensé pour créer du lien au-delà de l’écran.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85',
    accent: '#d9d9d4',
  },
];

function Arrow({ direction = 'right' }) {
  return <span className={`arrow arrow--${direction}`} aria-hidden="true">{direction === 'right' ? '↗' : '↙'}</span>;
}

function Mark({ inverse = false }) {
  return (
    <div className={`mark ${inverse ? 'mark--inverse' : ''}`} aria-label="Logo Marco Ilunga">
      <span className="mark__block mark__block--one" />
      <span className="mark__block mark__block--two" />
      <span className="mark__block mark__block--three" />
      <span className="mark__dot" />
    </div>
  );
}

function Wordmark({ inverse = false }) {
  return (
    <a className={`wordmark ${inverse ? 'wordmark--inverse' : ''}`} href="#top" aria-label="Retour en haut">
      <Mark inverse={inverse} />
      <span className="wordmark__text">Marco<br /><em>Ilunga</em></span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectIndex, setProjectIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const heroRef = useRef(null);
  const project = projects[projectIndex];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    const onPointer = (event) => setCursor({ x: event.clientX, y: event.clientY });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
      revealObserver.disconnect();
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const goToProject = (direction) => {
    setProjectIndex((current) => (current + direction + projects.length) % projects.length);
  };

  return (
    <div className="site-shell" id="top">
      <div className="cursor-dot" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }} />
      <div className="scroll-progress" style={{ transform: `scaleX(${scrolled ? 1 : 0})` }} />

      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <Wordmark />
        <nav className="desktop-nav" aria-label="Navigation principale">
          <a href="#about">À propos <span>01</span></a>
          <a href="#projects">Projets <span>02</span></a>
          <a href="#contact">Contact <span>03</span></a>
        </nav>
        <div className="header-tools">
          <div className="socials">
            {socialLinks.map((social) => <a key={social.label} href={social.href} aria-label={social.label}>{social.short}</a>)}
          </div>
          <button className={`menu-toggle ${menuOpen ? 'menu-toggle--open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu" aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__inner">
          <p className="eyebrow eyebrow--light">Navigation</p>
          <a href="#about" onClick={closeMenu}>À propos <span>01</span></a>
          <a href="#projects" onClick={closeMenu}>Projets <span>02</span></a>
          <a href="#contact" onClick={closeMenu}>Contact <span>03</span></a>
          <div className="mobile-menu__footer"><span>Kinshasa · Paris</span><span>© 2024</span></div>
        </div>
      </div>

      <main>
        <section className="hero" ref={heroRef}>
          <div className="hero__meta reveal">
            <span>Portfolio / 2024</span>
            <span className="hero__meta-line" />
            <span>Product &amp; web</span>
          </div>
          <div className="hero__portrait-wrap reveal">
            <div className="hero__portrait-glow" />
            <div className="hero__portrait" role="img" aria-label="Avatar professionnel de Marco Ilunga" />
            <div className="hero__portrait-label">Portrait<br /><span>01 — 03</span></div>
          </div>
          <div className="hero__title reveal">
            <span className="hero__title-small">Construire avec intention</span>
            <h1>Donner<br /><i>forme</i><br />aux idées<span className="blue-dot">.</span></h1>
          </div>
          <div className="hero__side-note reveal"><span className="side-note-line" />Je transforme le code<br />en expériences utiles.</div>
          <div className="hero__bottom reveal">
            <a className="circle-arrow" href="#about" aria-label="Découvrir le portfolio"><span>↓</span></a>
            <span className="hero__bottom-copy">Scroll to explore</span>
            <span className="hero__bottom-index">01 <i>/</i> 05</span>
          </div>
          <div className="hero__giant-word" aria-hidden="true">MARCO</div>
        </section>

        <section className="intro section-pad" id="about">
          <div className="section-label reveal"><span>01</span><span className="section-label__line" /><span>Présentation</span></div>
          <div className="intro__grid">
            <h2 className="display display--intro reveal">Un esprit clair<br />dans le système<span className="blue-dot">.</span></h2>
            <div className="intro__copy reveal">
              <p className="lead">Je suis Marco Ilunga, développeur et créateur digital. Je conçois des expériences web rapides, lisibles et mémorables pour transformer une intention en produit.</p>
              <p>À la croisée du design, du code et de la stratégie, je construis des interfaces qui restent simples à utiliser et solides dans le temps.</p>
              <a className="text-link" href="#contact">En savoir plus <Arrow /></a>
            </div>
          </div>
          <div className="intro__stamp reveal">Code<br /><span>avec</span><br />intention</div>
        </section>

        <section className="manifesto">
          <div className="manifesto__marquee" aria-hidden="true"><span>Stratégie · Création · Impact · Stratégie · Création · Impact · </span></div>
          <div className="section-pad manifesto__inner">
            <div className="section-label section-label--light reveal"><span>02</span><span className="section-label__line" /><span>Manifeste</span></div>
            <blockquote className="manifesto__quote reveal">“La meilleure technologie est celle qui disparaît derrière une expérience évidente.”</blockquote>
            <div className="manifesto__footer reveal"><span>Design · Frontend · Impact</span><span>→</span></div>
          </div>
        </section>

        <section className="trust section-pad">
          <div className="section-label reveal"><span>03</span><span className="section-label__line" /><span>Ils me font confiance</span></div>
          <div className="trust__heading reveal"><h2 className="display">Des systèmes<br /><span>en mouvement</span><span className="blue-dot">.</span></h2><p>Des projets qui commencent par une question claire et deviennent des outils utilisés au quotidien.</p></div>
          <div className="logo-wall reveal" aria-label="Clients et partenaires">
            <span className="logo-word logo-word--serif">atelier</span><span className="logo-word logo-word--caps">NOMA</span><span className="logo-word logo-word--script">mosaïque</span><span className="logo-word logo-word--mono">KORA®</span><span className="logo-word logo-word--heavy">YANGO</span><span className="logo-word logo-word--outline">common<br />ground</span>
          </div>
        </section>

        <section className="projects section-pad" id="projects">
          <div className="section-label reveal"><span>04</span><span className="section-label__line" /><span>Projets sélectionnés</span></div>
          <div className="projects__heading reveal"><h2 className="display">Des idées<br /><i>en produits</i><span className="blue-dot">.</span></h2><p>Un aperçu des expériences web, interfaces et systèmes qui ont rythmé les dernières années.</p></div>
          <div className="project-showcase reveal">
            <div className="project-showcase__image" style={{ backgroundImage: `url(${project.image})` }}>
              <div className="project-showcase__overlay" />
              <span className="project-showcase__number">{project.number}</span>
              <span className="project-showcase__year">{project.year}</span>
              <span className="project-showcase__tag">Voir le projet <Arrow /></span>
            </div>
            <div className="project-showcase__detail">
              <p className="eyebrow">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-showcase__controls"><button onClick={() => goToProject(-1)} aria-label="Projet précédent">←</button><span>Projet {projectIndex + 1} <i>/</i> {projects.length}</span><button onClick={() => goToProject(1)} aria-label="Projet suivant">→</button></div>
            </div>
          </div>
          <div className="project-list reveal">{projects.map((item, index) => <button key={item.number} className={index === projectIndex ? 'project-list__item project-list__item--active' : 'project-list__item'} onClick={() => setProjectIndex(index)}><span>{item.number}</span><span>{item.title}</span><span>{item.category}</span></button>)}</div>
        </section>

        <section className="contact" id="contact">
          <div className="contact__giant">PARLONS<span className="blue-dot">.</span></div>
          <div className="section-pad contact__inner">
            <div className="section-label section-label--light reveal"><span>05</span><span className="section-label__line" /><span>La suite</span></div>
            <div className="contact__grid reveal"><h2 className="display display--light">Un projet<br /><i>en tête ?</i></h2><div><p>Les bons produits commencent par une conversation claire. Parlons de ce que tu veux construire, améliorer ou rendre plus simple.</p><a className="button button--light" href="mailto:hello@marcoilunga.com">hello@marcoilunga.com <Arrow /></a></div></div>
            <div className="contact__footer reveal"><Wordmark inverse /><div className="contact__footer-links"><span>Kinshasa · Paris</span><span>LinkedIn · GitHub · X</span><span>© 2024 Marco Ilunga</span></div></div>
          </div>
        </section>
      </main>

      <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Retour en haut">↑</button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
