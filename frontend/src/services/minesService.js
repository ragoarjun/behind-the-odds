import api from "./api";

export const startMinesGame = async (
    betAmount,
    mineCount
) => {

    const response =
        await api.post(

            "/games/mines/start",

            {

                betAmount,

                mineCount

            }

        );

    return response.data;

};

export const revealTile = async (
    sessionId,
    tile
) => {

    const response =
        await api.post(

            "/games/mines/reveal",

            {

                sessionId,

                tile

            }

        );

    return response.data;

};

export const cashOut = async (
    sessionId
) => {

    const response =
        await api.post(

            "/games/mines/cashout",

            {

                sessionId

            }

        );

    return response.data;

};