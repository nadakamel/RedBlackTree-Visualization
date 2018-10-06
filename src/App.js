import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tree from 'react-d3-tree';

const containerStyles = {
    width: '100%',
    height: '100vh',
}

const nullNode = 'NIL'

const redColor = {
    shapeProps: {
        shape: 'circle',
        r: 11,
        fill: 'red',
        stroke: 'white',
    }
}

const blackColor = {
    shapeProps: {
        shape: 'circle',
        r: 11,
        fill: 'black',
        stroke: 'white',
    }
}

class App extends Component {
    state = {
        input1: '',
        input2: '',
        myTreeData: [{ name: nullNode, nodeSvgShape: blackColor }],
        forceMount: true
    }

    componentDidMount() {
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
            translate: {
                x: dimensions.width / 2,
                y: dimensions.height / 7
            }
        });
    }

    insertNode = () => {
        if(this.state.input1 !== '') {
            var value = this.state.input1;
            console.log('Value entered = ' + value);
            let tree = this.state.myTreeData;
            // Root is null then node will be added to the tree and made root
            if(tree[0].name == nullNode) {
                tree = [{
                    name: value,
                    nodeSvgShape: blackColor,
                    children: [{ name: nullNode, nodeSvgShape: blackColor }, { name: nullNode, nodeSvgShape: blackColor }]
                }]
            } 
            // else find the correct position in the tree and add the node
            else {
                var rightDirection = true;
                var leftDirection = false;
                var previousNode = tree[0];
                var previousDirection = leftDirection; // arbitrary
                var currentNode = tree[0];
                while (currentNode.name != nullNode) {
                    previousNode = currentNode;
                    if (parseInt(value) > parseInt(currentNode.name)) {
                        debugger;
                        currentNode = currentNode.children[1];
                        previousDirection = rightDirection;
                    } 
                    else if (parseInt(value) < parseInt(currentNode.name)) {
                        debugger;
                        currentNode = currentNode.children[0];
                        previousDirection = leftDirection;
                    }
                }
                if (previousDirection == leftDirection) {
                    debugger;
                    previousNode.children[0] = { name : value, nodeSvgShape: redColor,
                        children: [{ name: nullNode, nodeSvgShape: blackColor }, 
                        { name: nullNode, nodeSvgShape: blackColor }] }
                } 
                else {
                    debugger;
                    previousNode.children[1] = { name : value, nodeSvgShape: redColor,
                        children: [{ name: nullNode, nodeSvgShape: blackColor }, 
                        { name: nullNode, nodeSvgShape: blackColor }] }
                }
            }
            this.myTreeData = tree
            this.setState({
                input1: '',
                myTreeData: tree,
                forceMount: !this.state.forceMount  
            });
        }
    }

    searchNode = () => {
        debugger;
        if(this.state.input2 !== '') {
            var value = parseInt(this.state.input2, 10);
            alert('Value entered = ' + value);
            this.setState({
                input2: ''
            });
        }
    }

    handleInputChange = name => event => {
        this.setState({
            [name] : event.target.value
        });
    }

    render() {
        return (
        <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
            <input type ="text" placeholder="Enter a value to be added" value= {this.state.input1} onChange= {this.handleInputChange('input1')}/>
            <button onClick={ ()=> this.insertNode()}> Insert </button>
            <br/>
            <input type="text" placeholder="Enter a value to search for" value= {this.state.input2} onChange= {this.handleInputChange('input2')}/>
            <button onClick={ ()=> this.searchNode()}> Search </button>
            <Tree 
            data ={this.state.myTreeData} 
            orientation ={"vertical"} 
            translate={this.state.translate}
            collapsible={false}
            depthFactor={51}
            key={this.state.forceMount}
            />
            </div>
        );
    }
}

export default App;