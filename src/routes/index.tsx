import { ClockBg } from "@/components/clock-bg";
import Hyperspeed from "@/components/Hyperspeed";
import { InvestorsBackers } from "@/components/investors-backers";
import { LockedTokens } from "@/components/locked-tokens";
import { NFTs } from "@/components/nfts";
import { Tvl } from "@/components/number-digital";
import { ProjectsPartners } from "@/components/projects-partners";
import { cn } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { range } from "es-toolkit";
import { useMemo, type PropsWithChildren } from "react";
import { useMeasure } from "react-use";
import worksSrc1 from "/zoo_gif1.mp4?url";
import worksSrc2 from "/zoo_gif2.mp4?url";
import worksSrc3 from "/zoo_gif3.mp4?url";
import worksSrc4 from "/zoo_gif4.mp4?url";
import { LgBg } from "@/components/lg-bg";

export const Route = createFileRoute("/")({
  component: App,
});

function TitItem({ children }: PropsWithChildren) {
  return (
    <div className="root_anim_item relative p-5  flex items-center justify-center [--fcolor:#D9D9D9]">
      <div className="absolute left-0 top-0 w-full h-full border border-[#38484A] " />
      <div className="w-2.5 aspect-square absolute left-0 top-0 border border-transparent border-t-(--fcolor) border-l-(--fcolor)" />
      <div className="w-2.5 aspect-square absolute left-0 bottom-0 border border-transparent border-b-(--fcolor) border-l-(--fcolor)" />
      <div className="w-2.5 aspect-square absolute right-0 top-0 border border-transparent border-t-(--fcolor) border-r-(--fcolor)" />
      <div className="w-2.5 aspect-square absolute right-0 bottom-0 border border-transparent border-b-(--fcolor) border-r-(--fcolor)" />
      <div
        style={{
          background: "radial-gradient(50% 120.52% at 50% 5.22%, #FFFFFF 48.91%, rgba(255, 255, 255, 0.5) 100%)",
          backgroundClip: "text",
        }}
        className="w-fit leading-none text-transparent text-[clamp(20px,3.55vw,54px)] font-medium"
      >
        {children}
      </div>
    </div>
  );
}
function GapLines() {
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const items = useMemo(() => {
    return range(Math.floor(width / 10));
  }, [width]);
  return (
    <div ref={ref} className="root_anim_item flex h-9 w-full justify-between">
      {items.map((key) => (
        <div key={key} className={cn("w-px h-full shrink-0 bg-[#38484A]", { "opacity-60": Math.floor(key / (items.length / 5)) % 2 == 0 })} />
      ))}
    </div>
  );
}

function GrowBorder({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        border: "1px solid",
        borderImageSource: "linear-gradient(180deg, #4EEB7E 0%, #006D21 100%)",
        borderImageWidth: 1,
        borderImageSlice: 1,

        backdropFilter: "blur(12px)",
        boxShadow: "0px 0px 20px 0px #4CE54F66,0px 0px 40px 0px #32D65233 inset",
        background: "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(102, 102, 102, 0.1) 100%)",
      }}
      className="root_anim_item flex flex-col p-4 md:py-8 items-center gap-4 w-full"
    >
      {children}
    </div>
  );
}

