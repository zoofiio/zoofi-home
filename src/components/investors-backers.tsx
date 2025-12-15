const images = import.meta.glob("/src/investors/*.svg", { eager: true, import: "default" });

const items = Object.keys(images)
  .map((key) => {
    const fname = key.split("/").pop()!;
    const [num, name] = fname.replace(".svg", "").split("-");
    const getUrl = images[key] as string;
    return { num: Number(num), name, icon: getUrl };
  })
  .sort((a, b) => a.num - b.num);
console.log("images:", items);
export function InvestorsBackers() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(clamp(150px,15.7vw,240px),1fr))] w-full border border-[#3E3E3E] overflow-hidden">
      {items.map((item) => (
        <div key={item.name} className="root_anim_item flex w-full aspect-7/6 flex-col gap-5 py-5 items-center justify-center border border-white/5 relative group">
          <div
            style={{
              boxShadow: "0px 0px 11.54px 0px #FFFFFF1A inset,1.15px 1.15px 1.15px 0px #FFFFFF1A inset",
            }}
            className="flex items-center justify-center h-16 aspect-square rounded-[13px] border border-[#3E3E3E] bg-white/10"
          >
            <img src={item.icon} />
          </div>
          <span className="opacity-60 whitespace-nowrap font-parkinsans">{item.name}</span>
          <div
            style={{
              background: "linear-gradient(0deg, #FFFFFF -21.27%, #21EA65 58.91%)",
            }}
            className="absolute opacity-60 bg-[#1ECA53] w-22 aspect-square hidden group-hover:flex top-1/2 left-1/2 blur-2xl -translate-x-1/2 -translate-y-1/2 "
          ></div>
        </div>
      ))}
    </div>
  );
}

// backdrop-filter: blur(80px)
/* Ellipse 75 */

// position: absolute;
// width: 88px;
// height: 88px;
// left: calc(50% - 88px/2 + 127px);
// top: 5687px;

// background: #1ECA53;
// filter: blur(40px);
