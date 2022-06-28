import { GET_COMMERCES, GET_ID_COMMERCES } from "../../graphql/Commerce";
import Link from "next/link";
import client from "../../apollo/client";
import slugify from "../../lib/slugify";
import Layout from "../../components/organisms/structure/layout";
import Pagination from "../../components/organisms/pageCommerces/pagination";
import { CommerceConnection } from "../../interfaces/commerce";
import Card from "../../components/atoms/general/card";

const nbCommercePage = 2;

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ID_COMMERCES,
    variables: { first: 99999 },
  });
  const paths = [
    ...Array(Math.ceil(data.commerces.edges.length / nbCommercePage)),
  ].map((edge, i) => ({
    params: { page: (i + 1).toString() },
  }));
  return {
    paths: paths || [],
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { page: string } }) {
  const { data } = await client.query({
    query: GET_COMMERCES,
    variables: { first: 99999 },
  });
  const nbPage = Math.ceil(data.commerces.edges.length / nbCommercePage);

  let commerces = data.commerces.edges.slice(
    (parseInt(params.page) - 1) * nbCommercePage,
    parseInt(params.page) * nbCommercePage
  );

  return {
    props: {
      commerces: { edges: commerces },
      nbPage,
      currentPage: parseInt(params.page),
    },
  };
}

interface ListCommercesProps {
  commerces: CommerceConnection;
  nbPage: number;
  currentPage: number;
}

export default function listCommerces(options: ListCommercesProps) {
  const { commerces, nbPage, currentPage } = options;
  return (
    <Layout title="Commerces">
      <div className="grow flex flex-col items-center justify-between w-full">
        <div className="flex flex-col items-center w-full">
          <div className="w-full h-full flex flex-col items-center justify-between">
            <div className="w-full flex flex-col items-center pt-5">
              {commerces.edges.map((commerce) => (
                <Link
                  key={commerce.node.id}
                  href={`/commerce/${encodeURIComponent(
                    commerce.node.id
                  )}/${encodeURIComponent(
                    slugify(commerce.node.storekeeperWord)
                  )}`}
                >
                  <a className="block w-1/2">
                    <Card className="mb-0">
                      <h3>{commerce.node.name}</h3>
                      <span>{commerce.node.description}</span>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          nbPage={nbPage}
          uri={"/commerces/"}
        />
      </div>
    </Layout>
  );
}
