import Link from "next/link";
import Head from "next/head";
import { client } from "../../../libs/client";
import HeaderRadius from "../../../components/header-radius";
import Footer from "../../../components/footer";
import Title from "../../../components/title";
import MyHead from "../../../components/head";
import { Pagination } from "../../..//components/Pagination";
import Switch from "../../../components/switch";

const PER_PAGE = 9;

// 動的なページを作成
// 動的なページを作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });

  const pageNumbers = [];

  const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  );

  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({
    endpoint: "blog",
    queries: { offset: (id - 1) * 9, limit: 9 },
  });

  // カテゴリーコンテンツの取得
  const categoryData = await client.get({ endpoint: "categories" });

  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
      totalCount: data.totalCount,
    },
  };
};

const BlogPageId = ({ blog, category, totalCount }) => {
  {
    blog.map((blog) =>
      (() => {
        const title = blog.title;
        const titleLength = 20;
        if (title.length > titleLength) {
          return (blog.title = title.substring(0, titleLength) + "...");
        }
      })()
    );
  }
  {
    blog.map((blog) =>
      (() => {
        const text = blog.text;
        const textLength = 100;
        if (text.length > textLength) {
          return (blog.text = text.substring(0, textLength) + "...");
        }
      })()
    );
  }
  return (
    <>
      <MyHead title={"Cording_Test"} />
      <HeaderRadius list={category} />
      <section className="l-cont">
        <div className="l-cont__inner">
          <div className="p-home">
            <ul className="c-blog">
              {blog.map((blog) => (
                <li className="c-blog-item" key={blog.id}>
                  <Link href={`/blog/${blog.id}`}>
                    <a>
                      <div className="c-blog-item__text-area">
                        <div className="c-blog-item__head">
                          <p className="c-blog-item__cat">
                            {blog.category && `${blog.category.name}`}
                          </p>
                          <p className="c-blog-item__date">{blog.date}</p>
                        </div>
                        <div className="c-blog-item__body">
                          <p className="c-blog-item__title">{blog.title}</p>

                          <div
                            className="c-blog-item__text"
                            dangerouslySetInnerHTML={{
                              __html: `${blog.text}`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="c-blog-item__img-area">
                        <img
                          src={blog.thumbnail && `${blog.thumbnail.url}`}
                          className="c-blog-item__img"
                        />
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-home p-home--pagenation">
            <Pagination totalCount={totalCount} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default BlogPageId;
