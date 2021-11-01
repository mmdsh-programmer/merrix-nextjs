import React from "react";
import pages from "src/pages";

export default function categories(props) {}

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
