import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import ModalDeleteConfirmation from '../components/modalDeleteConfirmation'
import RowCatched from '../components/rowCatched'

export default () => {

    // states
    const [catchedPokemon, setCatchedPokemon] = useState([])
    const [toBeDeletedID, setToBeDeletedID] = useState(null)   // value is either 'null' or number

    // handlers
    const toggleDelete = id => {
        setToBeDeletedID(id)
    }
    const handleModalDeleteChange = () => {
        if (!!toBeDeletedID) {
            setToBeDeletedID(null)
        }
    }
    const handleConfirmDelete = () => {
        const currentCatchedPokemon = JSON.parse(localStorage.getItem('CATCHED_POKEMON')) || []
        const currentCatchedPokemonIds = currentCatchedPokemon.map(o => o.id)
        const tobeRemovedIdx = currentCatchedPokemonIds.indexOf(toBeDeletedID)

        currentCatchedPokemon.splice(tobeRemovedIdx, 1);

        // update LS
        localStorage.setItem("CATCHED_POKEMON", JSON.stringify(currentCatchedPokemon));

        // update state
        setCatchedPokemon([...currentCatchedPokemon]);

        // hide modal
        setToBeDeletedID(null)
    }

    // effects
    useEffect(() => {
        if (localStorage) {
            setCatchedPokemon(JSON.parse(localStorage?.getItem('CATCHED_POKEMON')) || [])
        }
    }, [])

    return (
        <Layout>
            <div className="bg-gray-50 h-screen">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block">Already catched some Pokémon?</span>
                        <span className="block text-indigo-600">Below is your collected Pokémon.</span>
                    </h2>
                </div>
                <div className="flex flex-col max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Pokémon
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Catched Date & Time
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Type
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Base Exp
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Delete</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {
                                            catchedPokemon?.length > 0 ? (
                                                catchedPokemon.map((catched, idx) => (
                                                    <RowCatched
                                                        key={`row-catched-${idx}`}
                                                        onDelete={toggleDelete}
                                                        {...catched}
                                                    />
                                                ))
                                            ) : (
                                                <tr>
                                                        <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-gray-400 text-center">
                                                        No data available
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalDeleteConfirmation
                toBeDeletedID={toBeDeletedID}
                onChange={handleModalDeleteChange}
                onDeleteConfirmed={handleConfirmDelete}
            />
        </Layout>
    )

}