import Head from "next/head";

const header = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Todo List App"
          property="description"
        />
        <meta name="keywords" content="Todo List App" property="keywords" />
        <meta name="author" content="IvanRomero03" property="author" />
        <meta name="image" content="./favicon.ico" property="image" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
    </>
  );
};

export default header;
