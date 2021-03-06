
import React from "react";
import PropTypes from 'prop-types';
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object.isRequired
  };

  // keep state with firebase DB
  componentDidMount() {
    const {params} = this.props.match;
    // reinstate localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context:  this,
      state: 'fishes' 
    });
  }

  //keep orders with localStorage
  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify( this.state.order));
     
  };

  componentWillUnmount() {
    base.removeBinding(this.ref);
  };

  addFish = fish => {
     // take copy of existing state
     const fishes = {...this.state.fishes};

     // adding new fish to a fish variable
     fishes[`fish_${Date.now()}`] = fish;

     // set new fishes obj into state
     this.setState({ fishes: fishes });
  };

  updateFish = (key, updateFish) => {
    // take copy of current state
    const fishes = {...this.state.fishes};
    
    // update that state
    fishes[key]=updateFish;

    // set updated fish into state
    this.setState({fishes: fishes});  

  }

  deleteFish = (key) => {
    // take copy of state
    const fishes = {...this.state.fishes};

    // update the state = remove item from state
    fishes[key] = null; //cause need to delete from firebase too

    // update state
    this.setState({fishes:fishes});

  }

  loadSampleFishes = () => {
     this.setState({fishes: sampleFishes});
  };

  addToOrder = (key) => {
    //take copy of state
      const order = {...this.state.order};

    //add to order or update number in the order
      order[key] = order[key] + 1 || 1;

    // call setState to update state obj
    this.setState({ order: order});
  };  

  removeFromOrder = (key) => {
     //take copy of state
     const order = {...this.state.order};

     //remove item from state
     delete order[key];
 
     // call setState to update state obj
     this.setState({ order: order});
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline='Fresh Seafood Market'/>
            <ul className='fishes'>
              {Object.keys(this.state.fishes).map(key =>(
              <Fish 
              key={key}
              index={key} 
              details={this.state.fishes[key]}
              addToOrder={this.addToOrder} 
              /> ))}
            </ul>
        </div>
        <Order 
        fishes={this.state.fishes}
        order={this.state.order}    
        removeFromOrder={this.removeFromOrder}   

        />
        <Inventory 
        addFish={this.addFish}
        updateFish={this.updateFish}
        deleteFish={this.deleteFish}
        loadSampleFishes={this.loadSampleFishes}
        fishes = {this.state.fishes}
        storeId = {this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;