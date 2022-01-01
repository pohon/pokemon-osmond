import cn from 'classnames'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import paginationGenerator from '../utils/paginationGenerator'

export default ({ count, limit, offset, onChange }) => {

    // props
    const isFirstPage = offset === 0
    const isLastPage = (count - offset) <= limit
    const totalPages = Math.ceil(count / limit)
    const currentPage = Math.floor(offset / limit + 1)
    const displayedPages = paginationGenerator(currentPage, totalPages);

    // handlers
    const handleClickPrev = () => {
        if (isFirstPage) return

        onChange(offset - limit)    // newOffset = offset - limit
    };
    const handleClickNext = () => {
        if (isLastPage) return

        onChange(offset + limit)    // newOffset = offset - limit
    };
    const handleClickPage = newPage => () => {
        const newOffset = (newPage - 1) * limit;

        onChange(newOffset)
    };

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <a
                    onClick={handleClickPrev}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    onClick={handleClickNext}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{offset + 1}</span> to <span className="font-medium">{isLastPage ? count : offset + limit}</span> of{' '}
                        <span className="font-medium">{count}</span> results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a
                            onClick={handleClickPrev}
                            className={cn('relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500', {
                                'hover:bg-gray-50 cursor-pointer': !isFirstPage,
                                'cursor-not-allowed': isFirstPage
                                
                            })}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                        {
                            displayedPages.map((page, idx) => {

                                if (page === "...") {
                                    return (
                                        <span
                                            key={`page-btn-${idx}`}
                                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                            {page}
                                        </span>
                                    )
                                }

                                return (
                                    <a
                                        key={`page-btn-${idx}`}
                                        onClick={handleClickPage(page)}
                                        aria-current="page"
                                        className={cn('cursor-pointer relative inline-flex items-center px-4 py-2 border text-sm font-medium', {
                                            'z-10 bg-indigo-50 border-indigo-500 text-indigo-600': currentPage === page,
                                            'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': currentPage !== page
                                        })}
                                    >
                                        {page}
                                    </a>
                                )
                            })
                        }

                        <a
                            onClick={handleClickNext}
                            className={cn('relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500', {
                                'hover:bg-gray-50 cursor-pointer': !isLastPage,
                                'cursor-not-allowed': isLastPage
                            })}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}
