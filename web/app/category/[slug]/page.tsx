import { Suspense } from 'react';

import { client } from '@/lib/sanity';

import {
  COLLECTION_INFO_QUERY,
  PRODUCTS_BY_COLLECTION_QUERY,
  ALL_PRODUCTS_QUERY,
  ALL_NEW_ARRIVALS_QUERY,
  ALL_BESTSELLERS_QUERY,
} from '@/lib/queries';

import { CollectionGrid } from '@/components/collection-grid';

// ======================================================
// IMPORTANT: PREVENT STALE CATEGORY DATA
// ======================================================

export const dynamic = 'force-dynamic';
export const revalidate = 0;


// ======================================================
// CATEGORY LOADER
// ======================================================

function CategoryGridLoader() {
  return (
    <div className="w-full mt-4">

      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <div className="h-4 w-24 bg-gray-200 animate-pulse" />
        <div className="h-8 w-24 bg-gray-200 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-x-6 md:gap-y-10">

        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3"
          >
            <div className="w-full aspect-[3/4] bg-gray-100 animate-pulse" />

            <div className="h-3 w-3/4 bg-gray-200 animate-pulse" />

            <div className="h-3 w-1/4 bg-gray-200 animate-pulse" />
          </div>
        ))}

      </div>
    </div>
  );
}


// ======================================================
// CATEGORY CONTENT
// ======================================================

