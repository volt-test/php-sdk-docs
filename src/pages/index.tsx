import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import DocsWaitlistForm from '@site/src/components/DocsWaitlistForm';


import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <span className="gradient-text">Performance Testing</span>
          <br />
          <span style={{ color: 'var(--vt-blue-darker)' }}>for PHP & Laravel.</span>
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <div className={styles.codeShowcase}>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>Quick Example</div>
            <pre className={styles.codePre}>
              <code className={styles.codeContent}>
                <span className={styles.tokenVariable}>$volt</span> = (<span className={styles.tokenKeyword}>new</span> <span className={styles.tokenClass}>VoltTest</span>(<span className={styles.tokenString}>'Load Test'</span>)){'\n'}
                {'    '}-&gt;<span className={styles.tokenFunction}>setVirtualUsers</span>(<span className={styles.tokenNumber}>50</span>); <span className={styles.tokenComment}>// 50 users</span>{'\n'}
                {'\n'}
                <span className={styles.tokenVariable}>$volt</span>-&gt;<span className={styles.tokenFunction}>scenario</span>(<span className={styles.tokenString}>'Checkout Flow'</span>){'\n'}
                {'    '}-&gt;<span className={styles.tokenFunction}>step</span>(<span className={styles.tokenString}>'Visit Home'</span>){'\n'}
                {'    '}-&gt;<span className={styles.tokenFunction}>get</span>(<span className={styles.tokenString}>'https://api.app.com'</span>){'\n'}
                {'    '}-&gt;<span className={styles.tokenFunction}>validateStatus</span>(<span className={styles.tokenString}>'status'</span>, <span className={styles.tokenNumber}>200</span>);{'\n'}
                {'\n'}
                <span className={styles.tokenVariable}>$volt</span>-&gt;<span className={styles.tokenFunction}>run</span>(<span className={styles.tokenKeyword}>true</span>); <span className={styles.tokenComment}>// Stream to console</span>
              </code>
            </pre>
          </div>
        </div>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/what-is-volttest">
            What is VoltTest?
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/introduction">
            PHP SDK Docs →
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/laravel/laravel-installation">
            Laravel Docs →
          </Link>
        </div>
      </div>
    </header>
  );
}

function EarlyAccessSection() {
  return (
    <section className="margin-vert--lg">
      <div className="container">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <DocsWaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}


export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="VoltTest documentation — performance testing platform for PHP and Laravel. Write tests in PHP, scale to millions of virtual users on the cloud, and analyze results in real-time.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <EarlyAccessSection />
      </main>
    </Layout>
  );
}
