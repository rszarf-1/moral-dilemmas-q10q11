import { useState } from "react";

const C = {
  deps25: "#4338CA", deps25Light: "#EEF2FF",
  deps26: "#0E8A5D", deps26Light: "#ECFDF5",
  inne: "#9CA3AF", inneLight: "#F3F4F6",
  bg: "#F7F6F3", card: "#FFFFFF", text: "#18181B", textSec: "#52525B",
  muted: "#71717A", accent: "#D95D1A", accentSoft: "#FEF0E7",
  border: "#E4E4E7", surface: "#F4F4F5", warn: "#B45309"
};

const Q10 = {
  id: 10, title: "Dylemat wagonika", icon: "🚋",
  desc: "Tramwaj pędzi na 5 robotników. Możesz przestawić zwrotnicę — tramwaj zabije 1 robotnika na bocznym torze.",
  optA: "Nie przestawiam zwrotnicy", optAShort: "Nie przestawiam",
  optB: "Przestawiam zwrotnicę", optBShort: "Przestawiam",
  deps25: { raw: { a: 7, b: 9, inne: 6 }, classified: { a: 8, b: 12, odr: 2 }, n: 22,
    inne: [
      { name: "D25-01", text: "Przestawiam i krzyczę do robotnika, by uciekał", cls: "→ B", clsType: "b" },
      { name: "D25-02", text: "Przestawiam i krzyczę do robotnika, żeby uciekał", cls: "→ B", clsType: "b" },
      { name: "D25-03", text: "Krzyczę do robotnika żeby uciekał i przesuwam dźwignię", cls: "→ B", clsType: "b" },
      { name: "D25-04", text: "Nie przestawiam — sami podjęli decyzję pracując na torze", cls: "→ A", clsType: "a" },
      { name: "D25-05", text: "Nie wiem", cls: "Odrębne", clsType: "odr" },
      { name: "D25-06", text: "Nie wiem", cls: "Odrębne", clsType: "odr" }
    ]
  },
  deps26: { raw: { a: 3, b: 7, inne: 8 }, classified: { a: 4, b: 10, odr: 4 }, n: 18,
    inne: [
      { name: "D26-01", text: "Klasyk, poprawna odpowiedź to pociągnięcie za dźwignię", cls: "→ B", clsType: "b" },
      { name: "D26-02", text: "Krzyczę do robotnika i przestawiam zwrotnicę", cls: "→ B", clsType: "b" },
      { name: "D26-03", text: "Przestawiam i krzyczę do robotnika, żeby uciekał", cls: "→ B", clsType: "b" },
      { name: "D26-04", text: "Lepiej być biernym obserwatorem czyjejś śmierci niż świadomym mordercą", cls: "→ A", clsType: "a" },
      { name: "D26-05", text: "Po równo każdy musi umrzeć, nie dam się w te zagadki Thomson", cls: "Odrębne", clsType: "odr" },
      { name: "D26-06", text: "Wykolejam tramwaj", cls: "Odrębne", clsType: "odr" },
      { name: "D26-07", text: "W panice zapewne nie byłabym w stanie ruszyć dźwigni", cls: "Odrębne", clsType: "odr" },
      { name: "D26-08", text: "Nie jestem w stanie podjąć decyzji etycznej", cls: "Odrębne", clsType: "odr" }
    ]
  }
};

