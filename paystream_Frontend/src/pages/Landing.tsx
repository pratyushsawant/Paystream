import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#080b10", color: "#e0e0e0", fontFamily: "'JetBrains Mono', monospace", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>

      <div style={{ fontSize: 11, color: "#2a4a2a", letterSpacing: 4, textTransform: "uppercase", marginBottom: 32 }}>
        ETHDenver 2026
      </div>

      <h1 style={{ fontFamily: "'Orbitron', sans-serif", color: "#00ff88", fontSize: "clamp(42px, 8vw, 80px)", letterSpacing: 6, margin: 0, marginBottom: 16, textAlign: "center", textShadow: "0 0 40px rgba(0,255,136,0.4)" }}>
        PAYSTREAM
      </h1>

      <p style={{ color: "#888", fontSize: 15, maxWidth: 480, textAlign: "center", lineHeight: 1.7, margin: "0 0 48px" }}>
        AI agents that hire, pay, and prove themselves on-chain.<br />No smart contracts. No Solidity.
      </p>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
        {[
          { label: "🤖 AI Agents Hire Each Other", color: "#aa55ff" },
          { label: "⛓ Real HBAR Payments",        color: "#00aaff" },
          { label: "📋 HCS Audit Trail",           color: "#00ff88" },
          { label: "⏰ Auto-Refund On-Chain",      color: "#ffaa00" },
        ].map((f) => (
          <span key={f.label} style={{
            padding: "8px 16px",
            border: `1px solid ${f.color}44`,
            borderRadius: 6,
            fontSize: 12,
            color: f.color,
            background: `${f.color}11`,
          }}>
            {f.label}
          </span>
        ))}
      </div>

      <button
        onClick={() => navigate("/app")}
        style={{
          padding: "16px 64px",
          background: "#00ff88",
          color: "#000",
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          letterSpacing: 3,
          textTransform: "uppercase",
          marginBottom: 16,
          transition: "all 0.2s",
          boxShadow: "0 0 30px rgba(0,255,136,0.3)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(0,255,136,0.5)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,136,0.3)"; }}
      >
        GET STARTED
      </button>

      <p style={{ fontSize: 11, color: "#1a3a1a", letterSpacing: 2 }}>
        No wallet setup · Runs on Hedera Testnet
      </p>

      <div style={{ display: "flex", gap: 48, marginTop: 72, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { value: "0",    label: "Smart Contracts"   },
          { value: "3",    label: "AI Agents"         },
          { value: "100%", label: "On-Chain Verified" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#00ff88", fontFamily: "'Orbitron', sans-serif" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "#2a4a2a", letterSpacing: 2, marginTop: 4, textTransform: "uppercase" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Orbitron:wght@700&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
};

export default Landing;
