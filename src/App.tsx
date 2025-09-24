import { useTranslation } from 'react-i18next';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import './App.css';

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
      </main>
      <Footer />
    </>
  );
}

const Header = () => {
  const { t, i18n } = useTranslation();
  return(
    <header className="header">
      <div className="container">
        <div className="logo">{t('companyName')}</div>
        <nav className="nav">
          <a href="#about">{t('nav.about')}</a>
          <a href="#services">{t('nav.services')}</a>
        </nav>
        <div className="language-switcher">
          <button onClick={() => i18n.changeLanguage('en')}>EN</button>
          <button onClick={() => i18n.changeLanguage('ko')}>KR</button>
        </div>
      </div>
    </header>
  )
};

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="hero">
      <div className="container">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
          {t('hero.title')}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          {t('hero.subtitle')}
        </motion.p>
      </div>
    </section>
  );
};

const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="section">
      <div className="container">
        <AnimatedSection>
          <h2>{t('about.title')}</h2>
          <div className="about-content">
            <p>{t('about.content')}</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

const Services = () => {
  const { t } = useTranslation();
  const serviceList = t('services.service_list', { returnObjects: true }) as { title: string, description: string }[];
  return (
    <section id="services" className="section">
      <div className="container">
        <AnimatedSection>
          <h2>{t('services.title')}</h2>
          <p>{t('services.content')}</p>
          <ul className="service-list">
            {serviceList.map((item) => (
               <li 
                key={item.title} 
                className="service-item"
               >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
               </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <p>{t('footer.copy')}</p>
      </div>
    </footer>
  );
};

export default App;
