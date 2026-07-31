export const ROWS = 10;

export const SLOT_COUNT = 11;

export const PEG_SIZE = 14;

export const ROW_SPACING = 38;

export const COLUMN_SPACING = 40;

export const BOARD_WIDTH = 480;

export const TOP_PADDING = 15;

export const PEGS = [];

let id = 0;

for (

    let row = 0;

    row < ROWS;

    row++

) {

    const pegCount = row + 1;

    const startX =

        BOARD_WIDTH / 2 -

        ((pegCount - 1) * COLUMN_SPACING) / 2;

    for (

        let col = 0;

        col < pegCount;

        col++

    ) {

        PEGS.push({

            id,

            row,

            col,

            x:

                startX +

                col * COLUMN_SPACING,

            y:

                TOP_PADDING +

                row * ROW_SPACING

        });

        id++;

    }

}

export const getPegById = (

    pegId

) =>

    PEGS.find(

        peg =>

            peg.id === pegId

    );