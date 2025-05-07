import React, { useEffect, useState } from 'react';

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consentGiven = document.cookie.includes('cookies_accepted=true');
        if (!consentGiven) {
            setShowBanner(true);
            loadGoogleAnalytics();
        } else {
            loadGoogleAnalytics();
        }
    }, []);

    const acceptCookies = () => {
        document.cookie = 'cookies_accepted=true; path=/; max-age=' + 60 * 60 * 24 * 365;
        setShowBanner(false);
        loadGoogleAnalytics();
    };

    const loadGoogleAnalytics = () => {
        if (window.gtag) return;
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-R09KGCHHDS';
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-R09KGCHHDS');
    `;
        document.head.appendChild(script2);
    };

    if (!showBanner) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: '#1E3A8A', // Volt-Test blue
            color: '#ffffff',
            padding: '1rem',
            textAlign: 'center',
            zIndex: 1000,
            fontSize: '0.95rem',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.2)',
        }}>
            We use cookies to analyze how users interact with our site and improve performance. By clicking 'Accept', you agree to our use of cookies.
            <button
                onClick={acceptCookies}
                style={{
                    marginLeft: '1rem',
                    padding: '0.4rem 1rem',
                    backgroundColor: '#ffffff',
                    color: '#1E3A8A',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 500,
                    cursor: 'pointer',
                }}
            >
                Accept
            </button>
        </div>
    );
}
