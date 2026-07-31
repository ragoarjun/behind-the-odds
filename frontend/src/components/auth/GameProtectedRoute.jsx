import {

    useEffect,

    useState

} from "react";

import {

    Navigate

} from "react-router-dom";

import {

    getProtectionStatus

} from "../../services/recoveryService";

const GameProtectedRoute = ({

    children

}) => {

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        blocked,

        setBlocked

    ] = useState(false);

    useEffect(() => {

        const checkStatus = async () => {

            try {

                const data = await getProtectionStatus();

                setBlocked(

                    data.cooldownActive ||

                    data.breakActive

                );

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        };

        checkStatus();

    }, []);

    if (loading) {

    return null;

    }

    if (blocked) {

        return <Navigate to="/recovery" replace />;

    }

    return children;

};

export default GameProtectedRoute;