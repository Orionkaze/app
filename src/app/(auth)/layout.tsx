import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        .auth-container {
          display: flex;
          min-height: 100vh;
          width: 100%;
        }
        .auth-left {
          display: none;
          flex: 1;
          background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .auth-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px;
          background-color: var(--color-bg-primary);
          position: relative;
          width: 100%;
        }
        @media (min-width: 768px) {
          .auth-left {
            display: flex;
          }
          .auth-right {
            padding: 80px;
          }
        }
        .auth-orb {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--color-pink-500) 0%, transparent 70%);
          opacity: 0.15;
          filter: blur(60px);
          top: 10%;
          left: -10%;
          pointer-events: none;
        }
      `}</style>
      <div className="auth-container">
        {/* Desktop Left Screen */}
        <div className="auth-left">
          <div className="auth-orb" />
          <h1 style={{ fontSize: "48px", fontWeight: "bold", zIndex: 1, color: "var(--color-text-primary)" }}>
            Loyalty Platform<span style={{ color: "var(--color-pink-500)" }}>.</span>
          </h1>
          <p style={{ marginTop: "16px", color: "var(--color-text-secondary)", zIndex: 1, maxWidth: "60%", textAlign: "center", lineHeight: "1.5", fontSize: "18px" }}>
            The next generation rewards ecosystem for businesses and customers.
          </p>
        </div>
        
        {/* Right Screen: Auth Form */}
        <div className="auth-right">
          <div style={{ maxWidth: "480px", width: "100%", margin: "0 auto" }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
