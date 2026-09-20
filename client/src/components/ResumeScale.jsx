import { useEffect, useRef, useState } from "react";

export default function ResumeScale({ children, baseWidth = 780 }) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 1024
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Desktop: render as-is
  if (!isMobile) return <>{children}</>;

  return <ScaledWrapper baseWidth={baseWidth}>{children}</ScaledWrapper>;
}

function ScaledWrapper({ children, baseWidth }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const update = () => {
      const wrapWidth = wrap.offsetWidth;
      const s = wrapWidth > 0 ? Math.min(1, wrapWidth / baseWidth) : 1;
      setScale(s);
      setContentHeight(inner.scrollHeight);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [baseWidth]);

  return (
    <div
      ref={wrapRef}
      className="w-full overflow-hidden"
      style={{
        height:
          contentHeight !== null && scale < 1
            ? `${contentHeight * scale}px`
            : undefined,
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: `${baseWidth}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}