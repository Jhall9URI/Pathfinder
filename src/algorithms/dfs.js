export function dfs(grid, refGrid, startNode, endNode)
{
    //create a stack to hold visited nodes
    let stack = [];
    let visited = [];

    //add the start node to teh stack
    stack.push(startNode);
    var curr = null;

    //iterate through the dfs loop until we find end node or stack is empty
    while (stack.length > 0 )
    {
        let temp = stack.pop();
        temp.isVisited = true;
        curr = temp;
        
        let row = curr.row;
        let col = curr.col;
        visited.push(refGrid[row][col])

        if (curr === endNode)
        {
            break;
        }
        
        if (curr.row > 0 && isOpenNode(row-1, col, grid, refGrid))
        {
            grid[curr.row-1][curr.col].prevNode = curr;
            stack.push(grid[curr.row-1][curr.col]);
        }

        if (curr.col > 0 && isOpenNode(row, col-1, grid, refGrid))
        {
            grid[curr.row][curr.col-1].prevNode = curr;
            stack.push(grid[curr.row][curr.col-1]);
        }
            
        if (curr.row < grid.length-1 && isOpenNode(row+1, col, grid, refGrid))
        {
            grid[curr.row+1][curr.col].prevNode = curr;
            stack.push(grid[curr.row+1][curr.col]);
        }
        if (curr.col < grid[0].length-1 && isOpenNode(row, col+1, grid, refGrid))
        {
            grid[curr.row][curr.col+1].prevNode = curr;
            stack.push(grid[curr.row][curr.col+1]);
        }
    }

    return visited;
}

function isOpenNode(row, col, grid, refGrid)
{
    //check that the row/col is in bounds
    return !grid[row][col].isVisited && !refGrid[row][col].state.isWall;
}