async function CategoryPageContent({
  paramsPromise,
  searchParamsPromise,
}: {
  paramsPromise: Promise<{
    slug: string;
  }>;

  searchParamsPromise: Promise<any>;
}) {

  const params = await paramsPromise;
  const searchParams = await searchParamsPromise;

  const { slug } = params;

  let fetchedProducts: any[] = [];
  let collectionInfo: any = null;


  // ======================================================
  // SHOP ALL
  // ======================================================

  if (slug === 'all') {

    fetchedProducts = await client
      .fetch(
        ALL_PRODUCTS_QUERY,
        {},
        {
          cache: 'no-store',
        }
      )
      .catch((error) => {
        console.error(
          'ALL PRODUCTS FETCH ERROR:',
          error
        );

        return [];
      });

    collectionInfo = {
      title: 'Shop All',
      description:
        'Explore our complete collection.',
    };
  }


  // ======================================================
  // NEW ARRIVALS
  // ======================================================

  else if (slug === 'new-in') {

    fetchedProducts = await client
      .fetch(
        ALL_NEW_ARRIVALS_QUERY,
        {},
        {
          cache: 'no-store',
        }
      )
      .catch((error) => {
        console.error(
          'NEW ARRIVALS FETCH ERROR:',
          error
        );

        return [];
      });

    collectionInfo = {
      title: 'New Arrivals',
      description:
        'The latest additions to our store.',
    };
  }


  // ======================================================
  // BESTSELLERS
  // ======================================================

  else if (slug === 'bestsellers') {

    fetchedProducts = await client
      .fetch(
        ALL_BESTSELLERS_QUERY,
        {},
        {
          cache: 'no-store',
        }
      )
      .catch((error) => {
        console.error(
          'BESTSELLERS FETCH ERROR:',
          error
        );

        return [];
      });

    collectionInfo = {
      title: 'Bestsellers',
      description:
        'Our most loved pieces.',
    };
  }


  // ======================================================
  // NORMAL CATEGORY
  // ======================================================

  else {

    const results = await Promise.all([

      client
        .fetch(
          COLLECTION_INFO_QUERY,
          { slug },
          {
            cache: 'no-store',
          }
        )
        .catch((error) => {
          console.error(
            `COLLECTION INFO FETCH ERROR (${slug}):`,
            error
          );

          return null;
        }),

      client
        .fetch(
          PRODUCTS_BY_COLLECTION_QUERY,
          { slug },
          {
            cache: 'no-store',
          }
        )
        .catch((error) => {
          console.error(
            `PRODUCT FETCH ERROR (${slug}):`,
            error
          );

          return [];
        }),

    ]);

    collectionInfo = results[0];
    fetchedProducts = results[1];
  }


  // ======================================================
  // TITLE + DESCRIPTION
  // ======================================================

  const title =
    collectionInfo?.title ||
    slug
      .replace(/-/g, ' ')
      .toUpperCase();

  const description =
    collectionInfo?.subheading ||
    collectionInfo?.description ||
    'From Timeless Comfort to Occasion Elegance.';


  // ======================================================
  // PRODUCTS
  // ======================================================

  let products = Array.isArray(fetchedProducts)
    ? [...fetchedProducts]
    : [];


  // ======================================================
  // HIGHEST PRICE
  // ======================================================

  const highestPrice =
    products.length > 0
      ? Math.max(
          ...products.map(
            (product: any) =>
              Number(product.price) || 0
          )
        )
      : 0;


  // ======================================================
  // AVAILABILITY FILTER
  // ======================================================

  const availability =
    typeof searchParams.availability === 'string'
      ? searchParams.availability
      : '';

  if (availability === 'in_stock') {

    products = products.filter(
      (product: any) => {

        if (
          !product.sizes ||
          product.sizes.length === 0
        ) {
          return true;
        }

        return product.sizes.some(
          (size: any) =>
            Number(size.stock) > 0
        );
      }
    );
  }

  else if (
    availability === 'out_of_stock'
  ) {

    products = products.filter(
      (product: any) => {

        if (
          !product.sizes ||
          product.sizes.length === 0
        ) {
          return false;
        }

        return product.sizes.every(
          (size: any) =>
            Number(size.stock) === 0
        );
      }
    );
  }


  // ======================================================
  // PRICE FILTER
  // ======================================================

  const priceFilter =
    typeof searchParams.price === 'string'
      ? searchParams.price
      : '';

  if (priceFilter) {

    if (priceFilter === '30000+') {

      products = products.filter(
        (product: any) =>
          (Number(product.price) || 0) >=
          30000
      );

    }

    else {

      const [minStr, maxStr] =
        priceFilter.split('-');

      const min =
        parseInt(minStr, 10) || 0;

      const max =
        maxStr
          ? parseInt(maxStr, 10) ||
            Infinity
          : Infinity;

      products = products.filter(
        (product: any) => {

          const productPrice =
            Number(product.price) || 0;

          return (
            productPrice >= min &&
            productPrice <= max
          );
        }
      );
    }
  }


  // ======================================================
  // SORT
  // ======================================================

  const sort =
    typeof searchParams.sort === 'string'
      ? searchParams.sort
      : '';

  if (sort === 'price_asc') {

    products.sort(
      (a: any, b: any) =>
        (Number(a.price) || 0) -
        (Number(b.price) || 0)
    );

  }

  else if (sort === 'price_desc') {

    products.sort(
      (a: any, b: any) =>
        (Number(b.price) || 0) -
        (Number(a.price) || 0)
    );

  }

  else if (sort === 'newest') {

    products.sort(
      (a: any, b: any) => {

        const dateA =
          new Date(
            a._createdAt || 0
          ).getTime();

        const dateB =
          new Date(
            b._createdAt || 0
          ).getTime();

        return dateB - dateA;
      }
    );
  }


  // ======================================================
  // PAGE
  // ======================================================

  return (
    <>

      <div className="mb-12 text-center md:text-left flex flex-col items-center md:items-start">

        <h1 className="text-xl md:text-2xl font-semibold uppercase text-gray-900 mb-2 text-pretty tracking-normal">
          {title}
        </h1>

        <div className="text-sm md:text-base text-gray-600 italic font-serif">
          {description}
        </div>

      </div>


      <CollectionGrid
        key={`${slug}-${sort}-${availability}-${priceFilter}`}
        products={products}
        highestPrice={highestPrice}
      />

    </>
  );
}


// ======================================================
// CATEGORY PAGE
// ======================================================

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{
    slug: string;
  }>;

  searchParams: Promise<{
    [key: string]:
      | string
      | string[]
      | undefined;
  }>;
}) {

  return (

    <div className="max-w-[1800px] mx-auto px-4 lg:px-8 py-8 md:py-12">

      <Suspense
        fallback={
          <CategoryGridLoader />
        }
      >

        <CategoryPageContent
          paramsPromise={params}
          searchParamsPromise={
            searchParams
          }
        />

      </Suspense>

    </div>
  );
}
