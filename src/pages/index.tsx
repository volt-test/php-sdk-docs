import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import CookieConsent from '@site/src/components/CookieConsent';
import BrowserOnly from '@docusaurus/BrowserOnly';
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
          <span style={{ color: 'var(--vt-blue-darker)' }}>Reimagined.</span>
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
            to="/docs/getting-started">
            Get Started in 5 Minutes ⚡️
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/introduction">
            View Documentation →
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
          <div className="col col--8 col--offset-2">
            <div className="text--center margin-bottom--sm">
              <Heading as="h2">Join Volt-Test Cloud Early Access</Heading>
              <p>Be first to run massive, distributed tests in the cloud. Limited seats.</p>
            </div>

            {/* Render on client only to avoid SSR/hydration issues with Turnstile */}
            <BrowserOnly fallback={<div className="card"><div className="card__body">Loading…</div></div>}>
              {() => <DocsWaitlistForm />}
            </BrowserOnly>
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
      description="Volt-Test PHP SDK documentation - Integrate performance testing into your PHP applications with ease. Build and run test scenarios, monitor metrics, and optimize performance with Volt-Test's powerful tools.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <EarlyAccessSection />
        <CookieConsent />
      </main>
    </Layout>
  );
}
