"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Only log errors in development to avoid Lighthouse penalties
    if (process.env.NODE_ENV === "development") {
      console.error("Global error:", error);
    }
  }, [error]);

  return (
    <html>
      <body style={{
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0f',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          padding: '20px',
        }}>
          {/* Icon */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '96px',
            height: '96px',
            borderRadius: '16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            marginBottom: '32px',
          }}>
            <AlertTriangle style={{ width: '48px', height: '48px', color: '#f87171' }} />
          </div>

          {/* Error Code */}
          <div style={{ marginBottom: '24px' }}>
            <span style={{
              fontSize: '96px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #f87171, #fb923c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              500
            </span>
          </div>

          {/* Message */}
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '16px',
          }}>
            Critical Error
          </h1>
          <p style={{
            color: '#9ca3af',
            marginBottom: '32px',
            lineHeight: 1.6,
          }}>
            A critical error occurred. Please refresh the page or try again later.
          </p>

          {/* Actions */}
          <button
            onClick={reset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              marginRight: '12px',
            }}
          >
            <RefreshCw style={{ width: '16px', height: '16px' }} />
            Try Again
          </button>
          {/*
            A plain <a>, deliberately: global-error replaces the root layout when the app shell
            itself has failed, so the router may be part of what broke. A full document load is the
            recovery here, client-side navigation would keep the broken tree alive.
          */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: '#9ca3af',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              fontSize: '16px',
              textDecoration: 'none',
            }}
          >
            Back to Home
          </a>

          {/* Support */}
          <p style={{
            marginTop: '48px',
            color: '#6b7280',
            fontSize: '14px',
          }}>
            If this problem persists, contact{' '}
            <a
              href="mailto:support@thepulseapi.com"
              style={{ color: '#818cf8', textDecoration: 'none' }}
            >
              support@thepulseapi.com
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
