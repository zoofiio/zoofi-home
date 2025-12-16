import { cn } from "@/lib/utils";

export function LgBgItem({ className, hPosition }: { className?: string; hPosition: "c" | "l" | "r" }) {
  return (
    <div
      style={{
        filter: "blur(250px)",
        background: "linear-gradient(-180deg, #FFFFFF -21.27%, #21EA65 58.91%)",
      }}
      className={cn(
        "w-[clamp(260px,55vw,800px)] aspect-square bg-[url(/lg-bg.svg)] md:opacity-40",
        {
          "mr-auto -translate-x-1/3 md:-translate-x-1/2": hPosition === "l",
          "ml-auto translate-x-1/3 md:translate-x-1/2": hPosition === "r",
          "mx-auto": hPosition === "c",
        },
        className
      )}
    />
  );
}
export function LgBg() {
  return (
    <div className="flex flex-col w-full h-full gap-40 md:gap-100 max-w-380 pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 z-10 pt-[130vh]">
      <LgBgItem hPosition="c" className="hidden md:block"/>
      <LgBgItem hPosition="l" className="mt-[270vw] md:mt-0"/>
      <LgBgItem hPosition="r" />
      <LgBgItem hPosition="l" className="md:-mt-100 md:-translate-y-1/2"/>
    </div>
  );
}
