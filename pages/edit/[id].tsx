import React from "react";
import Head from "next/head";
import { URL } from "../../utils/url";
import { GetServerSideProps } from "next";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import SnippetForm from "../../components/SnippetForm";
import type { snippetType } from "../../components/SnippetForm";
import axios from "axios";

function Edit({ data }) {
  // console.log(data);

  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Edit Snippet | snippet.bin</title>
      </Head>

      <main className="max-w-lg mx-auto">
        <div className="flex flex-row items-center justify-between space-x-4 mb-4">
          <button
            onClick={() => router.back()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium text-sm py-2 px-4 inline-flex items-center space-x-2 shadow-sm rounded-md focus:outline-none focus:shadow-outline"
          >
            <AiOutlineArrowLeft />
            <span>Back</span>
          </button>
          <p className="font-bold text-3xl">Edit Snippet</p>
        </div>
        <SnippetForm snippet={data[0]} />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id } = context.params;
    const { data } = await axios.get(`${URL}/api/snippet/${id}`);

    return {
      props: { data },
    };
  } catch (error) {
    console.log(error);
    context.res.statusCode = 302;
    context.res.setHeader("Location", `/`);
    return { props: {} };
  }
};

export default Edit;
