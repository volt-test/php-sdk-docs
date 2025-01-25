import type {ReactNode} from 'react';
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
    title: 'Quick Setup for Performance Testing',
    Svg: require('@site/static/img/image-4.svg').default,
    description: (
      <>
          Volt-Test PHP SDK is designed to integrate seamlessly with your application,
          offering a quick and intuitive way to define and run performance tests without hassle.
      </>
    ),
  },
  {
    title: 'Streamline Your Test Scenarios',
    Svg: require('@site/static/img/image-5.svg').default,
    description: (
      <>
        Focus on building meaningful test scenarios while the SDK handles test orchestration and metrics reporting, saving you time and effort.
      </>
    ),
  },
  {
    title: 'Seamlessly Integrated with Volt-Test Engine',
    Svg: require('@site/static/img/image-6.svg').default,
    description: (
      <>
          Volt-Test's core engine is built with Golang, delivering high performance, scalability, and accuracy for all your load-testing needs.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
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
