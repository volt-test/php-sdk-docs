import React from 'react';
import Layout from '@theme-original/Layout';
import CookieConsent from '@site/src/components/CookieConsent';
import Link from '@docusaurus/Link';

export default function LayoutWrapper(props) {
    return (
        <>
            <div className="vt-promo-banner">
                <span className="vt-promo-banner__text">
                    Laravel users: Our new{' '}
                    <Link to="https://github.com/volt-test/laravel-performance-testing">
                        Laravel Performance Testing Package
                    </Link>
                    {' '}is now available!
                </span>
            </div>

            <Layout {...props} />
            <CookieConsent />
        </>
    );
}