function WorkItem(p: { num: string; tit: string; sub: string; src: string }) {
  return (
    <div className={cn("root_anim_item flex flex-col items-center gap-8 md:flex-row w-full md:h-[clamp(200px,26.3vw,400px)]")}>
      <div className="text-[clamp(46px,5.5vw,84px)] flex gap-[.12em] leading-none flex-1">
        <span style={{ backgroundImage: "linear-gradient(180deg, #939393 0%, rgba(81, 81, 81, 0) 100%)" }} className="text-[1em] font-dmmono text-transparent bg-clip-text">
          {p.num}
        </span>
        <div className="flex flex-col gap-[.12em] flex-1 w-50 md:w-max">
          <div className="flex gap-4 items-center flex-1">
            <div className="text-[.5em] whitespace-nowrap">{p.tit}</div>
            <div
              className="relative h-px hidden md:block flex-1"
              style={{
                backgroundImage: "linear-gradient(270deg, #3E3E3E -2.78%, #FFFFFF 102.78%)",
              }}
            >
              <div className="w-[7px] aspect-square rounded-full bg-white absolute left-0 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="text-[.285em] opacity-60">{p.sub}</div>
        </div>
      </div>
      <div className={cn("md:rounded-full overflow-hidden w-[clamp(300px,39vw,600px)]", { "md:mr-[clamp(160px,21vw,320px)]": p.num == "01" || p.num == "03" })}>
        <video src={p.src} className={cn("w-full h-auto")} muted loop autoPlay />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="w-full min-h-full flex flex-col items-center bg-[url(/zoo_bg.svg)] bg-repeat relative">
      <LgBg />
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-white text-[calc(10px+2vmin)]">
        <Hyperspeed className="root_anim_item" />
        <div className="absolute left-0 top-0 w-full min-h-full flex flex-col items-center text-center justify-center gap-5 leading-tight pt-40 pb-10">
          <div
            style={{
              background: "linear-gradient(98.05deg, #1ECA53 6.94%, #FFFFFF 22.6%, #FFFFFF 82.21%, #1ECA53 97.66%)",
              backgroundClip: "text",
            }}
            className="root_anim_item w-fit text-transparent text-center font-semibold text-[clamp(36px,5.26vw,80px)]"
          >
            The Fuel to
            <br />
            Accelerate DeFi
          </div>
          <div className="root_anim_item text-xl md:text-2xl font-parkinsans font-medium">Instant Liquidity for Future Tokens</div>
          <Link
            to={"https://app.zoofi.io" as any}
            target="_blank"
            className="root_anim_item mt-auto md:mt-10 border border-white bg-white/5 backdrop-blur-lg flex justify-center items-center w-[255px] px-5 py-3.25 font-parkinsans font-medium text-2xl rounded-2xl overflow-hidden"
          >
            Launch App
          </Link>
        </div>
      </section>
      <section className="w-full max-w-380 flex flex-col gap-5 md:gap-8 py-8 px-4">
        <div className="flex flex-col w-full">
          <TitItem>Total Liquidity Unlocked</TitItem>
          <GapLines />
          <div className="root_anim_item border border-[#38484A] w-full p-5 relative">
            <ClockBg />
            <div className="absolute w-full flex justify-center top-1/6 left-0">
              <Tvl />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:gap-16 md:grid-cols-2">
          <GrowBorder>
            <div
              style={{
                background: "linear-gradient(90deg, #1C1C1C 0%, #000000 50%, #1C1C1C 100%)",
              }}
              className="rounded-full px-10 py-5 font-semibold text-[clamp(20px,2.1vw,32px)] leading-none"
            >
              Node NFTs
            </div>
            <div className="font-parkinsans text-xl text-center">Turn future mining rewards into fully tradeable tokens instantly.</div>
            <NFTs />
          </GrowBorder>
          <GrowBorder>
            <div
              style={{
                background: "linear-gradient(90deg, #1C1C1C 0%, #000000 50%, #1C1C1C 100%)",
              }}
              className="rounded-full px-10 py-5 font-semibold text-[clamp(20px,2.1vw,32px)] leading-none"
            >
              Locked Tokens
            </div>
            <div className="font-parkinsans text-xl text-center">Still 48 months from unlock? Unlock liquidity today.</div>
            <LockedTokens />
          </GrowBorder>
        </div>
      </section>
      <section className="w-full max-w-380 flex flex-col gap-5 py-8 px-4">
        <TitItem>How it works</TitItem>
        <div className="flex flex-col w-full pt-20">
          <WorkItem num="01" tit="Deposit" sub="Your future claim" src={worksSrc2} />
          <WorkItem num="02" tit="Instantly Receive" sub="Equal amount of fully tradeable tokens" src={worksSrc3} />
          <WorkItem num="03" tit="Trade or Hold" sub="Swap on DEX & Arbitrage" src={worksSrc1} />
          <WorkItem num="04" tit="Final Redemption" sub="Real tokens unlock → 1:1 guaranteed redemption" src={worksSrc4} />
        </div>
      </section>
      <section className="w-full max-w-380 flex flex-col gap-5 md:gap-8 lg:gap-10 py-8 px-4">
        <TitItem>Projects & Partners</TitItem>
        <ProjectsPartners />
      </section>
      <section className="w-full max-w-380 flex flex-col py-8 px-4">
        <TitItem>Investors & Backers</TitItem>
        <GapLines />
        <InvestorsBackers />
      </section>
    </div>
  );
}
