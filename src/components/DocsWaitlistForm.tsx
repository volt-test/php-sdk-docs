import React, { useEffect, useRef, useState } from "react";

// ---- SETTINGS --------------------------------------------------------------
// Replace these with your Turnstile site keys (site keys are public):
const DEV_TURNSTILE_SITE_KEY = "0x4AAAAAABrXUaAkT2Oipilm";   // allows localhost/127.0.0.1
const PROD_TURNSTILE_SITE_KEY = "0x4AAAAAABrXUaAkT2Oipilm"; // allows php.volt-test.com

// Submit target (Formspree for now). Later you can point this to /api/waitlist
// to verify the Turnstile token server-side then forward to Mailchimp/Formspree.
const SUBMIT_URL = "https://formspree.io/f/mkgzewed";

// ----------------------------------------------------------------------------

const isDevHost = (host: string) =>
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host.endsWith(".local");

export default function DocsWaitlistForm() {
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [hp, setHp] = useState(""); // honeypot
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error" | "no-captcha" | "script-error"
    >("idle");

    // Turnstile bits
    const [token, setToken] = useState("");
    const widgetRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<any>(null);

    // pick key by hostname at runtime (SSR-safe)
    const host = typeof window !== "undefined" ? window.location.hostname : "";
    const SITE_KEY = isDevHost(host) ? DEV_TURNSTILE_SITE_KEY : PROD_TURNSTILE_SITE_KEY;

    useEffect(() => {
        let mounted = true;

        const renderWidget = () => {
            if (!mounted || !widgetRef.current || !(window as any).turnstile) return;
            try {
                widgetIdRef.current = (window as any).turnstile.render(widgetRef.current, {
                    sitekey: SITE_KEY,
                    theme: "auto",
                    callback: (tok: string) => setToken(tok),
                    "expired-callback": () => setToken(""),
                    "error-callback": () => setToken(""),
                });
            } catch {
                setStatus("script-error");
            }
        };

        if ((window as any).turnstile) {
            renderWidget();
        } else {
            // lazy-load Turnstile
            const s = document.createElement("script");
            s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
            s.async = true;
            s.defer = true;
            s.onload = renderWidget;
            s.onerror = () => setStatus("script-error");
            document.head.appendChild(s);
        }

        return () => {
            mounted = false;
            try {
                if (widgetIdRef.current && (window as any).turnstile) {
                    (window as any).turnstile.remove(widgetIdRef.current);
                }
            } catch {}
        };
    }, [SITE_KEY]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (hp) return; // bot
        if (!token) {
            setStatus("no-captcha");
            return;
        }

        setStatus("loading");
        try {
            const res = await fetch(SUBMIT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    email,
                    company,
                    source: isDevHost(host) ? "docs-local" : "php.volt-test.com",
                    list: "early-access",
                    token, // NOTE: Formspree won't verify this; verify on your own API if needed
                }),
            });

            if (res.ok) {
                setStatus("success");
                setEmail("");
                setCompany("");
                setToken("");
                try {
                    (window as any).turnstile?.reset(widgetRef.current);
                } catch {}
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    // Basic styling that blends with Docusaurus (no Tailwind required)
    const inputStyle: React.CSSProperties = {
        padding: "0.75rem 1rem",
        borderRadius: 12,
        border: "1px solid var(--ifm-color-emphasis-300)",
        outline: "none",
        width: "100%",
    };

    return (
        <div className="card" style={{ maxWidth: 560, margin: "0 auto" }}>
            <div className="card__header">
                <h3 style={{ marginBottom: 0 }}>Join Volt-Test Cloud Early Access</h3>
            </div>
            <div className="card__body">
                <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
                    <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        style={inputStyle}
                    />
                    <input
                        type="text"
                        placeholder="Company / Team (optional)"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        autoComplete="organization"
                        style={inputStyle}
                    />

                    {/* honeypot */}
                    <input
                        type="text"
                        name="_gotcha"
                        value={hp}
                        onChange={(e) => setHp(e.target.value)}
                        style={{ display: "none" }}
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    {/* Turnstile widget */}
                    <div ref={widgetRef} className="cf-turnstile" />

                    <button
                        type="submit"
                        className="button button--primary"
                        disabled={status === "loading"}
                        style={{ borderRadius: 12, padding: "0.7rem 1.2rem" }}
                    >
                        {status === "loading" ? "Joining…" : "Join Early Access"}
                    </button>

                    {status === "success" && (
                        <div className="alert alert--success" role="alert">
                            Thanks! Please check your inbox to confirm your spot.
                        </div>
                    )}
                    {status === "error" && (
                        <div className="alert alert--danger" role="alert">
                            Something went wrong. Please try again.
                        </div>
                    )}
                    {status === "no-captcha" && (
                        <div className="alert alert--warning" role="alert">
                            Please complete the CAPTCHA to join the waitlist.
                        </div>
                    )}
                    {status === "script-error" && (
                        <div className="alert alert--warning" role="alert">
                            Captcha script didn’t load. Check the widget hostnames in Cloudflare.
                        </div>
                    )}
                </form>
            </div>
            <div className="card__footer">
                <small style={{ color: "var(--ifm-color-emphasis-600)" }}>
                    We’ll only email you about early access and product updates. Unsubscribe anytime.
                </small>
            </div>
        </div>
    );
}

