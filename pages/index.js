import Link from "next/link";
import { client } from "../libs/client";
import React, { useRef, useState, useEffect } from "react";
import HeaderRadius from "../components/header-radius";
import Footer from "../components/footer";
import Title from "../components/title";
import MyHead from "../components/head";
import { Pagination } from "../components/Pagination";
import Switch from "../components/switch";

// データをテンプレートに受け渡す部分の処理
export const getStaticProps = async () => {
  const data = await client.get({
    endpoint: "blog",
    queries: { offset: 0, limit: 9 },
  });

  // カテゴリーコンテンツの取得
  const categoryData = await client.get({ endpoint: "categories" });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
      category: categoryData.contents,
    },
  };
};

const Home = ({ blog, category, totalCount }) => {
  return (
    <>
      <MyHead title={"Cording_Test"} />
      <HeaderRadius list={category} />

      <section className="l-cont">
        <div className="l-cont__inner">
          <div className="p-home">
            <div className="c-blog-heading">
              <Title title={"最新の記事"} />
            </div>
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
                          <p className="c-blog-item__title el" idName="el">
                            {blog.title}
                          </p>

                          <div
                            className="c-blog-item__text"
                            dangerouslySetInnerHTML={{
                              __html: `${blog.desc}`,
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
export default Home;
