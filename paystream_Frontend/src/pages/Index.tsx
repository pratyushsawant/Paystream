import { useState, useEffect } from "react";

const agentColors: Record<string, string> = {
  "Research Agent": "#aa55ff",
  "Analysis Agent": "#00aaff",
  "Writer Agent": "#00ff88",
};

type Phase = "idle" | "running" | "complete";

interface Step {
  agent: string;
  task: string;
  payment: number;
  txId: string;
  status: "working" | "complete";
}

const Index = () => {
  const [task, setTask] = useState("");
  const [budget, setBudget] = useState(1);
  const [phase, setPhase] = useState<Phase>("idle");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentBudget, setCurrentBudget] = useState(1);
  const [finalReport, setFinalReport] = useState("");
  const [refundAmount, setRefundAmount] = useState(0);
  const [refundTxId, setRefundTxId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [pulseOn, setPulseOn] = useState(true);

  useEffect(() => {
    if (phase !== "running") return;
    const id = setInterval(() => setPulseOn((p) => !p), 600);
    return () => clearInterval(id);
  }, [phase]);

  const deploy = () => {
    if (phase !== "idle") return;
    const taskToRun = task.trim() || "Research the top 3 AI and crypto projects announced this week";
    setCurrentBudget(budget);
    setSteps([]);
    setFinalReport("");
    setRefundAmount(0);
    setRefundTxId("");
    setErrorMsg("");
    setPhase("running");

    const url = `http://localhost:3001/api/run?task=${encodeURIComponent(taskToRun)}&budget=${budget}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (e) => {
      const event = JSON.parse(e.data);

      if (event.type === "step_start") {
        setSteps((prev) => [...prev, {
          agent: event.agent,
          task: event.task,
          payment: 0,
          txId: "",
          status: "working",
        }]);
      }

      if (event.type === "step_complete") {
        setSteps((prev) => prev.map((s) =>
          s.agent === event.agent && s.status === "working"
            ? { ...s, payment: event.payment, txId: event.txId, status: "complete" }
            : s
        ));
        setCurrentBudget(event.remainingBudget);
      }

      if (event.type === "report") {
        setFinalReport(event.text);
      }

      if (event.type === "refund") {
        setRefundAmount(event.amount);
        setRefundTxId(event.txId);
        setPhase("complete");
        eventSource.close();
      }

      if (event.type === "error") {
        setErrorMsg(event.message);
        setPhase("idle");
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      setErrorMsg("Could not connect to PayStream server. Make sure node server.js is running on port 3001.");
      setPhase("idle");
      eventSource.close();
    };
  };

  const reset = () => {
    setPhase("idle");
    setSteps([]);
    setFinalReport("");
    setRefundAmount(0);
    setRefundTxId("");
    setErrorMsg("");
    setCurrentBudget(budget);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080b10", color: "#e0e0e0", fontFamily: "'JetBrains Mono', monospace", padding: "40px 20px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>

        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", color: "#00ff88", fontSize: 42, letterSpacing: 6, margin: 0 }}>PAYSTREAM</h1>
          <p style={{ color: "#888", fontSize: 14, marginTop: 8 }}>Multi-Agent AI Economy on Hedera</p>
        </header>

        {/* Error */}
        {errorMsg && (
          <div style={{ padding: "12px 16px", background: "#1a0808", border: "1px solid #ff4444", borderRadius: 8, color: "#ff6666", fontSize: 13, marginBottom: 24 }}>
            {errorMsg}
          </div>
        )}

        {/* Input Panel */}
        {phase === "idle" && (
          <div style={{ border: "1px solid #00ff88", borderRadius: 12, padding: 28, background: "#0d1117", marginBottom: 32 }}>
            <label style={{ color: "#00ff88", fontSize: 12, fontWeight: 700, letterSpacing: 2, display: "block", marginBottom: 8 }}>TASK</label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Research the top 3 AI and crypto projects announced this week"
              style={{ width: "100%", minHeight: 80, background: "#161b22", border: "1px solid #00ff88", borderRadius: 8, color: "#e0e0e0", fontFamily: "'JetBrains Mono', monospace", fontSize: 14, padding: 12, resize: "vertical", outline: "none", boxSizing: "border-box" }}
            />
            <label style={{ color: "#00ff88", fontSize: 12, fontWeight: 700, letterSpacing: 2, display: "block", marginTop: 20, marginBottom: 8 }}>
              BUDGET: {budget.toFixed(1)} HBAR
            </label>
            <input
              type="range"
              min={0.5}
              max={5}
              step={0.5}
              value={budget}
              onChange={(e) => setBudget(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: "#00ff88" }}
            />
            <button
              onClick={deploy}
              style={{ width: "100%", marginTop: 24, padding: "14px 0", background: "#00ff88", color: "#000", fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: 16, border: "none", borderRadius: 8, cursor: "pointer", letterSpacing: 2, textTransform: "uppercase" }}
            >
              DEPLOY AGENT
            </button>
          </div>
        )}

        {/* Status Bar */}
        {phase === "running" && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", background: "#0d1117", borderRadius: 10, marginBottom: 24, border: "1px solid #1a2332" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00ff88", display: "inline-block", opacity: pulseOn ? 1 : 0.3, transition: "opacity 0.3s" }} />
              <span style={{ color: "#00ff88", fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>AGENT RUNNING...</span>
            </div>
            <span style={{ color: "#ffaa00", fontWeight: 700, fontSize: 13 }}>BUDGET: {currentBudget.toFixed(2)} HBAR</span>
          </div>
        )}

        {/* Live Activity Feed */}
        {(phase === "running" || phase === "complete") && steps.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ color: "#00ff88", fontSize: 13, letterSpacing: 3, marginBottom: 16, fontWeight: 700 }}>LIVE ACTIVITY FEED</h3>
            {steps.map((step, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "#0d1117", borderRadius: 8, marginBottom: 8, animation: "fadeIn 0.5s ease", border: "1px solid #1a2332" }}
              >
                <span style={{ background: agentColors[step.agent], color: "#000", fontWeight: 700, fontSize: 11, padding: "3px 10px", borderRadius: 4, whiteSpace: "nowrap" }}>
                  {step.agent}
                </span>
                <span style={{ flex: 1, fontSize: 13, color: "#ccc" }}>{step.task}</span>
                {step.status === "working" ? (
                  <span style={{ color: "#555", fontSize: 12, whiteSpace: "nowrap" }}>working...</span>
                ) : (
                  <>
                    <span style={{ color: "#ffaa00", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>{step.payment} HBAR</span>
                    <a
                      href={`https://hashscan.io/testnet/transaction/${step.txId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#00aaff", fontSize: 12, textDecoration: "none", whiteSpace: "nowrap" }}
                    >
                      view tx ↗
                    </a>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Final Report */}
        {phase === "complete" && finalReport && (
          <>
            <div style={{ border: "1px solid #00ff88", borderRadius: 12, padding: 24, background: "#0d1117", marginBottom: 24, animation: "fadeIn 0.5s ease" }}>
              <h3 style={{ color: "#00ff88", fontSize: 13, letterSpacing: 3, marginBottom: 16, fontWeight: 700 }}>FINAL REPORT</h3>
              <pre style={{ color: "#e0e0e0", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, whiteSpace: "pre-wrap", margin: 0, maxHeight: 300, overflowY: "auto", lineHeight: 1.7 }}>
                {finalReport}
              </pre>
            </div>

            {/* Refund Banner */}
            <div style={{ background: "#00ff88", color: "#000", textAlign: "center", padding: "18px 24px", borderRadius: 10, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: 2, marginBottom: 24, animation: "fadeIn 0.5s ease" }}>
              ✓ REFUNDED {refundAmount.toFixed(2)} HBAR
              {refundTxId && (
                <div style={{ fontSize: 11, marginTop: 6, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1 }}>
                  <a href={`https://hashscan.io/testnet/transaction/${refundTxId}`} target="_blank" rel="noopener noreferrer" style={{ color: "#000", textDecoration: "underline" }}>
                    view refund tx ↗
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={reset}
              style={{ width: "100%", padding: "12px 0", background: "transparent", color: "#00ff88", border: "1px solid #00ff88", borderRadius: 8, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 14, cursor: "pointer", letterSpacing: 2 }}
            >
              DEPLOY ANOTHER AGENT
            </button>
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Orbitron:wght@700&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        textarea:focus { box-shadow: 0 0 0 2px #00ff8844; }
      `}</style>
    </div>
  );
};

export default Index;
