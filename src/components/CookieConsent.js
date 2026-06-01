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
        <div className="vt-cookie-banner">
            <p className="vt-cookie-banner__text">
                We use cookies to analyze how users interact with our site and improve performance.
            </p>
            <button onClick={acceptCookies} className="vt-cookie-banner__btn">
                Accept
            </button>
        </div>
    );
}
