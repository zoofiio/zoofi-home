import aethir from "/partners/aethir.svg";
import zerog from "/partners/zerog.svg";
import nodeops from "/partners/nodeops.png";
import story from "/partners/story.svg";
import reppo from "/partners/reppo.png";
import bera from "/partners/bera.png";
import filecoin from "/partners/filecoin.png";
import sei from "/partners/sei.svg";

const partners: { name: string; icon: string }[] = [
  { name: "Aethir", icon: aethir },
  { name: "0G", icon: zerog },
  { name: "Story", icon: story },
  { name: "Reppo", icon: reppo },
  { name: "NodeOps", icon: nodeops },
  { name: "Berachain", icon: bera },
  { name: "Filecoin", icon: filecoin },
  { name: "Sei Network", icon: sei },
];

export function ProjectsPartners() {
  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-4 md:gap-5">
      {partners.map((item) => (
        <div key={item.name} className="root_anim_item flex flex-1 text-[clamp(60px,6.5vw,100px)] h-[1em] min-w-[2.56em] md:min-w-[3em] max-w-[3.5em] gap-2 items-center justify-center rounded-[10px] shrink-0 border border-[#3E3E3E]">
          <img className="h-[.4em] w-auto" src={item.icon} />
          <span className="text-[.24em] whitespace-nowrap">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
