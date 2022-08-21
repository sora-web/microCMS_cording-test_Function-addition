import Head from "next/head";

const MyHead = (props) => {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{props.title}</title>
    </Head>
  );
};
export default MyHead;
