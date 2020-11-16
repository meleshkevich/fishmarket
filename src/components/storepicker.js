import React from "react";
import PropTypes from 'prop-types';
import {getFunName} from'../helpers';
import '../css/style.css';

class StorePicker extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };
    myImput = React.createRef();

    goToStore = event => {
        // stop form from default submitting
        event.preventDefault();
        // get text from input form
        const storeName = this.myImput.current.value;
        // change page to /store/whatever-was-entered
        this.props.history.push(`/store/${storeName}`);
    };

    render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" 
        ref={this.myImput}
        required placeholder="Store Name" 
        defaultValue={getFunName()} 
        />
        <button type="submit">Visit Store →</button>
      </form>
    );
  }
}

export default StorePicker;