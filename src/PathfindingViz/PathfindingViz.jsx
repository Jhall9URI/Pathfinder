import React, {Component} from 'react';
import Node from './Node/Node'
import {bfs} from '../algorithms/bfs';
import {dfs} from '../algorithms/dfs';
import {recDiv} from '../algorithms/recursiveDivision';
import './PathfindingViz.css';

const NUM_ROWS = 15;
const NUM_COLS = 50;
const ANIMATE_TIME_MS = 30;

export default class PathfindingViz extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      status: "ready",
      nodes: [],
      start: null,
      end: null,
    }

    //might be able to include this in state?
    this.refGrid = [];
  }

  updateWall(row, col)
  {
    //note that this might not always work due to 
    //setState() being asynchronous
    if (this.state.status !== "running")
    {
      this.refGrid[row][col].toggleWall();
    }
  }

  visualize(algo)
  {
    this.resetGraph();

    const {nodes, start, end} = this.state;
    let visited;
    if (algo === "bfs")
      visited = bfs(nodes, this.refGrid, start, end);
    else if (algo === "dfs")
      visited = dfs(nodes, this.refGrid, start, end);

    let shortestPath = this.getPath(start, end)
    this.setState({status: "running"});

    animatePath(visited, shortestPath);

    setTimeout(() => {
      this.setState({status: "ready"});
    }, ANIMATE_TIME_MS * (visited.length + shortestPath.length + 2));
  }
  
  getPath(start, end)
  {
    let shortestPath = [];
    let curr = end;
    while (curr !== null && curr !== start)
    {
      shortestPath.unshift(this.refGrid[curr.row][curr.col]);
      curr = curr.prevNode;
    }

    return shortestPath
  }

  componentDidMount()
  {
    const nodes  = [];
    for (let row = 0; row < NUM_ROWS; row++)
    {
      const currRow = [];
      const refRow = [];
      for (let col = 0; col < NUM_COLS; col++)
      {
        const nodeInfo = createNode(row, col);
        currRow.push(nodeInfo);
        refRow.push(null);
      }
      nodes.push(currRow);
      this.refGrid.push(refRow);

    }
    let {start, end} = setStartEnd(nodes);
    this.setState({nodes, start, end});
  }

  resetGraph()
  {
    let {nodes} = this.state;
    for (let i = 0; i < nodes.length; i++)
    {
      for(let j = 0; j < nodes[i].length; j++)
      {
        nodes[i][j].isVisited = false;
        nodes[i][j].prevNode = null;
        this.refGrid[i][j].resetNode();
      }
    }
    this.setState({nodes, status: "ready"});
  }

  createMaze()
  {
    //clear all walls before creating maze
    this.clearWalls();
    this.resetGraph();
    this.setState({status: "ready"});

    //create recursive divison function for grid
    recDiv(this.refGrid, 0, this.refGrid.length-1, 0, this.refGrid[0].length-1);

    if (this.state.start.row % 2 === 1 && this.state.start.col % 2 === 1)
    {
      let aboveNode = this.refGrid[this.state.start.row-1][this.state.start.col];
      aboveNode.clearWall();
    }

    if (this.state.end.row % 2 === 1 && this.state.end.col % 2 === 1)
    {
      let aboveNode = this.refGrid[this.state.end.row-1][this.state.end.col];
      aboveNode.clearWall();
    }
  }

  clearWalls()
  {
    for (let i = 0; i < this.refGrid.length; i++)
    {
      for (let j = 0; j < this.refGrid[i].length; j++)
      {
        this.refGrid[i][j].clearWall();
      }
    }
  }

  render() 
  {
    const {nodes} = this.state;
    return (
      <>
        <button disabled={this.state.status==="running"} onClick={() => this.createMaze()}>
          Create Maze
        </button>
        <button disabled={this.state.status==="running"} onClick={() => this.clearWalls()}>
          Clear All Walls
        </button>
        <button disabled={this.state.status==="running"} onClick={() => this.resetGraph()}>
          Reset Graph
        </button>
        <button disabled={this.state.status==="running"} onClick={() => this.visualize("bfs")}>
          Visualize BFS
        </button>
        <button disabled={this.state.status==="running"} onClick={() => this.visualize("dfs")}>
          Visualize DFS
        </button>
        <div className='grid'>
          {nodes.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isStart, isEnd, isWall} = node;
                  return (
                    <Node
                      ref={(ref) => this.refGrid[rowIdx][nodeIdx] = ref}
                      key={nodeIdx}
                      row={row}
                      col={col}
                      isWall={isWall}
                      isStart={isStart}
                      isEnd={isEnd}
                      onClick={(row,col) => this.updateWall(row, col)}></Node>
                  );
                })}
              </div>   
            );
          })}
        </div>
      </>
    );
  }
}

function createNode(row, col) 
{
  return {
    row, 
    col, 
    isStart: false,
    isEnd: false,
    distance: Infinity,
    isVisited: false,
    prevNode: null,
    isWall: false,
  }
}

function setStartEnd(grid)
{
  let startRow, endRow, startCol, endCol;
  do
  {
    startRow = Math.floor(Math.random() * NUM_ROWS);
    endRow = Math.floor(Math.random() * NUM_ROWS);
    startCol = Math.floor(Math.random() * NUM_COLS);
    endCol = Math.floor(Math.random() * NUM_COLS);
  } while (startRow === endRow && startCol === endCol);

  let start = grid[startRow][startCol];
  let end = grid[endRow][endCol];

  start.isStart = true;
  end.isEnd = true;

  return {start, end};
}

function animatePath(nodeOrder, shortestPath)
{

  //schedule the animation for the node order
  for (let i = 0; i < nodeOrder.length; i++)
  {
    setTimeout(() => {
      nodeOrder[i].setState({isVisited: true});
    }, ANIMATE_TIME_MS * i)
  }

  //set the animation for the shortest path 
  //schedule its animations for only after nodeOrder is done
  for (let j = 0; j < shortestPath.length; j++)
  {
    setTimeout(() => {
      shortestPath[j].setState({isShortestPath: true});
    }, ANIMATE_TIME_MS * (j + nodeOrder.length))
  }
}
