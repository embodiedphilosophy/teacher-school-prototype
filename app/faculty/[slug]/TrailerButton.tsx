"use client";
import { useState } from "react";
export function TrailerButton({ name }: { name: string }) {
  const [msg, setMsg] = useState(false);
  return (
    <>
      <button type="button" aria-label={`Play trailer: ${name}`} onClick={() => setMsg(true)} style={{ width: 84, height: 84, borderRadius: "50%", border: "1.5px solid #EEE8DC", background: "rgba(17,16,13,.4)", color: "#EEE8DC", display: "grid", placeItems: "center", cursor: "pointer" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
      </button>
      {msg && <span role="status" className="cap" style={{ bottom: 44, color: "#EEE8DC" }}>Trailer not filmed yet. This is a prototype.</span>}
    </>
  );
}