const Q11 = {
  id: 11, title: "Mobilizacja", icon: "🇵🇱",
  desc: "Polska zaatakowana przez Rosję — mobilizacja. Twoja chora matka we Francji błaga, żebyś przyjechał.",
  optA: "Zostanę — bronię ojczyzny", optAShort: "Zostanę w kraju",
  optB: "Opuszczę kraj — jadę do matki", optBShort: "Jadę do matki",
  deps25: { raw: { a: 4, b: 15, inne: 3 }, classified: { a: 5, b: 16, odr: 1 }, n: 22,
    inne: [
      { name: "D25-07", text: "Jadę do matki. Zawsze mogę wrócić później.", cls: "→ B", clsType: "b" },
      { name: "D25-08", text: "Zostaję w kraju. Jako szeregowy załatwiam matce opiekę za granicą.", cls: "→ A", clsType: "a" },
      { name: "D25-09", text: "Nie wiem", cls: "Odrębne", clsType: "odr" }
    ]
  },
  deps26: { raw: { a: 1, b: 14, inne: 3 }, classified: { a: 1, b: 17, odr: 0 }, n: 18,
    inne: [
      { name: "D26-09", text: "Pojadę do mamy, znajdę opiekę i wrócę do Polski", cls: "→ B", clsType: "b" },
      { name: "D26-10", text: "Nie mam obywatelstwa — wobec miłości do ojczyzny i mamy, wybieram mamę", cls: "→ B", clsType: "b" },
      { name: "D26-11", text: "Wyjeżdżam. Obrona kraju jest aktem natury heroicznej.", cls: "→ B", clsType: "b" }
    ]
  }
};

function Dot({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: color }} />
      <span style={{ fontSize: 11, color: C.muted, fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function PctCircle({ value, label, color, size = 88 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  const cx = size / 2;
  const cy = size / 2;
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size} style={{ display: "block", margin: "0 auto" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.surface} strokeWidth={7} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={7}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform={"rotate(-90 " + cx + " " + cy + ")"}
          style={{ transition: "stroke-dashoffset 0.7s ease" }} />
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="central"
          style={{ fontSize: 18, fontWeight: 800, fill: color }}>{value}%</text>
      </svg>
      <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function WaffleGrid({ aPct, bPct, aColor, bColor, n, label, labelColor }) {
  const total = 20;
  const aCount = Math.round(aPct / 100 * total);
  const bCount = Math.round(bPct / 100 * total);
  const cells = Array.from({ length: total }, (_, i) => {
    if (i < aCount) return aColor;
    if (i < aCount + bCount) return bColor;
    return C.inne;
  });
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: labelColor, textTransform: "uppercase", marginBottom: 6 }}>{label} (n={n})</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3, width: "fit-content", margin: "0 auto" }}>
        {cells.map((c, i) => (
          <div key={i} style={{ width: 18, height: 18, borderRadius: 4, backgroundColor: c, opacity: 0.82 }} />
        ))}
      </div>
    </div>
  );
}

function StackedBar({ aPct, bPct, odrPct, aColor, bColor, label, labelColor, height = 34 }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: labelColor, textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", height, borderRadius: 6, overflow: "hidden", background: C.surface }}>
        {aPct > 0 && <div style={{ width: aPct + "%", height, backgroundColor: aColor, display: "flex", alignItems: "center", justifyContent: "center" }}>{aPct > 10 && <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{aPct}%</span>}</div>}
        {bPct > 0 && <div style={{ width: bPct + "%", height, backgroundColor: bColor, display: "flex", alignItems: "center", justifyContent: "center" }}>{bPct > 10 && <span style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{bPct}%</span>}</div>}
        {odrPct > 0 && <div style={{ width: odrPct + "%", height, backgroundColor: C.inne, opacity: 0.45, display: "flex", alignItems: "center", justifyContent: "center" }}>{odrPct > 6 && <span style={{ fontSize: 10, fontWeight: 600, color: C.text }}>{odrPct}%</span>}</div>}
      </div>
    </div>
  );
}

function ItemList({ items, borderC }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 6, padding: "7px 9px", marginBottom: 3, background: item.clsType === "a" ? "#EEF2FF" : item.clsType === "b" ? "#ECFDF5" : C.inneLight, borderRadius: 6, border: "1px solid " + C.border }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: C.muted, marginBottom: 2 }}>{item.name}</div>
            <div style={{ fontSize: 11, color: C.text, lineHeight: 1.4 }}>{item.text}</div>
          </div>
          <div style={{ flexShrink: 0, fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 10, marginTop: 2, background: item.clsType === "a" ? "#C7D2FE" : item.clsType === "b" ? "#A7F3D0" : "#E5E7EB", color: item.clsType === "a" ? "#3730A3" : item.clsType === "b" ? "#065F46" : "#374151" }}>{item.cls}</div>
        </div>
      ))}
    </div>
  );
}

