import useSWR from 'swr';
import cn from 'classnames';

import fetcher from '../utils/fetcher'

export default ({ onClick, url }) => {

    // hooks
    const { data, error } = useSWR(url, fetcher)
    const loading = !error && !data // based on docs

    return (
        <a data-testid="pokemonThumbnail" onClick={() => onClick(data)} className="group cursor-pointer">
            <div className={cn('w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8', {
                'animate-pulse': loading
            })}>
                <img
                    src={data?.sprites?.other?.['official-artwork']?.front_default}
                    alt={data?.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-sm text-gray-700 capitalize">{data?.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">#{data?.id}</p>
        </a>
    )
};