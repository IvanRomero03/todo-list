import Head from "next/head";

const header = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Todo List App" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
    </>
  );
};

export default header;
