import { useState } from 'react';
import useSWR from 'swr';

import fetcher from '../utils/fetcher'

import Layout from '../components/layout'
import ModalDetail from '../components/modalDetail';
import Pagination from '../components/pagination'
import ListSkeleton from '../components/listSkeleton'
import ListThumbnail from '../components/listThumbnail'

const limit = 20;

export default function Home({}) {

    // states
    const [offset, setOffset] = useState(0)
    const params = new URLSearchParams({ limit, offset }).toString()
    const [modalData, setModalData] = useState(null)   // value is either 'null' or object

    // hooks
    const { data, error } = useSWR(`https://pokeapi.co/api/v2/pokemon?${params}`, fetcher)
    const results = data?.results || []
    const isLoadingList = !error && !data // based on docs

    // handlers
    const handlePageChange = newOffset => {
        setOffset(newOffset)
    }
    const handleClickThumbnail = pokemonDetail => {
        setModalData(pokemonDetail)
    }
    const handleModalChange = () => {
        if (!!modalData) {
            setModalData(null)
        }
    }

    return (
        <Layout home>
            <div id="pokelist" style={{ background: `url("https://tailwindcss.com/_next/static/media/hero@75.b2469a49.jpg")` }}>
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mb-8">
                        {
                            isLoadingList ? (
                                Array.from(Array(limit), (e, idx) => (
                                    <ListSkeleton key={`list-skeleton-${idx}`} />
                                ))
                            ) : (
                                results.map((pokemon, idx) => (
                                    <ListThumbnail 
                                        key={`list-thumbnail-${idx}`} 
                                        onClick={handleClickThumbnail}
                                        
                                        {...pokemon}
                                    />
                                ))
                            )
                        }
                    </div>

                    {
                        isLoadingList ? (
                            <div data-testid='listLoader' className="animate-pulse bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" />
                        ) : (
                            <Pagination
                                count={data?.count || 0}
                                limit={limit}
                                offset={offset}
                                onChange={handlePageChange}
                            />
                        )
                    }
                </div>
            </div>

            <ModalDetail modalData={modalData} onChange={handleModalChange} />
        </Layout>
    )
}
