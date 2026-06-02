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
    title: 'Write Tests in PHP',
    Svg: require('@site/static/img/code-icon.svg').default,
    description: (
      <>
        Native PHP SDK with fluent API. First-class Laravel integration with Artisan commands and PHPUnit assertions.
      </>
    ),
  },
  {
    title: 'Go-Powered Engine',
    Svg: require('@site/static/img/lightning-icon.svg').default,
    description: (
      <>
        High-performance Go engine simulates thousands of concurrent users with minimal memory and CPU.
      </>
    ),
  },
  {
    title: 'Cloud Scalable',
    Svg: require('@site/static/img/layers-icon.svg').default,
    description: (
      <>
        Run locally for development or scale to 10M+ virtual users on VoltTest Cloud across multiple regions.
      </>
    ),
  },
  {
    title: 'Real-Time Dashboard',
    Svg: require('@site/static/img/activity-icon.svg').default,
    description: (
      <>
        Live metrics, response time charts, and error analysis. Watch your tests run as they happen.
      </>
    ),
  },
  {
    title: 'Laravel Native',
    Svg: require('@site/static/img/cpu-icon.svg').default,
    description: (
      <>
        Artisan commands, route discovery, CSRF handling, PHPUnit integration, and performance assertions out of the box.
      </>
    ),
  },
  {
    title: 'Flexible Load Profiles',
    Svg: require('@site/static/img/chart-icon.svg').default,
    description: (
      <>
        Constant load, staged ramp-up, spike tests, stress tests, and soak tests. Multi-region distribution included.
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
