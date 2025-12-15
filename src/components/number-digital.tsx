import { useQuery } from "@tanstack/react-query";
import { round } from "es-toolkit";

function NumberItem({ num }: { num: string }) {
  if (num == "," || num == ".") {
    return <span className="text-[clamp(9px,3.9vw,60px)] leading-0 text-[#1ECA53]">{num}</span>;
  }
  return (
    <svg className="shrink-0 text-[clamp(18px,7.8vw,120px)]" width=".65em" height="1em" viewBox="0 0 78 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.5" width="78" height="120" fill="url(#paint0_linear_90_107)" />
      <rect width="1" height="120" fill="url(#paint1_linear_90_107)" />
      <rect x="77" width="1" height="120" fill="url(#paint2_linear_90_107)" />
      <g
        style={{
          filter: "drop-shadow(0px 0px 14px #3FFF4C)",
        }}
      >
        <text textAnchor="middle" fontSize={54} x="39" y="87" className="font-dseg7mini font-bold" fill="white">
          {num === "$" ? "5" : num}
        </text>
        {num === "$" && <rect fill="white" x={36} y={29} width={6} height={62} />}
      </g>
      <defs>
        <linearGradient id="paint0_linear_90_107" x1="39" y1="0" x2="39" y2="120" gradientUnits="userSpaceOnUse">
          <stop stop-opacity="0" />
          <stop offset="0.509615" stop-color="#1CB94D" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear_90_107" x1="0.5" y1="0" x2="0.5" y2="120" gradientUnits="userSpaceOnUse">
          <stop stop-opacity="0" />
          <stop offset="0.399038" stop-color="#1ECA53" />
          <stop offset="0.649038" stop-color="#1ECA53" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
        <linearGradient id="paint2_linear_90_107" x1="77.5" y1="0" x2="77.5" y2="120" gradientUnits="userSpaceOnUse">
          <stop stop-opacity="0" />
          <stop offset="0.399038" stop-color="#1ECA53" />
          <stop offset="0.649038" stop-color="#1ECA53" />
          <stop offset="1" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Tvl() {
  const { data } = useQuery({
    queryKey: ["TVL"],
    initialData: "$000,000,000.00",
    queryFn: async () => {
      const res = await fetch("https://api.llama.fi/tvl/zoo-finance");
      const data = await res.json();
      const fmtTvl = round(data, 2).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      console.info("TVL data:", fmtTvl);
      return `$${fmtTvl}`;
    },
  });
  const items = data.trim().split("");
  return (
    <div className="flex relative items-center gap-[clamp(2px,0.78vw,12px)] py-[clamp(5px,0.78vw,12px)] px-[clamp(10px,1.5vw,24px)] [--fcolor:#1ECA53]">
      {items.map((num, i) => (
        <NumberItem key={`num_${i}`} num={num} />
      ))}
      <div className="w-2 md:w-3.5 aspect-square absolute left-0 top-0 border-2 border-transparent border-t-(--fcolor) border-l-(--fcolor)" />
      <div className="w-2 md:w-3.5 aspect-square absolute left-0 bottom-0 border-2 border-transparent border-b-(--fcolor) border-l-(--fcolor)" />
      <div className="w-2 md:w-3.5 aspect-square absolute right-0 top-0 border-2 border-transparent border-t-(--fcolor) border-r-(--fcolor)" />
      <div className="w-2 md:w-3.5 aspect-square absolute right-0 bottom-0 border-2 border-transparent border-b-(--fcolor) border-r-(--fcolor)" />
    </div>
  );
}
