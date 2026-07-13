import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl'; // Import requis pour la résolution des chemins statiques
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/intro"> {/* Redirection vers votre doc principale */}
            Explorer le Framework 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Framework`}
      description="Framework multi-agents asynchrones orienté graphes et isolation Maker-Checker">
      <HomepageHeader />

      <main>
        {/* Section d'intégration de l'Architecture Globale */}
        <section className="container text--center margin-top--xl margin-bottom--xl">
          <Heading as="h2" className="margin-bottom--md">
            Architecture Globale du Framework
          </Heading>
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
            <img
              src={useBaseUrl('/img/Architecture_Globale.png')}
              alt="Architecture Globale Neuro-Scale"
              className="zoomable-img" // Classe lue par le plugin docusaurus-plugin-image-zoom
              style={{
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                cursor: 'zoom-in',
                width: '100%'
              }}
            />
          </div>
        </section>

        {/* Vos autres fonctionnalités modulaires */}
        <HomepageFeatures />
      </main>
    </Layout>
  );
}