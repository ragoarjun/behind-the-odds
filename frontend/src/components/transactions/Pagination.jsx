const Pagination = ({

    currentPage,

    totalPages,

    setCurrentPage

}) => {

    if (totalPages <= 1) {

        return null;

    }

    const maxVisiblePages = 5;

    let startPage = Math.max(

        1,

        currentPage - 2

    );

    let endPage = Math.min(

        totalPages,

        startPage + maxVisiblePages - 1

    );

    if (

        endPage - startPage + 1 <

        maxVisiblePages

    ) {

        startPage = Math.max(

            1,

            endPage - maxVisiblePages + 1

        );

    }

    const pages = [];

    for (

        let i = startPage;

        i <= endPage;

        i++

    ) {

        pages.push(i);

    }

    return (

        <div className="flex justify-center items-center gap-3 mt-8">

            <button

                onClick={() =>

                    setCurrentPage(

                        currentPage - 1

                    )

                }

                disabled={currentPage === 1}

                className="

                    px-4

                    py-2

                    rounded-lg

                    bg-[#181818]

                    border

                    border-[#2A2A2A]

                    disabled:opacity-40

                    hover:border-red-500

                    transition

                "

            >

                Previous

            </button>

            {

                pages.map(page => (

                    <button

                        key={page}

                        onClick={() =>

                            setCurrentPage(page)

                        }

                        className={`

                            w-10

                            h-10

                            rounded-lg

                            transition

                            ${

                                currentPage === page

                                    ? "bg-red-500 text-white"

                                    : "bg-[#181818] border border-[#2A2A2A] hover:border-red-500"

                            }

                        `}

                    >

                        {page}

                    </button>

                ))

            }

            <button

                onClick={() =>

                    setCurrentPage(

                        currentPage + 1

                    )

                }

                disabled={

                    currentPage === totalPages

                }

                className="

                    px-4

                    py-2

                    rounded-lg

                    bg-[#181818]

                    border

                    border-[#2A2A2A]

                    disabled:opacity-40

                    hover:border-red-500

                    transition

                "

            >

                Next

            </button>

        </div>

    );

};

export default Pagination;