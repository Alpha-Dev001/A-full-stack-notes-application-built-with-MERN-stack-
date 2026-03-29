

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router";

const FloatingParticle = ({ delay, duration, x, size, opacity }) => (
  <div
    style={{
      position: "absolute",
      left: `${x}%`,
      bottom: "-10px",
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      pointerEvents: "none",
      background: `rgba(134, 239, 172, ${opacity})`,
      animation: `nnf-floatUp ${duration}s ease-in ${delay}s infinite`,
      boxShadow: `0 0 ${size * 2}px rgba(134, 239, 172, ${opacity * 0.6})`,
    }}
  />
);

const PenPath = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const duration = 2800;

  useEffect(() => {
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          startRef.current = null;
          setProgress(0);
          rafRef.current = requestAnimationFrame(animate);
        }, 1200);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const totalLen = 220;
  const drawn = progress * totalLen;

  return (
    <svg viewBox="0 0 200 120" style={{ width: "100%", height: "100%" }} fill="none">
      <path d="M20 90 Q60 30 100 60 Q140 90 180 20" stroke="rgba(134,239,172,0.15)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path
        d="M20 90 Q60 30 100 60 Q140 90 180 20"
        stroke="rgba(134,239,172,0.9)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray={`${drawn} ${totalLen}`}
        fill="none"
        style={{ filter: "drop-shadow(0 0 4px rgba(134,239,172,0.8))" }}
      />
      {progress > 0 && progress < 1 && (
        <circle r="3" fill="rgba(134,239,172,0.9)" style={{ filter: "drop-shadow(0 0 6px rgba(134,239,172,1))" }}>
          <animateMotion dur={`${duration}ms`} repeatCount="indefinite" path="M20 90 Q60 30 100 60 Q140 90 180 20" />
        </circle>
      )}
    </svg>
  );
};

