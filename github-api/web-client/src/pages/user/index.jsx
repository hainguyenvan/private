import React from 'react';
import {Link} from 'react-router-dom';

export default class Users extends React.Component {

    render() {
        return(
            <div>
                <h1>List User</h1>
                <Link to="/users/profile">User detail</Link>
            </div>
        )
    }
}