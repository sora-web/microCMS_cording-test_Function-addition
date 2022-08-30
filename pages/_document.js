import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head></Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: themeInitializerScript,
            }}
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

//関数はString型でないとダメ。
const themeInitializerScript = `(function() {
	${setInitialColorMode.toString()}
	setInitialColorMode();
})()`;

function setInitialColorMode() {
  // 最初のpreferenceを確認して、darkかlightの文字列を返す関数
  function getInitialColorMode() {
    //ストレージからthemeを取得する。
    const persistedPreferenceMode = window.localStorage.getItem("theme");

    const hasPersistedPreference = typeof persistedPreferenceMode === "string";

    if (hasPersistedPreference) {
      return persistedPreferenceMode;
    }

    // Check the current preference
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof preference.matches === "boolean";

    if (hasMediaQueryPreference) {
      return preference.matches ? "dark" : "light";
    }

    return "light";
  }

  const currentColorMode = getInitialColorMode();

  const element = document.documentElement;

  element.style.setProperty("--initial-color-mode", currentColorMode);

  // If darkmode apply darkmode
  if (currentColorMode === "dark")
    document.documentElement.setAttribute("data-theme", "dark");
}

export default MyDocument;

// <ul>
//   {blog.map((blog) => (
//     <li key={blog.id}>
//       <p>{blog.title}</p>
//       <ul>
//         {blog.connections.map((connection) => (
//           <ol key={connection.id}>
//             <p>{connection && `${connection.id}`}</p>
//           </ol>
//         ))}
//       </ul>
//     </li>
//   ))}
// </ul>;

// <ul className="c-blog c-blog--article">
//   {BlogData.map((blog) => (
//     <li className="c-blog-item" key={blog.id}>
//       <Link href={`/blog/${blog.id}`}>
//         <a>
//           <div className="c-blog-item__text-area">
//             <div className="c-blog-item__head">
//               <p className="c-blog-item__cat">
//                 {blog.category && `${blog.category.name}`}
//               </p>
//               <p className="c-blog-item__date">{blog.date}</p>
//             </div>
//             <div className="c-blog-item__body">
//               <p className="c-blog-item__title">{blog.title}</p>

//               <div
//                 className="c-blog-item__text"
//                 dangerouslySetInnerHTML={{
//                   __html: `${blog.desc}`,
//                 }}
//               />
//             </div>
//           </div>
//           <div className="c-blog-item__img-area">
//             <img
//               src={blog.thumbnail && `${blog.thumbnail.url}`}
//               className="c-blog-item__img"
//             />
//           </div>
//         </a>
//       </Link>
//     </li>
//   ))}
// </ul>;
