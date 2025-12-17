import { useGSAP } from "@gsap/react";
import { useQuery } from "@tanstack/react-query";
import { chunk, range, round, shuffle } from "es-toolkit";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function AnimNumItem({ num }: { num: string }) {
  return (
    <div className="relative w-full h-[1em] flex justify-center items-center shrink-0">
      <span style={{ filter: "drop-shadow(0px 0px 14px #3FFF4C)" }} className="text-[.45em]">
        {num === "$" ? "5" : num}
      </span>
      {num === "$" && (
        <div style={{ filter: "drop-shadow(0px 0px 14px #3FFF4C)" }} className="absolute bg-white left-1/2 -translate-x-1/2 top-[.24em] w-[.05em] h-[.516em] rounded-[1px]"></div>
      )}
    </div>
  );
}
function NumberItem({ num }: { num: string }) {
  if (num == "," || num == ".") {
    return <span className="text-[clamp(9px,3.9vw,60px)] leading-0 text-[#1ECA53]">{num}</span>;
  }

  return (
    <div className="shrink-0 text-[clamp(18px,7.8vw,120px)] w-[.65em] h-[1em] flex flex-col font-dseg7mini font-bold text-white relative overflow-hidden bg-no-repeat bg-[url(/numbg.svg)] bg-contain">
      {num === "$" ? (
        <AnimNumItem num={num} />
      ) : (
        <div className="tvl_num_item flex flex-col w-full h-max">
          {range(parseInt(num), parseInt(num) + 11).map((n, i) => (
            <AnimNumItem key={`num_item_anim_i_${i}`} num={`${n % 10}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Tvl() {
  const { data } = useQuery({
    queryKey: ["TVL"],
    initialData: "$000,000,000.00",
    queryFn: async () => {
      const res = await fetch("https://api.llama.fi/tvl/zoo-finance");
      const data = await res.json();
      const fmtTvl = round(data, 2).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      console.info("TVL data:", fmtTvl);
      return `$${fmtTvl}`;
    },
  });
  const items = data.trim().split("");
  useGSAP(
    (_ctx, ctxSafe) => {
      const to = setTimeout(() => {
        if (ctxSafe) {
          const onEnter = ctxSafe((targets: Element[]) => {
            console.info("TVL nums anim:", targets.length);
            chunk(shuffle(targets), Math.ceil(targets.length / 2)).forEach((tg, i) => {
              gsap.fromTo(
                tg,
                { yPercent: i ? -90.9 : 0 },
                {
                  yPercent: i ? 0 : -90.9,
                  duration: 1.5,
                  ease: "power2.out",
                  delay: 0,
                  overwrite: true,
                }
              );
            });
          });
          ScrollTrigger.batch(`.tvl_num_item`, {
            interval: 0,
            batchMax: 20,
            onEnter,
          });
        }
      }, 50);
      return () => clearTimeout(to);
    },
    { dependencies: [data] }
  );
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
