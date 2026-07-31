import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/shared/PageHeader";

import SearchBar from "../components/transactions/SearchBar";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionList from "../components/transactions/TransactionList";
import Pagination from "../components/transactions/Pagination";

import { getTransactions } from "../services/transactionService";

const Transactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [gameFilter, setGameFilter] = useState("All");
    const [resultFilter, setResultFilter] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        fetchTransactions();

    }, []);

    useEffect(() => {

        setCurrentPage(1);

    }, [search, gameFilter, resultFilter]);

    const fetchTransactions = async () => {

        try {

            const data = await getTransactions();

            setTransactions(data.transactions);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const filteredTransactions = transactions.filter(transaction => {

        const matchesSearch =
            transaction.game
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesGame =
            gameFilter === "All" ||
            transaction.game === gameFilter;

        const matchesResult =
            resultFilter === "All" ||
            transaction.result === resultFilter;

        return (
            matchesSearch &&
            matchesGame &&
            matchesResult
        );

    });

    const transactionsPerPage = 10;

    const indexOfLastTransaction =
        currentPage * transactionsPerPage;

    const indexOfFirstTransaction =
        indexOfLastTransaction - transactionsPerPage;

    const currentTransactions =
        filteredTransactions.slice(
            indexOfFirstTransaction,
            indexOfLastTransaction
        );

    const totalPages = Math.ceil(
        filteredTransactions.length /
        transactionsPerPage
    );

    return (

        <DashboardLayout>

            <PageHeader
                title="Transactions"
                subtitle="View your complete betting history."
            />

            <div className="flex flex-col lg:flex-row gap-6 mb-8">

                <SearchBar
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <TransactionFilters
                    gameFilter={gameFilter}
                    resultFilter={resultFilter}
                    onGameChange={(e) =>
                        setGameFilter(e.target.value)
                    }
                    onResultChange={(e) =>
                        setResultFilter(e.target.value)
                    }
                />

            </div>

            {

                loading ?

                    <div className="text-center py-20 text-gray-500">

                        Loading Transactions...

                    </div>

                    :

                    <>

                        <TransactionList
                            transactions={currentTransactions}
                        />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />

                    </>

            }

        </DashboardLayout>

    );

};

export default Transactions;