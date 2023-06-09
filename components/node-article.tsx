import Image from "next/image"
import Link from "next/link"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { formatDate } from "lib/utils"

export function NodeArticle({ node, ...props }) {
  return (
    <article {...props}>

      <h1 className="mb-4 text-6xl font-black leading-tight">{node.title}</h1>
      <NodeMeta node={node} />
      <div className="separateur-contenu" />

      {node.field_image?.uri && (
        <figure>
          <Image
            src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${node.field_image.uri.url}`}
            width={768}
            height={400}
            layout="responsive"
            objectFit="cover"
            alt={node.field_image.resourceIdObjMeta.alt}
          />
          {node.field_image.resourceIdObjMeta.title && (
            <figcaption className="py-2 text-sm text-center text-gray-600">
              {node.field_image.resourceIdObjMeta.title}
            </figcaption>
          )}
        </figure>
      )}

      {node.body?.processed && (

        <div
          dangerouslySetInnerHTML={{ __html: node.body?.processed }}
          className="mt-6 font-serif text-xl leading-loose prose"
        />
      )}

      {node.field_slider?.processed && (
        <Accordion allowToggle>
        <AccordionItem>
        <h2>
          <AccordionButton>
            <div flex='1' textAlign='left'>
Mentions Légales
            </div>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
        <div
          dangerouslySetInnerHTML={{ __html: node.field_slider?.processed }}
          className="mt-6 font-serif  leading-loose prose"
        />
        </AccordionPanel>
        </AccordionItem>


        </Accordion>

      )}

  <div className="my-10" />

    </article>
  )
}

export function NodeArticleTeaser({ node, ...props }) {
  return (
    <article {...props}>
      <Link href={node.path.alias} passHref>
        <a className="no-underline hover:text-blue-600">
          <h2 className="mb-4 text-4xl titreteaser">{node.title}</h2>
        </a>
      </Link>
      {node.field_image?.uri && (
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${node.field_image.uri.url}`}
            width={768}
            height={480}
            layout="responsive"
            objectFit="cover"
            alt={node.field_image.alt}
          />
        </div>
      )}
      {node.body?.summary && (
        <p className="mt-6 font-serif text-xl leading-loose">
          {node.body.summary}
        </p>
      )}
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
    </article>
  )
}
export function NodeArticlePin({ node }) {
  return (
    <article>
          <h2 className="mb-4 text-4xl titregras">{node.title}</h2>

      {node.field_image?.uri && (
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${node.field_image.uri.url}`}
            width={768}
            height={480}
            layout="responsive"
            objectFit="cover"
            alt={node.field_image.alt}
          />
        </div>
      )}
      {node.body?.summary && (
        <p className="mt-6 font-serif text-xl leading-loose">
          {node.body.summary}
          <Link href="/federage/a-propos" passHref>
          <a className="flex items-center mt-4 text-sm text-blue titregras hover:text-blue-500">
            Pour en savoir plus
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="blue"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 ml-2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
            </Link>
        </p>
      )}

    </article>
  )
}

function NodeMeta({ node, ...props }) {

  return (
    <div className="mb-4 text-gray-600" {...props}>
      {node.uid?.display_name ? (
        <span>
          Publié par{" "}
          <span className="font-semibold">{node.uid?.display_name}</span>
        </span>
      ) : null}
      <span> - {formatDate(node.created)}</span>
    </div>
  )
}