function QuestionPanel({ q }) {
  const d25c = q.deps25.classified;
  const d26c = q.deps26.classified;
  const d25pA = Math.round(d25c.a / q.deps25.n * 100);
  const d25pB = Math.round(d25c.b / q.deps25.n * 100);
  const d25pO = Math.round(d25c.odr / q.deps25.n * 100);
  const d26pA = Math.round(d26c.a / q.deps26.n * 100);
  const d26pB = Math.round(d26c.b / q.deps26.n * 100);
  const d26pO = Math.round(d26c.odr / q.deps26.n * 100);

  return (
    <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 14, padding: 28, boxShadow: "0 1px 4px #0000000a" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
        <span style={{ fontSize: 36 }}>{q.icon}</span>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: C.accent }}>Pytanie {q.id}</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, margin: "2px 0 0" }}>{q.title}</h2>
        </div>
      </div>
      <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.55, margin: "8px 0 20px" }}>{q.desc}</p>

      <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
        <div style={{ flex: 1, padding: "10px 14px", background: "#EEF2FF", borderRadius: 8, border: "1px solid #C7D2FE" }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 3 }}>Opcja A</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{q.optA}</div>
        </div>
        <div style={{ flex: 1, padding: "10px 14px", background: "#ECFDF5", borderRadius: 8, border: "1px solid #A7F3D0" }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 3 }}>Opcja B</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{q.optB}</div>
        </div>
      </div>

      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 10 }}>Surowe wyniki</div>
      <StackedBar aPct={Math.round(q.deps25.raw.a / q.deps25.n * 100)} bPct={Math.round(q.deps25.raw.b / q.deps25.n * 100)} odrPct={Math.round(q.deps25.raw.inne / q.deps25.n * 100)} aColor="#818CF8" bColor="#34D399" label={"DEPS 25 (n=" + q.deps25.n + ")"} labelColor={C.deps25} />
      <StackedBar aPct={Math.round(q.deps26.raw.a / q.deps26.n * 100)} bPct={Math.round(q.deps26.raw.b / q.deps26.n * 100)} odrPct={Math.round(q.deps26.raw.inne / q.deps26.n * 100)} aColor="#818CF8" bColor="#34D399" label={"DEPS 26 (n=" + q.deps26.n + ")"} labelColor={C.deps26} />
      <div style={{ display: "flex", gap: 12, marginBottom: 22, marginTop: 6 }}>
        <Dot color="#818CF8" label="Opcja A" /><Dot color="#34D399" label="Opcja B" /><Dot color={C.inne} label="Inne" />
      </div>

      <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 14 }}>Po klasyfikacji odpowiedzi inne</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <div style={{ background: C.deps25Light, borderRadius: 12, padding: 18, border: "1px solid #C7D2FE" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.deps25, textAlign: "center", textTransform: "uppercase", marginBottom: 12 }}>DEPS 25</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            <PctCircle value={d25pA} label={q.optAShort} color="#818CF8" size={84} />
            <PctCircle value={d25pB} label={q.optBShort} color="#34D399" size={84} />
            {d25pO > 0 && <PctCircle value={d25pO} label="Odrębne" color={C.inne} size={84} />}
          </div>
        </div>
        <div style={{ background: C.deps26Light, borderRadius: 12, padding: 18, border: "1px solid #A7F3D0" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.deps26, textAlign: "center", textTransform: "uppercase", marginBottom: 12 }}>DEPS 26</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            <PctCircle value={d26pA} label={q.optAShort} color="#818CF8" size={84} />
            <PctCircle value={d26pB} label={q.optBShort} color="#34D399" size={84} />
            {d26pO > 0 && <PctCircle value={d26pO} label="Odrębne" color={C.inne} size={84} />}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <WaffleGrid aPct={d25pA} bPct={d25pB} aColor="#818CF8" bColor="#34D399" n={q.deps25.n} label="DEPS 25" labelColor={C.deps25} />
        <WaffleGrid aPct={d26pA} bPct={d26pB} aColor="#818CF8" bColor="#34D399" n={q.deps26.n} label="DEPS 26" labelColor={C.deps26} />
      </div>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 20 }}>
        <Dot color="#818CF8" label="Opcja A" /><Dot color="#34D399" label="Opcja B" /><Dot color={C.inne} label="Odrębne" />
        <span style={{ fontSize: 10, color: C.muted, fontStyle: "italic" }}>1 kwadrat = ok. 5%</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.deps25, textTransform: "uppercase", marginBottom: 4 }}>DEPS 25 — odpowiedzi inne ({q.deps25.inne.length})</div>
          <ItemList items={q.deps25.inne} />
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.deps26, textTransform: "uppercase", marginBottom: 4 }}>DEPS 26 — odpowiedzi inne ({q.deps26.inne.length})</div>
          <ItemList items={q.deps26.inne} />
        </div>
      </div>
    </div>
  );
}

