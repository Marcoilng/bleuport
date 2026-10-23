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
    <div className={`mark ${inverse ? 'mark--inverse' : ''}`} aria-label="Bleu">
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
      <span className="wordmark__text">Studio<br /><em>Bleu</em></span>
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
          <div className="mobile-menu__footer"><span>Abidjan · Paris</span><span>© 2024</span></div>
        </div>
      </div>

      <main>
        <section className="hero" ref={heroRef}>
          <div className="hero__meta reveal">
            <span>Portfolio / 2024</span>
            <span className="hero__meta-line" />
            <span>Direction créative</span>
          </div>
          <div className="hero__portrait-wrap reveal">
            <div className="hero__portrait-glow" />
            <div className="hero__portrait" role="img" aria-label="Portrait éditorial en noir et blanc" />
            <div className="hero__portrait-label">Portrait<br /><span>01 — 03</span></div>
          </div>
          <div className="hero__title reveal">
            <span className="hero__title-small">Créer du sens</span>
            <h1>Faire<br /><i>bouger</i><br />les lignes<span className="blue-dot">.</span></h1>
          </div>
          <div className="hero__side-note reveal"><span className="side-note-line" />Je conçois des<br />présences qui restent.</div>
          <div className="hero__bottom reveal">
            <a className="circle-arrow" href="#about" aria-label="Découvrir le portfolio"><span>↓</span></a>
            <span className="hero__bottom-copy">Scroll to explore</span>
            <span className="hero__bottom-index">01 <i>/</i> 05</span>
          </div>
          <div className="hero__giant-word" aria-hidden="true">BLEU</div>
        </section>

        <section className="intro section-pad" id="about">
          <div className="section-label reveal"><span>01</span><span className="section-label__line" /><span>Présentation</span></div>
          <div className="intro__grid">
            <h2 className="display display--intro reveal">Une voix claire<br />dans le bruit<span className="blue-dot">.</span></h2>
            <div className="intro__copy reveal">
              <p className="lead">Je suis une directrice créative et une raconteuse d’histoires. J’aide les marques, les talents et les idées à trouver la forme juste pour être vues, comprises et retenues.</p>
              <p>À la croisée de la stratégie, du contenu et de la culture, j’imagine des identités qui ont quelque chose à dire — et une manière singulière de le dire.</p>
              <a className="text-link" href="#contact">En savoir plus <Arrow /></a>
            </div>
          </div>
          <div className="intro__stamp reveal">Espace<br /><span>pour</span><br />les idées</div>
        </section>

        <section className="manifesto">
          <div className="manifesto__marquee" aria-hidden="true"><span>Stratégie · Création · Impact · Stratégie · Création · Impact · </span></div>
          <div className="section-pad manifesto__inner">
            <div className="section-label section-label--light reveal"><span>02</span><span className="section-label__line" /><span>Manifeste</span></div>
            <blockquote className="manifesto__quote reveal">“Les projets les plus forts ne cherchent pas à parler plus fort. Ils trouvent le ton qui sonne juste.”</blockquote>
            <div className="manifesto__footer reveal"><span>Une approche à taille humaine</span><span>→</span></div>
          </div>
        </section>

        <section className="trust section-pad">
          <div className="section-label reveal"><span>03</span><span className="section-label__line" /><span>Ils me font confiance</span></div>
          <div className="trust__heading reveal"><h2 className="display">Des histoires<br /><span>en mouvement</span><span className="blue-dot">.</span></h2><p>Des collaborations qui ont commencé par une conversation et continuent de grandir avec le temps.</p></div>
          <div className="logo-wall reveal" aria-label="Clients et partenaires">
            <span className="logo-word logo-word--serif">atelier</span><span className="logo-word logo-word--caps">NOMA</span><span className="logo-word logo-word--script">mosaïque</span><span className="logo-word logo-word--mono">KORA®</span><span className="logo-word logo-word--heavy">YANGO</span><span className="logo-word logo-word--outline">common<br />ground</span>
          </div>
        </section>

        <section className="projects section-pad" id="projects">
          <div className="section-label reveal"><span>04</span><span className="section-label__line" /><span>Projets sélectionnés</span></div>
          <div className="projects__heading reveal"><h2 className="display">Des idées<br /><i>en actes</i><span className="blue-dot">.</span></h2><p>Un aperçu des projets qui ont rythmé les dernières années. Faites défiler, la suite se construit ensemble.</p></div>
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
            <div className="contact__grid reveal"><h2 className="display display--light">Une idée<br /><i>en tête ?</i></h2><div><p>Les beaux projets commencent souvent par un message simple. Dites-moi ce qui vous anime, ce qui vous questionne, ce qui vous donne envie d’avancer.</p><a className="button button--light" href="mailto:bonjour@studio-bleu.com">bonjour@studio-bleu.com <Arrow /></a></div></div>
            <div className="contact__footer reveal"><Wordmark inverse /><div className="contact__footer-links"><span>Abidjan · Paris</span><span>Instagram · LinkedIn · X</span><span>© 2024 Studio Bleu</span></div></div>
          </div>
        </section>
      </main>

      <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Retour en haut">↑</button>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
