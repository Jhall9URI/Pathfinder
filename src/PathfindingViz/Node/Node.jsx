import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            isStart: props.isStart,
            isEnd: props.isEnd,
            isWall: props.isWall,
            isVisited: false,
            isShortestPath: false,
        };
    }

    toggleWall()
    {
        let newState = this.state;
        newState.isWall = !(this.state.isWall)
        this.setState(newState);
    }
    
    //removes any of the states form 
    resetNode()
    {
        let node = this.state;
        node.isShortestPath = false;
        node.isVisited = false;
        this.setState(node);
    }

    clearWall()
    {
        let node = this.state;
        if (node.isWall)
        {
            node.isWall = false;
            this.setState(node);
        }
    }

    render() 
    {
        const {row, col, onClick} = this.props;
        let extraClassName = '';
        if (this.state.isStart)
        {
            extraClassName = "startNode";
        }
        else if (this.state.isEnd)
        {
            extraClassName = "endNode";
        }
        else if (this.state.isWall)
        {
            extraClassName = "wallNode"
        }
        else if (this.state.isShortestPath)
        {
            extraClassName = "node-shortest-path"
        }
        else if (this.state.isVisited)
        {
            extraClassName = "node-visited"
        }
        return (
            <div 
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onClick={() => onClick(row, col)}></div>
        )
    }
}