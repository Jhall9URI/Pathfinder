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

    createWall()
    {
        this.setState(function(state, props)  {
            return {isWall: !state.isStart && !state.isEnd}
        })
    }

    toggleWall()
    {
        this.setState(function(state, props) {
            return {isWall: !state.isStart && !state.isEnd && !state.isWall}
        })
    }
    
    //removes any of the states form 
    resetNode()
    {
        this.setState({isShortestPath: false, isVisited: false});
    }

    clearWall()
    {
        this.setState({isWall: false})
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