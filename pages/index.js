import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1 className="title">
          See{' '}
          <Link href="/catched">
            <a>Catched Pokémon</a>
          </Link>
        </h1>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <button className="button bg-sky-600 hover:bg-sky-700">
          Save changes
        </button>
      </section>
    </Layout>
  )
}