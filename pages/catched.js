import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout';

export default () => {

    return (
        <Layout>
            <Head>
                <title>Catched Pokemon</title>
            </Head>
            <Link href="/">
                <a>go back to main page</a>
            </Link>
        </Layout>
    );

};