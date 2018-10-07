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

const yellowColor = {
    shapeProps: {
        shape: 'circle',
        r: 11,
        fill: 'yellow',
        stroke: 'green',
    }
}

class App extends Component {
    state = {
        input1: '',
        input2: '',
        myTreeData: [{ name: nullNode, nodeSvgShape: blackColor }],
        forceMount: true,
        searchPath: ''
    }

    valueFound = false;

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
        if(this.state.input1 != '') {
            let value = this.state.input1;
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
                // TREE-INSERT procedure
                var rightDirection = true;
                var leftDirection = false;
                var previousNode = null;
                var previousDirection = leftDirection;
                var currentNode = tree[0];
                var prePreviousNode = null;
                var prevPrePreviousNode = null;
                var isValueFound = false;
                while (currentNode.name != nullNode) {
                    prevPrePreviousNode = prePreviousNode;
                    prePreviousNode = previousNode;
                    previousNode = currentNode;
                    if (parseInt(value) > parseInt(currentNode.name)) {
                        currentNode = currentNode.children[1];
                        previousDirection = rightDirection;
                    } 
                    else if (parseInt(value) < parseInt(currentNode.name)) {
                        currentNode = currentNode.children[0];
                        previousDirection = leftDirection;
                    }
                    else {
                        isValueFound = true;
                        break;
                    }
                }
                if(isValueFound == false) {
                    if (previousDirection == leftDirection) {
                        previousNode.children[0] = { name : value, nodeSvgShape: redColor,
                            children: [{ name: nullNode, nodeSvgShape: blackColor }, 
                            { name: nullNode, nodeSvgShape: blackColor }] }
                        currentNode = previousNode.children[0];
                    }
                    else {
                        previousNode.children[1] = { name : value, nodeSvgShape: redColor,
                            children: [{ name: nullNode, nodeSvgShape: blackColor }, 
                            { name: nullNode, nodeSvgShape: blackColor }] }
                        currentNode = previousNode.children[1];
                    }
                    // RB-INSERT-FIXUP procedure
                    console.log('Grandparent node = '+ prePreviousNode);
                    console.log('Parent node = '+ previousNode);
                    console.log('Node = '+ currentNode.name);
                    debugger;
                    while (previousNode.nodeSvgShape == redColor) {
                        if(previousNode.name == prePreviousNode.children[0].name) {
                            var y = prePreviousNode.children[1];
                            if(y.nodeSvgShape == redColor) {
                                previousNode.nodeSvgShape = blackColor;
                                y.nodeSvgShape = blackColor;
                                prePreviousNode.nodeSvgShape = redColor;
                                currentNode = prePreviousNode;
                            }
                            else {
                                if(currentNode.name == previousNode.children[1].name) {
                                    currentNode = previousNode;
                                    debugger;
                                    // LEFT-Rotate(T,currentNode)
                                    var temp = currentNode.children[1];
                                    currentNode.children[1] = temp.children[0];
                                    if(temp.children[0].name != nullNode) {
                                        temp = currentNode;
                                    }
                                    currentNode = previousNode;
                                    if(previousNode.name == nullNode) {
                                        tree[0] = temp;
                                    }
                                    else if(currentNode.name == previousNode.children[0].name) {
                                        previousNode.children[0] = temp;
                                    }
                                    else {
                                        previousNode.children[1] = temp;
                                    }
                                    temp.children[0] = currentNode;
                                    previousNode = temp;
                                    // end of LEFT-Rotate(T,currentNode)
                                }
                                previousNode.nodeSvgShape = blackColor;
                                prePreviousNode.nodeSvgShape = redColor;
                                debugger;
                                // RIGHT-Rotate(T,prePreviousNode)
                                
                                // end of RIGHT-Rotate(T,prePreviousNode)
                            }
                        }
                        else {
                            var y = prePreviousNode.children[0];
                            if(y.nodeSvgShape == redColor) {
                                debugger;
                                previousNode.nodeSvgShape = blackColor;
                                y.nodeSvgShape = blackColor;
                                prePreviousNode.nodeSvgShape = redColor;
                                currentNode = prePreviousNode;
                            }
                            else {
                                if(currentNode.name == previousNode.children[0].name) {
                                    currentNode = previousNode;
                                    debugger;
                                    // RIGHT-Rotate(T,currentNode)
                                    var temp = currentNode.children[0];
                                    currentNode.children[0] = temp.children[1];
                                    if(temp.children[1].name != nullNode) {
                                        temp = currentNode;
                                    }
                                    currentNode = previousNode;
                                    if(previousNode.name == nullNode) {
                                        tree[0] = temp;
                                    }
                                    else if(currentNode.name == previousNode.children[1].name) {
                                        previousNode.children[1]= temp;
                                    }
                                    else {
                                        previousNode.children[0] = temp;
                                    }
                                    temp.children[1] = currentNode;
                                    previousNode = temp;
                                    // end of RIGHT-Rotate(T,currentNode)
                                }
                                previousNode.nodeSvgShape = blackColor;
                                prePreviousNode.nodeSvgShape = redColor;
                                debugger;
                                // LEFT-Rotate(T,prePreviousNode)
                                
                                // end of LEFT-Rotate(T,prePreviousNode)
                            } // end else
                        } // end else
                    } // end while
                    tree[0].nodeSvgShape = blackColor
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

    searchWithTimeOut = (currentNode, value) =>  
    { 
        debugger;
        setTimeout(function() { 

        }, 1000);
        return currentNode;
    }

    sleep = (miliseconds) => {
        var currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) {
        }
    }

    searchNode = () => {
        debugger;
        if(this.state.input2 != '') {
            var value = parseInt(this.state.input2, 10);
            var tmp = this.state.myTreeData;
            var currentNode = tmp[0];
            var route = '';
            var isFound = false;
            while(currentNode.name != nullNode) 
            {
                route += currentNode.name + ', ';
                console.log(currentNode.name);
                currentNode.nodeSvgShape = yellowColor;
                this.setState({
                    myTreeData: tmp,
                    forceMount: !this.state.forceMount,
                });
                if(parseInt(currentNode.name) == value) {
                    isFound = true;
                    // alert('Value Found!');
                } 
                else if (parseInt(currentNode.name) > value) {
                    currentNode = currentNode.children[0];
                } 
                else {
                    currentNode = currentNode.children[1];
                } 
                if(isFound == true)
                    break;
            }
            if(isFound == false) {
                alert('Value not found!');
            }
            if(route[route.length - 2] == ',') {
                route = route.substring(0, route.length - 2);
            }
            this.setState({
                input2: '',
                searchPath: route
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
            <div style={{marginTop:-15, height:61, backgroundColor: "#006633"}}>
              <h1 style={{paddingLeft: 10, paddingTop:10 , marginTop:15, color: "#ffCC33"}}> Red-Black Tree Visualization </h1>
            </div>
            <br/>
            <input style={{marginLeft: 15}} type ="text" placeholder="Enter a value to be added" value= {this.state.input1} onChange= {this.handleInputChange('input1')}/>
            <button onClick={ ()=> this.insertNode()}> Insert </button>
            
            <input style={{marginLeft: 31}} type="text" placeholder="Enter a value to search for" value= {this.state.input2} onChange= {this.handleInputChange('input2')}/>
            <button onClick={ ()=> this.searchNode()}> Search </button>
            <br/>
            {
              this.state.searchPath != '' &&
                <div>
                <br/>
                <label style={{marginLeft: 20}}> Search path is: {this.state.searchPath}</label>
                </div>
            }
            <Tree 
            data ={this.state.myTreeData} 
            orientation ={"vertical"} 
            translate={this.state.translate}
            collapsible={false}
            depthFactor={60}
            key={this.state.forceMount}
            />
            </div>
        );
    }
}

export default App;