const NotesNotFound = () => {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    delay: (i * 1.3) % 8,
    duration: 5 + (i * 0.7) % 4,
    x: (i * 17 + 5) % 95,
    size: 2 + (i % 3),
    opacity: 0.15 + (i % 4) * 0.07,
  }));

  const ghostCards = [
    { index: 0 }, { index: 1 }, { index: 2 }, { index: 3 },
  ];

  return (
    <>
      <style>{`
        @keyframes nnf-floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        @keyframes nnf-card0 {
          0%   { transform: translate(-90px, 20px)  rotate(-12deg) translateY(0px); }
          100% { transform: translate(-90px, 20px)  rotate(-12deg) translateY(-12px); }
        }
        @keyframes nnf-card1 {
          0%   { transform: translate(90px, 30px)   rotate(8deg)   translateY(0px); }
          100% { transform: translate(90px, 30px)   rotate(8deg)   translateY(-10px); }
        }
        @keyframes nnf-card2 {
          0%   { transform: translate(-60px, -20px) rotate(-5deg)  translateY(0px); }
          100% { transform: translate(-60px, -20px) rotate(-5deg)  translateY(-14px); }
        }
        @keyframes nnf-card3 {
          0%   { transform: translate(70px, -10px)  rotate(15deg)  translateY(0px); }
          100% { transform: translate(70px, -10px)  rotate(15deg)  translateY(-8px); }
        }
        @keyframes nnf-pulse {
          0%   { transform: scale(0.8);  opacity: 0.6; }
          50%  { transform: scale(1.15); opacity: 0.2; }
          100% { transform: scale(0.8);  opacity: 0.6; }
        }
        @keyframes nnf-bounce {
          0%, 100% { transform: translateY(0px)  scale(1); }
          50%       { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes nnf-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nnf-spin    { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
        @keyframes nnf-spinRev { from { transform: rotate(0deg); }   to { transform: rotate(-360deg); } }
 
        .nnf-f1 { animation: nnf-fadeUp 0.7s ease forwards 0.10s; opacity: 0; }
        .nnf-f2 { animation: nnf-fadeUp 0.7s ease forwards 0.35s; opacity: 0; }
        .nnf-f3 { animation: nnf-fadeUp 0.7s ease forwards 0.55s; opacity: 0; }
        .nnf-f4 { animation: nnf-fadeUp 0.7s ease forwards 0.75s; opacity: 0; }
 
        .nnf-gc0 { position: absolute; animation: nnf-card0 3.0s ease-in-out 0.0s infinite alternate; }
        .nnf-gc1 { position: absolute; animation: nnf-card1 3.4s ease-in-out 0.3s infinite alternate; }
        .nnf-gc2 { position: absolute; animation: nnf-card2 3.8s ease-in-out 0.6s infinite alternate; }
        .nnf-gc3 { position: absolute; animation: nnf-card3 4.2s ease-in-out 0.2s infinite alternate; }
 
        .nnf-spin    { animation: nnf-spin    18s linear infinite; }
        .nnf-spinrev { animation: nnf-spinRev 12s linear infinite; }
        .nnf-pulse   { animation: nnf-pulse 3s ease-in-out infinite; }
        .nnf-bounce  { animation: nnf-bounce 3.5s ease-in-out infinite; }
      `}</style>

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "99%",
          overflow: "hidden",
          background: "linear-gradient(160deg, #052e16 0%, #041a0d 40%, #000000 100%)",
        }}
      >
        {/* Black edge vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20,
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.97) 100%)",
        }} />

        {/* Glow blobs */}
        <div style={{
          position: "absolute", top: "10%", left: "15%",
          width: "340px", height: "340px", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(21,128,61,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", right: "10%",
          width: "280px", height: "280px", pointerEvents: "none",
          background: "radial-gradient(circle, rgba(20,83,45,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
        }} />

        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(134,239,172,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(134,239,172,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        {/* Particles */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}
        </div>

        {/* Ghost cards */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          {ghostCards.map((card, i) => (
            <div key={i} className={`nnf-gc${i}`}>
              <div style={{
                width: "78px", height: "94px", padding: "10px", borderRadius: "12px",
                border: "1px solid rgba(134,239,172,0.1)",
                background: "linear-gradient(135deg, rgba(21,128,61,0.12) 0%, rgba(0,0,0,0.3) 100%)",
              }}>
                <div style={{ marginTop: "4px" }}>
                  <div style={{ height: "5px", marginBottom: "7px", width: `${40 + i * 8}px`, borderRadius: "4px", background: "rgba(134,239,172,0.2)" }} />
                  <div style={{ height: "5px", marginBottom: "7px", width: `${30 + i * 6}px`, borderRadius: "4px", background: "rgba(134,239,172,0.13)" }} />
                  <div style={{ height: "5px", width: `${50 - i * 4}px`, borderRadius: "4px", background: "rgba(134,239,172,0.08)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 24px", maxWidth: "420px" }}>

          {/* Icon */}
          <div className="nnf-f1" style={{ position: "relative", width: "148px", height: "148px", marginBottom: "32px" }}>
            <div className="nnf-pulse absolute inset-0 rounded-full" style={{ border: "1px solid rgba(134,239,172,0.22)" }} />
            <div className="nnf-spin" style={{ position: "absolute", inset: "10px", borderRadius: "50%", border: "1.5px dashed rgba(134,239,172,0.2)" }} />
            <div className="nnf-spinrev" style={{ position: "absolute", inset: "22px", borderRadius: "50%", border: "1px dotted rgba(134,239,172,0.15)" }} />
            <div className="nnf-bounce" style={{
              position: "absolute", inset: "30px", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, rgba(21,128,61,0.45) 0%, rgba(4,18,10,0.85) 100%)",
              border: "1px solid rgba(134,239,172,0.3)",
              boxShadow: "0 0 30px rgba(74,222,128,0.15), inset 0 1px 0 rgba(134,239,172,0.2)",
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(134,239,172,0.92)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ width: "32px", height: "32px", filter: "drop-shadow(0 0 8px rgba(134,239,172,0.65))" }}>
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            </div>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", opacity: 0.28 }}>
              <PenPath />
            </div>
          </div>

          {/* Heading */}
          <h3 className="nnf-f2" style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.5rem, 4vw, 1.9rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "12px",
            background: "linear-gradient(135deg, #bbf7d0 0%, #4ade80 50%, #86efac 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            No notes yet
          </h3>

          {/* Subtext */}
          <p className="nnf-f3" style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "13.5px", lineHeight: 1.65,
            color: "rgba(134,239,172,0.48)",
            marginBottom: "4px", maxWidth: "290px",
          }}>
            Ready to organize your thoughts?
          </p>
          <p className="nnf-f3" style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: "13px", lineHeight: 1.65,
            color: "rgba(134,239,172,0.3)",
            marginBottom: "36px", maxWidth: "270px",
          }}>
            Create your first note to get started on your journey.
          </p>

          {/* CTA — uses Link like the original */}
          <Link
            to="/app/create"
            className="nnf-f4 btn btn-primary"
            style={{ borderRadius: "9999px", paddingLeft: "28px", paddingRight: "28px" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "15px", height: "15px" }}>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Your First Note
          </Link>

          {/* Keyboard hint */}
          <p className="nnf-f4" style={{
            marginTop: "22px", fontFamily: "system-ui, sans-serif",
            fontSize: "11px", letterSpacing: "0.09em", color: "rgba(134,239,172,0.2)",
          }}>
            PRESS{" "}
            <kbd style={{
              display: "inline-block", padding: "2px 6px", borderRadius: "5px",
              background: "rgba(134,239,172,0.08)", border: "1px solid rgba(134,239,172,0.15)",
              fontFamily: "monospace", fontSize: "10px", color: "rgba(134,239,172,0.38)",
            }}>N</kbd>
            {" "}TO WRITE
          </p>
        </div>
      </div>
    </>
  );
};

export default NotesNotFound;

