export function recDiv(refGrid, startRow, endRow, startCol, endCol)
{
    //if the height or width of the grid is <= 1, return
    let height = endRow - startRow + 1;
    let width = endCol - startCol + 1;

    if (height <= 1 || width <= 1)
    {
        return;
    }

    //pick an ODD number between startRow and endRow
    if (height > width)
    {
        partitionRow(refGrid, startRow, endRow, startCol, endCol);
    }
    else 
    {
        partitionCol(refGrid, startRow, endRow, startCol, endCol);
    }
}

function partitionRow(refGrid, startRow, endRow, startCol, endCol)
{
    let height = endRow - startRow + 1;
    let width = endCol - startCol + 1;
    let wallRow = Math.floor(Math.random() * ~~(height/2)) * 2 + startRow + 1;

    //fill that row (From startcol to endCol) with walls
    for (let i = startCol; i <= endCol; i++)
    {
        let node = refGrid[wallRow][i];
        if (!node.state.isStart && !node.state.isEnd && !node.state.isWall)
        {
            node.toggleWall()
        }
    }

    //erase one block on the column/row, only on even row/col, respectively
    let gapCol = Math.floor(Math.random() * ~~((width + 1) / 2)) * 2 + startCol;

    let state = refGrid[wallRow][gapCol].state;
    state.isWall = false;
    refGrid[wallRow][gapCol].setState(state);

    recDiv(refGrid, startRow, wallRow-1, startCol, endCol);
    recDiv(refGrid, wallRow+1, endRow, startCol, endCol);
}

function partitionCol(refGrid, startRow, endRow, startCol, endCol)
{
    let height = endRow - startRow + 1;
    let width = endCol - startCol + 1;
    let wallCol = Math.floor(Math.random() * ~~(width/2)) * 2 + startCol + 1;

    //fill that row (From startcol to endCol) with walls
    for (let i = startRow; i <= endRow; i++)
    {
        let node = refGrid[i][wallCol];
        if (!node.state.isStart && !node.state.isEnd && !node.state.isWall)
        {
            node.toggleWall()
        }
    }

    //erase one block on the column/row, only on even row/col, respectively
    let gapRow = Math.floor(Math.random() * ~~((height + 1) / 2)) * 2 + startRow;

    let state = refGrid[gapRow][wallCol].state;
    state.isWall = false;
    refGrid[gapRow][wallCol].setState(state);

    recDiv(refGrid, startRow, endRow, startCol, wallCol-1);
    recDiv(refGrid, startRow, endRow, wallCol+1, endCol);
}
