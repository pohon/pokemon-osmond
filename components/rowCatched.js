import useSWR from 'swr';

import fetcher from '../utils/fetcher'

export default ({ id, onDelete, timestamp }) => {

  // hooks
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon/${id}`, fetcher)
  const types = data?.types || []

  // handlers
  const handleToggleDelete = () => {
    onDelete(id)
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={data?.sprites?.other?.['official-artwork']?.front_default} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 capitalize">{data?.name}</div>
            <div className="text-sm text-gray-500">#{id}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{new Date(timestamp).toDateString()}</div>
        <div className="text-sm text-gray-500">{new Date(timestamp).toTimeString()}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {
          types.map((type, idx) => (
            <span key={`collected-type-${idx}`} className="px-2 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full border text-slate-500 capitalize">
              {type?.type?.name}
            </span>
          ))
        }
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data?.base_experience}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a data-testid="toggleDeleteBtn" onClick={handleToggleDelete} className="text-red-600 hover:text-red-900 cursor-pointer">
          Delete
        </a>
      </td>
    </tr>
  );
};