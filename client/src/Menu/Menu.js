import React, { Component } from 'react';
import './Menu.scss';
import { Container } from 'reactstrap';
import {    
    Link
} from "react-router-dom";

export default class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
    }

    getActiveClass = (type) => {
        return type === this.props.type ? " active " : "";
    }

    render() {

        return (
            <div className="menu">
                <Container>
                    <Link className={"pr-2" + this.getActiveClass("user")} to={{
                        pathname: "/UserList",
                        state: { token: this.props.token }
                    }}>Users</Link>
                    <Link className={"pr-2" + this.getActiveClass("test")} to={{
                        pathname: "/TestList",
                        state: { token: this.props.token }
                    }}>Test</Link>
                    <Link to={{
                        pathname: "/",
                        state: { token: this.props.token }
                    }}>Logout</Link>

                </Container>
            </div>
        );
    }
}