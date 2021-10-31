import React from "react";
import pages from "src/pages";

export default function categories(props) {
  React.useEffect(() => {
    const { result } = props;
    // let currentPage = pages.filter((page) => page.id === result.id);
    console.log(props);
  }, []);

  return <div></div>;
}

export async function getStaticPaths() {
  const paths = pages.map((page) => ({
    params: { id: page.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const result = pages.find((item) => item.id === Number(id));
  return {
    props: { result },
  };
}
