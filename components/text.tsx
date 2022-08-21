import React, { useRef, useState, useEffect } from "react";

type TextProps = Omit<JSX.IntrinsicElements["span"], "children"> & {
  children: string;
};

export const Text = (props: TextProps) => {
  const refOuter = useRef<HTMLSpanElement>(null);
  const refInner = useRef<HTMLSpanElement>(null);
  // 省略表記のとき true
  const [isEllipsis, setIsEllipsis] = useState<boolean>(false);

  // リサイズ監視
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const rectOuter = refOuter.current?.getBoundingClientRect();
      const rectInner = refInner.current?.getBoundingClientRect();
      // 外枠 < 内枠 なら省略表記
      setIsEllipsis((rectOuter?.width ?? 0) < (rectInner?.width ?? 0));
    });
    const el = refOuter.current as Element;
    resizeObserver.observe(el);
    return () => resizeObserver.unobserve(el);
  });

  const { children, ...etc } = props;
  // 省略表記になるとき title を設定
  const title = isEllipsis && { title: children };
  return (
    <span ref={refOuter} className="text" {...etc}>
      <span ref={refInner} {...title}>
        {children}
      </span>
    </span>
  );
};
