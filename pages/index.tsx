import Head from "next/head"
import { GetStaticPropsResult } from "next"
import { DrupalNode } from "next-drupal"
import Image from "next/image"
import { getPathsFromContext } from "next-drupal"

import { drupal } from "lib/drupal"
import { NodeArticleTeaser } from "components/node-article"
import { NodeArticlePin } from "components/node-article"

import { Layout } from "components/layout"
import { Heading } from "@chakra-ui/react";


interface IndexPageProps {
  nodes: DrupalNode[],
  nodespromoted: DrupalNode2[]
}

import Link from "next/link"

import { getMenu } from "next-drupal"
import * as React from "react"
import { GetStaticPropsResult } from "next"
import { getResourceCollection, DrupalTaxonomyTerm } from "next-drupal"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import { contactFormSchema } from "../validations/create_account"

type FormData = yup.TypeOf<typeof contactFormSchema>

interface WebformPageProps {
  teams: DrupalTaxonomyTerm[]
}





export default function IndexPage({ nodes, nodespromoted, teams }: IndexPageProps, WebformPageProps) {

  const [status, setStatus] = React.useState<"error" | "success">()
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: yupResolver(contactFormSchema),
  })

  // This makes a POST to a custom API route.
  // The Drupal base URL and the webform_id are NOT exposed.
  async function onSubmit(data: FormData) {
    const response = await fetch(`/api/contact`, {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (response.ok) {
      reset()
      return setStatus("success")
    }

    return setStatus("error")
  }

    return (

    <Layout>
      <Head>
        <title>Federage ⎟ Réseau de financement pour entreprises</title>
        <meta
          name="Federage"
          content="Federage ⎟ Réseau de financement pour entreprises."
        />
      </Head>




      <div>

      {nodespromoted?.length ? (
        nodespromoted.map((node) => (
          <div key={node.id}>
            <NodeArticlePin node={node} />
            <div className="my-10" />
            <div className="my-10" />
          </div>
        ))
      ) : (
        <p className="py-4">No nodes found</p>
      )}

  <h2 className="mb-7 mt-5rem text-3xl titregras">Participer au programme</h2>
  <div className="home-form">
<div className="full-withradius mb-10">
<p>
Connectez votre entreprise pour tester la version beta, c&apos;est parfaitement gratuit.
</p>

        {status === "error" ? (
          <div className="px-4 py-2 text-sm text-red-600 bg-red-100 border-red-200 rounded-md">
            Il y a une erreur. Veuillez recommencer.
          </div>
        ) : null}
        {status === "success" ? (
          <div className="px-4 py-2 text-sm text-green-600 bg-green-100 border-green-200 rounded-md">
            Votre message a été envoyé. Merci.
          </div>
        ) : null}
        {Object.values(formState.errors)?.length ? (
          <div className="px-4 py-2 text-sm text-red-600 bg-red-100 border-red-200 rounded-md">
            {Object.values(formState.errors).map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
        ) : null}




            <form className="space-y-6 inputWithButton" onSubmit={handleSubmit(onSubmit)}>
              <div>

              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >


                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="mon@entreprise.com"
                  className="d-inline-block w-3/6 px-3 py-2 mr-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  {...register("email")}
                />
                <button
                  type="submit"
                  data-cy="btn-submit"
                  className="justify-center px-4 py-2 text-sm d-inline-block font-medium text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-black"
                >
                  Enregistrement
                </button>
              </div>
              <div>

              </div>
              <div>

              </div>
              <div>

              </div>

            </form>
          </div>
</div>
  </div>
<div className="my-10" />

        <h2 className="mb-10 text-3xl titregras">Blog</h2>

        {nodes?.length ? (
          nodes.map((node) => (
            <div key={node.id}>
              <NodeArticleTeaser node={node} />
              <hr className="my-10" />
            </div>
          ))
        ) : (
          <p className="py-4">No nodes found</p>
        )}



    </Layout>
  )
}


export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<IndexPageProps>> {

  const nodespromoted = await drupal.getResourceCollectionFromContext<DrupalNode2[]>(
    "node--federage",
    context,
    {
      params: {
        "filter[promote]": 1,
          "filter[status]": 1,
            "filter[sticky]": 1,
        include: "field_image,uid",
        sort: "-created",
      },
    }
  )

  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--federage",
    context,
    {
      params: {
        "filter[status]": 1,
        "filter[promote]": 0,
            "filter[sticky]": 0,
        include: "field_image,uid",
        sort: "-created",
      },
    }
  )

  return {
    props: {
      nodes,
      nodespromoted,
    },
    revalidate: 60,
  }
}
