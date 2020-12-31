import React, {Component} from 'react';
import Node from './Node/Node'
import {bfs} from '../algorithms/bfs';
import {dfs} from '../algorithms/dfs';
import './PathfindingViz.css';

const NUM_ROWS = 15;
const NUM_COLS = 50;

export default class PathfindingViz extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      nodes: [],
      start: null,
      end: null,
    };
  }

  updateWall(row, col)
  {
    const node = this.state.nodes[row][col];
    console.log(`clicked on node ${row} ${col}`);
    node.isWall=true;
    this.setState(this.state.nodes);
  }

  visualizeDFS() 
  {
    const {nodes, start, end} = this.state;

    const visited = dfs(nodes, start, end);
    let shortestPath = getShortestPath(start,end)
    animatePath(visited, shortestPath);
  }

  visualizeBFS() 
  {
    const {nodes, start, end} = this.state;

    const visited = bfs(nodes, start, end);
    let shortestPath = getShortestPath(start, end);
    animatePath(visited, shortestPath);
  }

  componentDidMount()
  {
    const nodes  = [];
    for (let row = 0; row < NUM_ROWS; row++)
    {
      const currRow = []
      for (let col = 0; col < NUM_COLS; col++)
      {
        const nodeInfo = createNode(row, col);
        currRow.push(nodeInfo);
      }
      nodes.push(currRow);
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
        nodes[i][j].isvisited = false;
      }
    }

    this.setState(nodes)
  }

  render() 
  {
    const {nodes} = this.state;
    return (
      <>
        <button onClick={() => this.resetGraph()}>
          Reset Graph
        </button>
        <button onClick={() => this.visualizeBFS()}>
          Visualize BFS
        </button>
        <button onClick={() => this.visualizeDFS()}>
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
  for (let i = 1; i <= nodeOrder.length; i++)
  {
    if (i === nodeOrder.length)
    {
      //we are done with teh first node order, now animate the shortest path (if any);
      setTimeout(() => {
        for (let j = 0; j < shortestPath.length; j++)
        {
          setTimeout(() => {
            const node  = shortestPath[j];
            document.getElementById(`node-${node.row}-${node.col}`).className = `node node-shortest-path`;
          }, 40*j)
        }
      }, 40*i)
    }
    else
    {
      setTimeout(() => {
        const node = nodeOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className = `node node-visited`;
      }, 40 * i)
    }
  }
}

function getShortestPath(start, end)
{
  let shortestPath = [];
  let curr = end;
  
  while (curr !== null)
  {
    shortestPath.unshift(curr);
    curr = curr.prevNode;
  }

  console.log(shortestPath)
  return shortestPath
}