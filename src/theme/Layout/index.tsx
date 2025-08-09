import React from 'react';
import Layout from '@theme-original/Layout';
import CookieConsent from '@site/src/components/CookieConsent';
import Link from '@docusaurus/Link';

export default function LayoutWrapper(props) {
    return (
        <>
            {/* 🚀 Laravel Banner */}
            <div style={{
                backgroundColor: '#e0f7fa',
                padding: '0.75rem 1rem',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '1rem',
                zIndex: 1000,
                position: 'relative',
                color: '#006064',
            }}>
                🚀 Laravel users: Our new&nbsp;
                <Link to="https://github.com/volt-test/laravel-performance-testing" style={{ textDecoration: 'underline' }}>
                    Laravel Performance Testing Package
                </Link>
                &nbsp;is now available!
            </div>

            <Layout {...props} />
            <CookieConsent />
        </>
    );
}