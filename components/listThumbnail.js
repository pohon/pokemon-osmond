import useSWR from 'swr';

import fetcher from '../utils/fetcher'

export default ({ url }) => {

    // hooks
    const { data } = useSWR(url, fetcher)

    return (
        <a href={data?.href} className="group">
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                    src={data?.sprites?.other?.['official-artwork']?.front_default}
                    alt={data?.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700 capitalize">{data?.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{data?.base_experience}</p>
        </a>
    )
};