// components/Users.js
import axios from "axios";
import useSWR from "swr";
import Link from "next/link"
import { Layout } from "components/layout"
import Head from "next/head"
import { useState } from 'react';

import Post from '../components/Posts';
import { useGetPosts, usePaginatePosts } from '../components/useRequest';

import * as React from "react"
import Image from "next/image"
import { DrupalNode } from "next-drupal"
import {
  DrupalNode,
  getSearchIndexFromContext,
  deserialize,
  JsonApiSearchApiResponse,
  DrupalSearchApiFacet,
} from "next-drupal"
import { GetStaticPropsResult } from "next"
import { useRouter } from "next/router"

const params = {
  fields: {
    "attributes":
      "id,title,status,body",
  },
  filter: {field_tags: '32'},

}

interface AdvancedPageProps {
  nodes: DrupalNode[]
  facets: DrupalSearchApiFacet[]
}


export default function Page

  ({
    index, blogspinned,
    nodes,
    facets: initialFacets,
  }: AdvancedPageProps) {
    const router = useRouter()
    const [status, setStatus] = React.useState<"error" | "success" | "loading">()
    const [results, setResults] = React.useState<DrupalNode[]>(nodes)
    const [facets, setFacets] =
      React.useState<DrupalSearchApiFacet[]>(initialFacets)

    async function handleSubmit(event) {
      event.preventDefault()
    setStatus("loading")
      for (const filter of ["fulltext"]) {
        if (event.target[filter]?.value != "") {
          params["filter"][filter] = event.target[filter]?.value
        }
      }

      setStatus("loading")
      const response = await fetch("/api/search/federage", {
        method: "POST",
        body: JSON.stringify({
          deserialize: false,
          params,
        }),
      })

      if (!response.ok) {
        return setStatus("error")
      }

      setStatus("success")

      const json = await response.json()
      const results = deserialize(json) as DrupalNode[]

      setResults(results)

      if (results?.length) {
        setFacets(json.meta.facets)
      }
    }



  const { posts, error, isLoadingMore, size, setSize, isReachingEnd } =
    usePaginatePosts();

  if (error) return <h1>Something went wrong!</h1>;
  if (!posts) return <h1>Chargement...</h1>;

  return (
    <Layout>
      <Head>
        <title>Federage ⎟ Réseau de financement pour entreprises</title>
        <meta
          name="Federage"
          content="Federage ⎟ Réseau de financement pour entreprises."
        />
      </Head>

      <h2 className="mb-7 text-3xl titregras">Blog</h2>


      <p className="mb-3">Tutoriels, méthodes, bonnes pratiques : découvrez les multiples applications du réseau économique. Utilisez la barre de recherche pour filtrer par titre.
        </p>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="inputWithButton">
           <input
            type="search"
            placeholder="Rechercher un article (min 4 characters)..."
            name="fulltext"
            className="block w-4/5 col-span-5 px-2 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
          />

<button
  type="submit"
  data-cy="btn-submit"
  className="flex justify-center px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-black"
>
  {status === "Chargement" ? "Veuillez patienter..." : "Recherche"}
</button>

 </div>
        </form>
        {status === "error" ? (
          <div className="px-4 py-2 text-sm text-red-600 bg-red-100 border-red-200 rounded-md">
            Une erreur vient de se produite. Veuillez recommencer.
          </div>
        ) : null}
        {!results.length ? (
          <p className="text-sm" data-cy="search-no-results">
            Aucun résultat trouvé.
          </p>
        ) : (
          <div className="pt-4">
            <div className="grid gap-6 md:grid-cols-1">


              {results.map((node) => (
                <div key={node.id}>
                  <article
                    className="grid grid-cols-1 gap-4"
                    data-cy="search-result"
                  >

                    <div className="col-span-2">
                    <Link href={node.path.alias} passHref>
                      <a className="no-underline hover:text-blue-600">
                        <h2 className="mb-4 text-4xl titreteaser">{node.title}</h2>
                      </a>
                    </Link>                      <p className="m-0 text-base">{node.body.summary}</p>
                      <Link href={node.path.alias} passHref>
                        <a className="flex items-center mt-4 text-sm hover:text-blue-500">
                          Lire la suite
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 ml-2"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </a>
                      </Link>
                    </div>
                  </article>
                  <hr className="my-10" />

                </div>
              ))}
            </div>
          </div>
        )}

    <div>



    </div>
      </Layout>
  );
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<BlogPageProps>> {
  const results = await getSearchIndexFromContext<JsonApiSearchApiResponse>(
    "federage",
    context,
    {
      deserialize: false,
      params,
    }
  )

  const res3 = await fetch('https://aout.septembre.io/blogpinnedfederage')
  const blogspinned = await res3.json()
  console.log('blogspinned')

  return {
    props: {
      blogspinned,
      nodes: deserialize(results) as DrupalNode[],
      facets: results.meta.facets,
    },
  }
}
