import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = {};
    }

    render() 
    {
        console.log("node render")
        const {row, col, isStart, isEnd, isWall, onClick} = this.props;
        let extraClassName = '';
        if (isStart)
        {
            extraClassName = "startNode";
        }
        else if (isEnd)
        {
            extraClassName = "endNode";
        }
        else if (isWall)
        {
            extraClassName = "wallNode"
        }
        return (
            <div 
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onClick={() => onClick(row, col)}></div>
        )
    }
}