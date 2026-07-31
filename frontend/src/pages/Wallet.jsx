import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/shared/PageHeader";

import WalletOverview from "../components/wallet/WalletOverview";
import WalletActivity from "../components/wallet/WalletActivity";

import { getWalletData } from "../services/walletService";

const Wallet = () => {

    const [wallet, setWallet] = useState(null);

    const fetchWallet = async () => {

        try {

            const data = await getWalletData();

            setWallet(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchWallet();

    }, []);

    if (!wallet) {

        return (

            <DashboardLayout>

                <div className="text-center py-20 text-gray-500">

                    Loading Wallet...

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <PageHeader
                title="Wallet"
                subtitle="Manage your balance and wallet statistics."
            />

            <WalletOverview wallet={wallet} />

            <WalletActivity wallet={wallet} />

        </DashboardLayout>

    );

};

export default Wallet;