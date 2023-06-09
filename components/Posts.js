import Link from "next/link"


export default function Post({ post }) {
  const { data, body, title, view_node } = post;
  return (
    <>
      <div className=" ">
        <p>


        <Link href={view_node} passHref>
          <a className="no-underline hover:text-blue-600">
            <h2 className="mb-4 text-4xl titreteaser">{title}</h2>
          </a>
        </Link>
        <div
          dangerouslySetInnerHTML={{ __html: body }}
          className="mt-6"
        />
        <Link href={view_node} passHref>
          <a className="flex items-center mt-4 text-sm hover:text-blue-500">
            Lire plus
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
        <hr className="my-10" />

        </p>
        <p>{data}</p>
      </div>
    </>
  );
}
