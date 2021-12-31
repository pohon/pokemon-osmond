import { Fragment } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

export default ({ modalData, onChange }) => {

  // props
  const open = !!modalData;
  const types = modalData?.types || [];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onChange}>
        <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{ fontSize: 0 }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
              <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  onClick={onChange}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                  <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                    <img
                      src={modalData?.sprites?.other?.['official-artwork']?.front_default}
                      alt={modalData?.name}
                      className="object-center object-contain"
                    />
                  </div>
                  <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12 capitalize">{`${modalData?.name} #${modalData?.id}`}</h2>

                    <section aria-labelledby="information-heading" className="mt-2">


                      <h4 className="mt-4 text-sm text-gray-900 font-medium">Base Exp</h4>
                      <p className="text-2xl text-gray-900">{modalData?.base_experience}</p>

                      {/* Types */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm text-gray-900 font-medium">Type</h4>
                        </div>

                        <RadioGroup className="mt-4">
                          <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                          <div className="grid grid-cols-4 gap-4">
                            {types.map(type => (
                              <RadioGroup.Option
                                key={type?.type?.url}
                                className="bg-white shadow-sm text-gray-900 group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase focus:outline-none sm:flex-1"
                              >{type?.type?.name}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>

                      {/* stats */}
                      <div className='mt-10'>
                        <table className="mt-4 min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Stats
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Value
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {modalData?.stats?.map(stat => (
                              <tr key={stat.email}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{stat?.stat?.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat?.base_stat}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>

                    <section aria-labelledby="options-heading" className="mt-10">

                      <form>
                        <button
                          type="submit"
                          className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Catch this Pokémon
                        </button>
                      </form>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
