import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createRef, useRef } from "react";
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollSmoother);

export function useDrawItem() {
  const scope = useRef<SVGSVGElement>(null);
  useGSAP(
    () => {
      gsap.from(".draw_item", {
        ease: "power2.out",
        duration: 2,
        drawSVG: 0,
        repeat: -1,
      });
    },
    { scope }
  );
  return scope;
}

const refSmoother = createRef<ScrollSmoother>();
export function useRootAnim(dependencies: unknown[] = []) {
  useGSAP(
    (_ctx, ctxSafe) => {
      if (ctxSafe) {
        // refSmoother.current = ScrollSmoother.create({
        //   smooth: 0.5, // how long (in seconds) it takes to "catch up" to the native scroll position
        //   effects: true, // looks for data-speed and data-lag attributes on elements
        //   smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
        // });
        const onEnter = ctxSafe((targets: Element[]) => {
          gsap.fromTo(targets, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "back.out(1)", stagger: 0.2, overwrite: true });
        });
        console.info("root_anim_item :",document.getElementsByClassName("root_anim_item").length) ;
        ScrollTrigger.batch(".root_anim_item", {
          // scroller: '#app', 
          interval: 0.2, batchMax: 3, onEnter });
      }
    },
    { dependencies }
  );
}

export function smoothTo(t: gsap.DOMTarget | number) {
  refSmoother.current?.scrollTo(t, true, "top top");
}
