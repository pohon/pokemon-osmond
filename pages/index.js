import useSWR from 'swr';

import fetcher from '../utils/fetcher'

import Layout from '../components/layout'
import ListThumbnail from '../components/listThumbnail'
import Pagination from '../components/pagination'

export default function Home({ }) {

    // hooks
    const { data } = useSWR('https://pokeapi.co/api/v2/pokemon', fetcher)
    const results = data?.results || [];

    return (
        <Layout>
            <div id="pokelist" style={{ background: `url("https://tailwindcss.com/_next/static/media/hero@75.b2469a49.jpg")` }}>
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Pokémon</h2>

                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mb-8">
                        {results.map((pokemon, idx) => (
                            <ListThumbnail key={`result-${idx}`} { ...pokemon } />
                        ))}
                    </div>

                    <Pagination />
                </div>
            </div>
        </Layout>
    )
}
