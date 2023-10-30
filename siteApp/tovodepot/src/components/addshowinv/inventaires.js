import React, { Component } from 'react';
import List from './listsearch/list';
import "./inventaires.css"

class Inventaires extends Component {

    render() {
        return (
            <div className="inventaire">
                <List
                    updatestate={this.props.updatestate}
                    isupdate={this.props.isupdate}
                />
            </div>
        );
    }
}

export default Inventaires;