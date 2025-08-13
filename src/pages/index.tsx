import type {ReactNode} from 'react';
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
  const {siteConfig} = useDocusaurusContext();
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
            to="/docs/getting-started">
            Build your first stress test in 5 minutes ⚡️
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
  const {siteConfig} = useDocusaurusContext();
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
