import React from 'react';
import Layout from '@theme-original/Layout';
import CookieConsent from '@site/src/components/CookieConsent';
import Link from '@docusaurus/Link';

export default function LayoutWrapper(props) {
    return (
        <>
            <div className="vt-promo-banner">
                <span className="vt-promo-banner__text">
                    VoltTest Cloud is in closed beta —{' '}
                    <Link to="https://volt-test.com/register">
                        join the waitlist
                    </Link>
                    {' '}for early access.
                </span>
            </div>

            <Layout {...props} />
            <CookieConsent />
        </>
    );
}
