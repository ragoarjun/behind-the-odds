import { ROWS } from "./plinkoBoard";

const pegId = (row, col) =>

    (row * (row + 1)) / 2 + col;

export const generatePath = (targetSlot) => {

    const columns = new Array(ROWS);

    let column = targetSlot;

    columns[ROWS - 1] = column;

    for (

        let row = ROWS - 2;

        row >= 0;

        row--

    ) {

        if (

            column > 0 &&

            Math.random() < 0.5

        ) {

            column--;

        }

        columns[row] = column;

    }

    return columns.map(

        (col, row) =>

            pegId(row, col)

    );

};