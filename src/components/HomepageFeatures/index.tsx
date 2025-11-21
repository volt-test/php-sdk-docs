import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Native PHP SDK',
    Svg: require('@site/static/img/code-icon.svg').default,
    description: (
      <>
        Write tests in the language you love. Seamless integration with Laravel, Symfony, and more.
      </>
    ),
  },
  {
    title: 'Blazing Fast',
    Svg: require('@site/static/img/lightning-icon.svg').default,
    description: (
      <>
        Powered by a high-performance Go engine to simulate thousands of concurrent users efficiently.
      </>
    ),
  },
  {
    title: 'Scenario Management',
    Svg: require('@site/static/img/layers-icon.svg').default,
    description: (
      <>
        Define complex user flows with weights, think times, and custom data providers.
      </>
    ),
  },
  {
    title: 'Real-time Metrics',
    Svg: require('@site/static/img/activity-icon.svg').default,
    description: (
      <>
        Watch your tests run in real-time with detailed CLI output and aggregated reports.
      </>
    ),
  },
  {
    title: 'Resource Efficient',
    Svg: require('@site/static/img/cpu-icon.svg').default,
    description: (
      <>
        Minimal memory footprint allows you to run massive loads from a single machine.
      </>
    ),
  },
  {
    title: 'Detailed Reporting',
    Svg: require('@site/static/img/chart-icon.svg').default,
    description: (
      <>
        Get comprehensive insights into latency, throughput, and error rates.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className="text--center">
          <div className={styles.featureSvgWrapper}>
            <Svg className={styles.featureSvg} role="img" />
          </div>
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
