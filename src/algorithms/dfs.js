export function dfs(grid, startNode, endNode)
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
        visited.push(curr);
        if (curr === endNode)
        {
            break;
        }
        
        if (curr.row > 0 && isOpenNode(grid[curr.row-1][curr.col]))
        {
            grid[curr.row-1][curr.col].prevNode = curr
            stack.push(grid[curr.row-1][curr.col]);
        }

        if (curr.col > 0 && isOpenNode(grid[curr.row][curr.col-1]))
        {
            grid[curr.row][curr.col-1].prevNode = curr;
            stack.push(grid[curr.row][curr.col-1]);
        }
            
        if (curr.row < grid.length-1 && isOpenNode(grid[curr.row+1][curr.col]))
        {
            grid[curr.row+1][curr.col].prevNode = curr;
            stack.push(grid[curr.row+1][curr.col]);
        }
        if (curr.col < grid[0].length-1 && isOpenNode(grid[curr.row][curr.col+1]))
        {
            grid[curr.row][curr.col+1].prevNode = curr;
            stack.push(grid[curr.row][curr.col+1]);
        }
    }

    return visited;
}

function isOpenNode(node)
{
    //check that the row/col is in bounds
    return !node.isVisited && !node.isWall;
}