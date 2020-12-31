import React, {Component} from 'react';
import Node from './Node/Node'
import {bfs} from '../algorithms/bfs';
import {dfs} from '../algorithms/dfs';
import './PathfindingViz.css';

const NUM_ROWS = 15;
const NUM_COLS = 50;
const ANIMATE_TIME_MS = 10;

export default class PathfindingViz extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      nodes: [],
      start: null,
      end: null,
    }
    this.refGrid = [];
  }

  updateWall(row, col)
  {
    const node = this.refGrid[row][col];
    node.toggleWall();
  }

  visualizeDFS() 
  {
    const {nodes, start, end} = this.state;

    const visited = dfs(nodes, this.refGrid, start, end);
    let shortestPath = this.getPath(start,end)
    animatePath(visited, shortestPath);
  }

  visualizeBFS() 
  {
    const {nodes, start, end} = this.state;

    const visited = bfs(nodes, this.refGrid, start, end);
    let shortestPath = this.getPath(start, end);
    animatePath(visited, shortestPath);
  }
  
  getPath(start, end)
  {
    let shortestPath = [];
    let curr = end;
    
    while (curr !== null && curr != start)
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
      const node = nodeOrder[i].state;
      node.isVisited = true;
      nodeOrder[i].setState(node);
    }, ANIMATE_TIME_MS * i)
  }

  //set the animation for the shortest path 
  //schedule its animations for only after nodeOrder is done
  for (let j = 0; j < shortestPath.length; j++)
  {
    setTimeout(() => {
      const node = shortestPath[j].state;
      node.isShortestPath = true;
      shortestPath[j].setState(node);
    }, ANIMATE_TIME_MS * (j + nodeOrder.length))
  }
}
