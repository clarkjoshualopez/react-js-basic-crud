import React, { Component } from 'react';

class Error extends Component {
    render() {
        return (
            <div className="ui icon negative message">
                <i className="exclamation icon"></i>
                <div className="content">
                    <div className="header">
                        Sorry there's an error in fetching the data
                    </div>
                    <p>Please report it to the admin.</p>
                </div>
            </div>
        );
    }
}

export default Error;