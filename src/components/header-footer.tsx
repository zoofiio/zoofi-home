import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";
import { CgFileDocument } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RiTwitterXLine } from "react-icons/ri";
import { useClickAway } from "react-use";

const TWITTER_LINK = "https://x.com/ZooFinanceIO";
const DISCORD_LINK = "https://t.co/RJwdwdawe5";

const socails: { icon: ReactNode; link: string }[] = [
  { icon: <CgFileDocument />, link: "https://docs.zoofi.io" },
  { icon: <RiTwitterXLine />, link: TWITTER_LINK },
  { icon: <FaDiscord />, link: DISCORD_LINK },
];
export function Socails() {
  return (
    <>
      {socails.map((s) => (
        <Link
          to={s.link}
          key={s.link}
          className={cn("rounded-[12px] p-px border border-[#3E3E3E] w-12 aspect-square flex items-center justify-center hover:border-white/60 hover:bg-[#3E3E3E] text-2xl")}
        >
          {s.icon}
        </Link>
      ))}
    </>
  );
}
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const refBtn = useRef<HTMLButtonElement>(null);
  useClickAway(ref, (e) => {
    if (refBtn.current && e.target && !refBtn.current.contains(e.target as any)) {
      setIsOpen(false);
    }
  });
  return (
    <>
      <header id="header" className="fixed z-50 left-0 top-0 w-full flex items-center p-4 md:bg-[#424242]/20 md:py-1.5 md:backdrop-blur-lg md:border-b md:border-b-[#1C241C]">
        <div className="flex items-center justify-between mx-auto w-full max-w-380 rounded-full p-3.5 backdrop-blur-lg md:backdrop-blur-none md:px-0 md:rounded-none bg-[#424242]/30 md:bg-transparent border border-[#262626] md:border-transparent">
          <h1 className="ml-4 text-xl font-semibold">
            <Link to="/">
              <img src="/logo.svg" alt="Zoofi Logo" className="h-6" />
            </Link>
          </h1>
          <button
            ref={refBtn}
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer py-1.5 px-3.5 text-gray-700 hover:opacity-80 rounded-full transition-colors md:hidden bg-[#1ECA53]"
            aria-label="Open menu"
          >
            <HiOutlineMenuAlt3 size={28} />
          </button>
          <div className="md:flex items-center gap-5 hidden">
            <Socails />
          </div>
        </div>
        <aside ref={ref} className={cn("fixed z-60 hidden transition-all top-25 right-5 rounded-2xl  h-fit bg-[#424242]/30 backdrop-blur-lg p-4 flex-col gap-1", { flex: isOpen })}>
          <Socails />
        </aside>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <>
      {/* footer mobile */}
      <footer className="md:hidden flex flex-col items-center px-4 py-8 w-full gap-5">
        <img src="/logo.svg" alt="Zoofi Logo" className="h-12" />
        <div className="flex items-center gap-5 py-8 border-t border-b border-[#222222]">
          <Socails />
        </div>
        <div className="font-parkinsans text-[#e4e4e7]">@2025 Zoo Finance All Rights Reserved</div>
      </footer>
      {/* footer pc */}
      <footer className="hidden md:flex mt-10 justify-center w-full border-t border-[#222222] py-10">
        <div className="w-full max-w-380 flex justify-between items-center px-4">
          <div className="flex flex-col gap-5">
            <img src="/logo.svg" alt="Zoofi Logo" className="h-12" />
            <div className="opacity-60 font-parkinsans">@2025 Zoo Finance All Rights Reserved</div>
          </div>
          <div className="flex items-center gap-5">
            <Socails />
          </div>
        </div>
      </footer>
    </>
  );
}