export default function Q10Q11Comparison() {
  const [active, setActive] = useState("q10");
  return (
    <div style={{ fontFamily: "'DM Sans', 'Nunito Sans', 'Segoe UI', system-ui, sans-serif", background: C.bg, color: C.text, minHeight: "100vh", padding: "24px 20px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: C.accent, marginBottom: 5 }}>Pytania dodatkowe</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: C.text, margin: 0, lineHeight: 1.15 }}>Wagonik i Mobilizacja</h1>
          <p style={{ fontSize: 13, color: C.muted, margin: "5px 0 0" }}>Porównanie DEPS 25 (n=22) i DEPS 26 (n=18) — pytania spoza ankiety internetowej</p>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {[{ key: "q10", label: "🚋  Q10 — Dylemat wagonika" }, { key: "q11", label: "🇵🇱  Q11 — Mobilizacja" }].map(tab => (
            <button key={tab.key} onClick={() => setActive(tab.key)} style={{ padding: "9px 18px", borderRadius: 8, border: "1.5px solid " + (active === tab.key ? C.accent : C.border), background: active === tab.key ? C.accentSoft : C.card, color: active === tab.key ? C.accent : C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s ease", boxShadow: active === tab.key ? "0 1px 6px #D95D1A18" : "0 1px 2px #0000000a" }}>{tab.label}</button>
          ))}
        </div>
        {active === "q10" && <QuestionPanel q={Q10} />}
        {active === "q11" && <QuestionPanel q={Q11} />}
        <div style={{ background: C.card, border: "1px solid " + C.border, borderRadius: 14, padding: "20px 24px", marginTop: 16, boxShadow: "0 1px 4px #0000000a" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, textTransform: "uppercase", marginBottom: 8 }}>Podsumowanie obu pytań dodatkowych</div>
          <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.7 }}>
            <strong style={{ color: C.text }}>Q10 — Wagonik:</strong> Oba roczniki częściej przestawiają zwrotnicę niż nie (DEPS 25: 55% vs 36%; DEPS 26: 56% vs 22%). Charakterystyczny jest fenomen "przestawiam + krzyczę" — 6 studentów wymyśliło tę odpowiedź niezależnie. DEPS 26 ma więcej odpowiedzi odrębnych (22% vs 9%), w tym filozoficzny sprzeciw wobec dylematu.
          </div>
          <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.7, marginTop: 12 }}>
            <strong style={{ color: C.text }}>Q11 — Mobilizacja:</strong> Najbardziej jednoznaczny dylemat w ankiecie — zdecydowana większość jedzie do matki (DEPS 25: 73%; DEPS 26: 94%). Tylko 5 osób z 40 wybrałoby obronę kraju. W DEPS 26 wszystkie odpowiedzi inne dają się sklasyfikować jako warianty opcji B.
          </div>
        </div>
      </div>
    </div>
  );
}
