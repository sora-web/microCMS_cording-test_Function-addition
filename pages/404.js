import Link from "next/link";
import { client } from "../libs/client";
import React, { useRef, useState, useEffect } from "react";
import Footer from "../components/footer";
import Title from "../components/title";
import MyHead from "../components/head";
import { Pagination } from "../components/Pagination";
import Switch from "../components/switch";

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

const Custom404 = ({ blog, category, totalCount }) => {
  return (
    <>
      <MyHead title={"404"} />
      <header className="l-header">
        <div className="l-header__inner l-header__inner--article">
          <div className="p-switch__wrapper">
            <Switch />
          </div>
          <div className="p-header">
            <div className="p-header__inner">
              <h1 className="c-logo">
                <Link href={`/`}>
                  <a className="c-logo__link">
                    <svg
                      className="c-logo__svg"
                      viewBox="0 0 80 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M56.248 22.6085C56.2262 22.3867 56.1186 22.0721 55.7275 21.8311C55.2205 21.5566 54.0412 20.5573 52.8793 19.5094C53.7376 18.6029 54.4155 17.5097 54.7247 16.5155C55.1723 15.0748 55.0132 13.8514 54.2379 12.7763C53.5359 11.8031 52.1297 11.1399 50.7369 11.1257C49.71 11.1308 47.5922 11.4013 47.1894 12.0028C46.2914 12.413 45.4471 13.0898 44.6795 14.015C43.1983 15.8002 42.7736 17.891 43.5154 19.751C43.8963 20.7067 44.6986 21.4186 45.7154 21.7043C46.158 21.8282 46.632 21.8758 47.0936 21.8758C47.9558 21.8758 48.78 21.7122 49.2954 21.5832C49.9352 21.4231 50.5509 21.1803 51.1156 20.8731C52.3616 22.0868 53.7157 23.3922 54.1717 23.7912L54.1768 23.7957C54.3549 23.9383 54.5897 24 54.834 24C55.2121 24 55.6121 23.8506 55.8575 23.6203C56.0805 23.4104 56.2883 23.0165 56.248 22.6085ZM47.9693 14.0342C47.9939 14.0201 48.0175 14.007 48.0393 13.9946C48.2074 13.9001 48.3228 13.835 48.4298 13.6947C48.7917 13.5691 49.9217 13.3167 50.9263 13.4644C51.4742 13.5453 52.2002 13.9561 52.5005 14.6663C52.8087 15.3968 52.6008 16.3089 51.8983 17.3043C51.7033 17.5696 51.4899 17.8028 51.2652 18.0121C50.6809 17.4542 50.2237 16.9959 50.0411 16.7825C49.7514 16.4442 49.4186 16.3723 49.1884 16.3723H49.1839C48.8578 16.374 48.5323 16.52 48.3357 16.7548C47.9962 17.1588 48.1945 17.9895 48.7699 18.5684C48.8657 18.664 49.0741 18.8711 49.3553 19.1478C48.4208 19.4669 47.5076 19.5088 46.8824 19.3962C46.4404 19.3164 46.0555 18.9979 45.8264 18.5225C45.4891 17.8226 45.5496 16.9393 45.9877 16.1069C46.525 15.2327 47.1642 14.5293 47.7413 14.1774L47.9715 14.0342H47.9693Z"
                        fill="white"
                      />
                      <path
                        d="M32.8045 0.857264C32.5362 0.334984 32.0168 0.022634 31.3748 0C19.311 0.0396096 16.0297 0.0956288 9.1443 0.179941C6.94591 0.207101 1.50034 0.270477 1.50034 0.270477C0.877906 0.315745 0.384331 0.635451 0.145107 1.14811C-0.0823515 1.63474 -0.039773 2.21983 0.254355 2.638C0.510947 3.0024 0.915442 3.19706 1.40117 3.19706C1.4684 3.19706 1.68578 3.18291 1.68578 3.18291C11.4279 2.78908 13.5226 2.65271 22.203 2.76022C20.5245 5.27939 18.5418 8.17824 16.7603 10.7829C14.0929 14.6827 11.7892 18.0506 11.262 19.0301C11.0038 19.51 10.9449 20.1115 11.104 20.6394C11.248 21.117 11.5584 21.5018 11.9775 21.723C12.2805 21.8826 12.6346 21.9692 12.9904 21.9692C13.6487 21.9692 14.3126 21.6738 14.6733 21.0038C17.8567 14.4626 22.5347 6.6793 25.3286 3.27684C25.3869 3.19649 25.458 3.11275 25.5314 3.02504C25.5897 2.956 25.6491 2.88471 25.7062 2.81171C27.4144 2.84001 29.3114 2.87452 31.4566 2.91583C32.0336 2.95318 32.4986 2.75004 32.7647 2.33979C33.0359 1.92106 33.0516 1.33937 32.8045 0.858396"
                        fill="white"
                      />
                      <path
                        d="M45.2549 11.6295C44.8571 11.1185 44.0839 10.869 43.2828 10.9929C41.202 11.2645 39.8849 12.0816 39.0798 12.721C39.1493 12.6157 39.2087 12.5229 39.2474 12.455L39.3404 12.2734C39.6362 11.677 39.6513 10.6918 39.2003 10.2324C39.0378 10.0671 38.6714 9.83628 38.0406 10.1498L37.9599 10.1945C31.5093 13.666 28.2834 11.6561 28.1405 11.5638C28.0722 11.5259 28.052 11.5027 28.0531 11.5067C28.0324 11.4382 27.8867 11.1123 26.9814 11.0862C24.7382 11.0619 22.5992 11.8224 21.1156 13.185C19.5643 14.6098 18.859 16.1919 19.0775 17.761C19.2932 19.3154 19.859 20.2858 20.9744 21.0107C21.9425 21.5732 22.9409 21.8544 23.9807 21.8544C25.4749 21.8544 27.0542 21.2727 28.7467 20.107C29.2851 19.7523 29.7535 19.3041 30.14 18.7745C30.5675 18.1899 30.851 17.5952 30.9199 17.142C31.0762 16.1059 30.981 15.1711 30.637 14.3586C32.1939 14.4021 33.804 14.2607 35.4276 13.9347C34.1648 16.1783 33.209 17.9857 32.3468 19.759C31.9754 20.5224 32.1065 20.9949 32.2818 21.2563C32.516 21.6071 32.9906 21.8001 33.5155 21.7605C34.0539 21.7197 34.5015 21.4555 34.6859 21.0656C34.7654 20.8817 34.8478 20.6752 34.9368 20.4516C35.3856 19.3296 35.9996 17.7938 37.2635 16.4415C38.7555 14.8452 40.8457 13.881 43.4772 13.5754C44.5176 13.4475 45.2067 13.0933 45.4173 12.5778C45.5434 12.27 45.484 11.9243 45.2543 11.6289L45.2549 11.6295ZM25.4704 13.4441C25.7281 13.3847 25.9802 13.3547 26.2256 13.3547C26.3864 13.3547 26.5444 13.3672 26.6985 13.3932C26.9147 13.6728 27.2447 13.8646 27.6576 13.95C27.7506 13.9693 27.8436 13.9862 27.9366 14.0032L27.9568 14.0072C28.3691 14.4112 28.5837 15.0721 28.5192 15.7455C28.4206 16.777 27.7097 17.7531 26.5186 18.4932L26.4951 18.5062C24.6144 19.5582 23.1364 19.6527 22.1151 18.8005C21.4641 18.1028 21.2747 17.3446 21.5515 16.5456C22.1162 14.9154 24.4351 13.5935 25.4704 13.4441Z"
                        fill="white"
                      />
                      <path
                        d="M79.9363 17.1595C79.8617 16.9484 79.7217 16.816 79.5402 16.7871C79.2203 16.7345 78.8286 17.0027 78.381 17.5833C76.9255 19.1643 75.0459 19.5875 73.88 19.4698C73.6156 19.4432 73.4514 19.3946 73.3556 19.3527C74.3411 18.6691 75.2442 17.9126 76.0431 17.1023C77.0146 16.116 77.8208 15.1745 77.8477 13.6285C77.8617 12.8041 77.6034 12.172 77.079 11.7494C76.3944 11.1982 75.2459 11.0522 74.0066 11.3606C72.0687 11.8422 70.6894 13.1917 70.0177 15.2633C69.8126 15.8959 69.4804 17.1521 69.5594 18.4671C69.5729 18.582 69.5863 18.6658 69.5975 18.7257C69.0272 18.9939 66.2383 20.2637 64.9755 19.7154C64.8074 19.6401 64.7043 19.5287 64.6405 19.3855C64.5021 19.0754 64.6618 18.6471 64.6971 18.5611C64.7548 18.4864 65.003 18.1593 65.4562 17.4594C65.9772 16.6547 67.8507 13.3422 67.965 13.1238C68.1902 12.6728 67.9532 12.1969 67.347 11.8801C66.6081 11.4947 65.3486 11.3951 64.9794 12.1008C64.878 12.2682 64.7677 12.4719 64.655 12.6994C64.4506 13.0689 63.9721 13.8781 63.9721 13.8781C61.3967 18.3941 59.5949 20.1364 58.1551 19.5304C57.5444 19.1711 57.5573 18.4094 58.1949 17.2008C58.8694 15.9219 59.819 14.1899 60.3361 13.3428C60.3546 13.3094 60.6734 12.7877 60.6762 12.7832C60.7938 12.5795 60.8056 12.3627 60.7092 12.1726C60.5468 11.8518 60.0935 11.6328 59.4672 11.5717C58.5551 11.484 58.3243 11.8563 58.0318 12.3294C57.9965 12.3859 56.3545 15.2865 55.6844 16.6706C54.9146 18.2606 54.9679 19.8348 55.8262 20.8805C56.5069 21.7095 57.7164 22.1933 58.9327 22.1933C59.3428 22.1933 59.7535 22.1384 60.1451 22.0229C61.0566 21.7542 62.0124 21.1821 62.8611 20.4018C62.9541 20.8267 63.1922 21.3224 63.7564 21.6772C64.9917 22.4541 67.2675 22.2238 70.5326 20.9891C70.5684 21.0152 70.6183 21.0548 70.6502 21.0836C71.5208 21.8753 73.0262 22.2419 74.6795 22.0648C76.3966 21.8804 77.9384 21.1493 78.9099 20.0589C79.8259 19.0205 80.1508 17.7689 79.9357 17.1583L79.9363 17.1595ZM75.5753 13.7666C75.498 14.23 75.0795 14.8276 74.3316 15.5434C73.4436 16.3927 72.7455 16.9829 72.29 17.2698C72.2917 17.1776 72.2968 17.0604 72.3063 16.9207C72.3898 15.7901 72.8576 14.7965 73.5898 14.1938C74.1153 13.761 74.7417 13.568 75.3546 13.6484C75.4991 13.6676 75.5607 13.6857 75.5865 13.6964C75.5848 13.7129 75.5804 13.7372 75.5753 13.766"
                        fill="white"
                      />
                    </svg>
                  </a>
                </Link>
              </h1>
              <div className="p-header-pc lg-on">
                <div className="p-header__nav">
                  <ul className="p-header__list">
                    {category.map((category) => (
                      <li key={category.id} className="p-header__item lg-mr20">
                        <Link href={`/category/${category.id}`}>
                          <a>{category.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="l-heading">
          <div className="l-heading__inner">
            <div className="p-heading">
              <div className="p-heading__inner">
                <div className="c-blog-item__text-area">
                  <div className="c-blog-item__head p-heading__head">
                    <p className="c-blog-item__cat p-heading__cat p-404__cat">
                      404not found
                    </p>
                  </div>
                </div>
                <h1 className="p-heading__title">
                  アクセスしようとしたページは見つかりませんでした。
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="l-cont-page">
          <div className="l-cont-page__inner">
            <div className="p-404">
              <div className="p-404__inner">
                <div className="p-404__text">
                  <p className="p-404__message">
                    指定された <br className="p-404__br--sp"></br>
                    ファイルまたはディレクトリは
                    <br className="p-404__br--tab"></br>存在いたしません。
                  </p>
                  <Link href={`/`}>
                    <a className="p-404__link">Homeへ戻る</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="p-footer--404">
        <Footer />
      </div>
    </>
  );
};
export default Custom404;
