export function bfs(grid, startNode, endNode)
{
    //create a queue to hold visited nodes
    let queue = [];
    let visited = [];

    //add the start node to teh queue
    queue.push(startNode);
    var curr = null;

    //iterate through the dfs loop until we find end node or queue is empty
    while (queue.length > 0 )
    {
        let temp = queue.shift();

        if (temp.isVisited === true)
        {
            continue;
        }
            

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
            queue.push(grid[curr.row-1][curr.col]);
        }

        if (curr.col > 0 && isOpenNode(grid[curr.row][curr.col-1]))
        {
            grid[curr.row][curr.col-1].prevNode = curr;
            queue.push(grid[curr.row][curr.col-1]);
        }
            
        if (curr.row < grid.length-1 && isOpenNode(grid[curr.row+1][curr.col]))
        {
            grid[curr.row+1][curr.col].prevNode = curr;
            queue.push(grid[curr.row+1][curr.col]);
        }
        if (curr.col < grid[0].length-1 && isOpenNode(grid[curr.row][curr.col+1]))
        {
            grid[curr.row][curr.col+1].prevNode = curr;
            queue.push(grid[curr.row][curr.col+1]);
        }
            
    }

    return visited;
}

function isOpenNode(node)
{
    //check that the row/col is in bounds
    return !node.isVisited && !node.isWall;
}