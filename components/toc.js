import React, { useEffect } from "react";
import tocbot from "tocbot";

const Toc = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".c-toc__body",
      contentSelector: ".post",
      headingSelector: "h1, h2, h3,h4,h5",
    });
    return () => tocbot.destroy();
  }, []);

  return (
    <div className="c-toc">
      <h4 className="c-toc__header">この記事の目次</h4>
      <div className="c-toc__body"></div>
    </div>
  );
};

export default Toc;
