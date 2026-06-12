import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from '@theme-original/Layout';
import CookieConsent from '@site/src/components/CookieConsent';
import Link from '@docusaurus/Link';

const BANNER_ITEMS = [
    {
        icon: '☁️',
        text: 'VoltTest Cloud closed beta is now open',
        cta: 'Join the waitlist',
        ctaUrl: 'https://volt-test.com/register',
        accent: 'cloud',
    },
    {
        icon: '📣',
        text: 'Announcing the VoltTest Cloud closed beta',
        cta: 'Read the announcement',
        ctaUrl: '/blog/volt-test-cloud-closed-beta-open',
        accent: 'blog',
    },
    {
        icon: '🛠️',
        text: 'New — PHP & Laravel Stress Testing Tool',
        cta: 'Read the guide',
        ctaUrl: '/blog/php-stress-testing-tool',
        accent: 'blog',
    },
    {
        icon: '📝',
        text: 'Load Testing Laravel with PHPUnit',
        cta: 'Read the guide',
        ctaUrl: '/blog/laravel-load-testing-with-phpunit',
        accent: 'blog',
    },
    {
        icon: '🚀',
        text: 'Effortless Laravel Performance Testing with VoltTest',
        cta: 'Learn more',
        ctaUrl: '/blog/effortless-laravel-performance-testing-with-volt-test-php-sdk',
        accent: 'blog',
    },
];

function PromoBanner() {
    const [index, setIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [paused, setPaused] = useState(false);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = bannerRef.current;
        if (!el) return;
        const update = () => {
            document.documentElement.style.setProperty(
                '--vt-banner-height',
                `${el.offsetHeight}px`,
            );
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const goTo = useCallback(
        (next: number) => {
            if (animating) return;
            setAnimating(true);
            setTimeout(() => {
                setIndex(next);
                setAnimating(false);
            }, 300);
        },
        [animating],
    );

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            goTo((index + 1) % BANNER_ITEMS.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [index, paused, goTo]);

    const item = BANNER_ITEMS[index];

    return (
        <div
            ref={bannerRef}
            className={`vt-promo-banner vt-promo-banner--${item.accent}`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="vt-promo-banner__shimmer" />
            <div className={`vt-promo-banner__content ${animating ? 'vt-promo-banner__content--exit' : ''}`}>
                <span className="vt-promo-banner__icon">{item.icon}</span>
                <span className="vt-promo-banner__text">{item.text}</span>
                <span className="vt-promo-banner__divider">—</span>
                <Link to={item.ctaUrl} className="vt-promo-banner__cta">
                    {item.cta}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="vt-promo-banner__arrow">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
            <div className="vt-promo-banner__dots">
                {BANNER_ITEMS.map((_, i) => (
                    <button
                        key={i}
                        className={`vt-promo-banner__dot ${i === index ? 'vt-promo-banner__dot--active' : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to announcement ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function LayoutWrapper(props) {
    return (
        <>
            <PromoBanner />
            <Layout {...props} />
            <CookieConsent />
        </>
    );
}
