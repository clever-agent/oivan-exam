import React, { Component } from 'react';
import './UserList.scss';
import axios from 'axios';
import Setting from '../Shared/Setting';
import { Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router';
import {
    Link
} from "react-router-dom";
import Menu from '../Menu/Menu';


export default class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }



    componentDidMount() {
        if (this.props.location.state && this.props.location.state.token) {
            this.getUsers();
        }
    }

    getUsers = () => {
        let url = Setting.resolveAPIURL("/portal/users");
        axios.get(url, { headers: { Authorization: `Bearer ${this.props.location.state.token}` } })
            .then(res => {
                this.setState({ users: res.data });
            })
            .catch(() => {
            });
    }

    deleteUser = (e, id) => {
        e.preventDefault();

        let url = Setting.resolveAPIURL("/portal/users");
        let requestUrl = `${url}/${id}`;
        axios.delete(requestUrl, { headers: { Authorization: `Bearer ${this.props.location.state.token}` } })
            .then(res => {
                if (res.data.success) {
                    alert("Success");
                    this.getUsers();
                }
                else {
                    alert(res.data.message);
                }
            })
            .catch(() => {

            });
    }

    render() {
        if (!(this.props.location.state && this.props.location.state.token)) {
            return <Redirect push
                to={{
                    pathname: "/"
                }} />;
        }

        return (
            <div className="user-list">
                <Menu token={this.props.location.state.token} type="user" />
                <Container>
                    <div className="pb-2 add-user">
                        <Link to={{
                            pathname: "/UpdateUser",
                            state: { token: this.props.location.state.token }
                        }}>Add User</Link>
                    </div>
                </Container>
                {
                    <div className="list-content">
                        <Container>
                            <Row className="font-weight-bold table-header">
                                <Col>Name</Col>
                                <Col>Email</Col>
                                <Col>Role</Col>
                                <Col>Actions</Col>
                            </Row>
                            {this.state.users &&
                                this.state.users.map((user, index) => {
                                    return <Row key={index} className="table-row">
                                        <Col xs="3" className="ellipsis-overflow-text">{user.name}</Col>
                                        <Col xs="3" className="ellipsis-overflow-text">{user.email}</Col>
                                        <Col xs="3">{user.role}</Col>

                                        <Col xs="3">
                                            {
                                                this.props.location.state.user_id !== user.id &&
                                                <div>
                                                    <Link className="pr-2"
                                                        to={{
                                                            pathname: "/UpdateUser",
                                                            state: { id: user.id, token: this.props.location.state.token }
                                                        }}>Edit</Link>
                                                    <a className="delete-link" href="/#" onClick={(e) => this.deleteUser(e, user.id)}>Delete</a>
                                                </div>

                                            }

                                        </Col>
                                    </Row>
                                })
                            }
                        </Container>

                    </div>
                }
            </div>
        );
    }
}