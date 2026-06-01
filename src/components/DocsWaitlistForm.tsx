import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const DEFAULT_APP_URL = "https://volt-test.com";

export default function DocsWaitlistForm() {
    const { siteConfig } = useDocusaurusContext();
    const appUrl = (siteConfig.customFields?.appUrl as string) || DEFAULT_APP_URL;

    return (
        <div className="card vt-waitlist-card">
            <div className="card__body" style={{ textAlign: "center", padding: "2rem 1.5rem" }}>
                <span className="badge badge--warning" style={{ marginBottom: "1rem", display: "inline-block", fontSize: "0.75rem" }}>
                    CLOSED BETA
                </span>
                <h3 style={{ marginBottom: "0.5rem" }}>Join Early Access</h3>
                <p style={{ color: "var(--ifm-color-emphasis-600)", marginBottom: "0.75rem", lineHeight: 1.6 }}>
                    Sign up to join the waitlist. We review and approve access in waves.
                </p>
                <div className="alert alert--warning" style={{ textAlign: "left", marginBottom: "1.5rem", fontSize: "0.85rem" }}>
                    VoltTest is currently in <strong>closed beta</strong>. After signing up, your account
                    will be reviewed and you'll be notified once approved.
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", alignItems: "center" }}>
                    <a
                        href={`${appUrl}/register`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button--primary button--lg vt-waitlist-btn"
                        style={{ width: "100%", maxWidth: "320px", textAlign: "center" }}
                    >
                        Join Waitlist &rarr;
                    </a>
                    <small style={{ color: "var(--ifm-color-emphasis-500)" }}>
                        Already have an account?{" "}
                        <a href={`${appUrl}/login`} target="_blank" rel="noopener noreferrer">
                            Sign in
                        </a>
                    </small>
                </div>
            </div>
        </div>
    );
}
