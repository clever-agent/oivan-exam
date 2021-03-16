import React, { Component } from 'react';
import './Login.scss';
import axios from 'axios';
import Setting from '../Shared/Setting';

import { Container, Row, Col, Button, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            token: null,
            user_id: null
        }
    }

    componentDidMount() {
    }

    login = () => {
        let params = this.getParams();
        if (this.checkValidParams()) {
            let url = Setting.resolveAPIURL("/auth/login");
            axios.post(url, params)
                .then(res => {
                    if (res.data.token == null) {
                        alert("Wrong username or password");
                    }
                    else {
                        this.setState({
                            token: res.data.token,
                            user_id: res.data.user_id
                        });
                    }
                })
                .catch(() => {
                });
        }
    }

    onChange = (fieldName, fieldValue) => {
        let value = fieldValue.target ? fieldValue.target.value : fieldValue;
        this.setState({
            [fieldName]: value
        });
    }

    checkValidParams = () => {
        if (this.state.email === '') {
            alert("Email can't be empty");
            return false;
        }
        else if (this.state.password === '') {
            alert("Password can't be empty");
            return false;
        }

        return true;
    }

    getParams = () => {
        return {
            email: this.state.email,
            password: this.state.password
        };
    }

    render() {
        if (this.state.token !== null) {
            return <Redirect push
                to={{
                    pathname: "/UserList",
                    state: { token: this.state.token, user_id: this.state.user_id }
                }} />;
        }


        return (
            <div className="login">
                <Container>
                    <Row>
                        <Col md="2"></Col>
                        <Col className="header">
                            Administrator Login
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2"><Label className="title font-weight-bold">Email</Label></Col>
                        <Col md="4">
                            <Input onChange={value => this.onChange('email', value)}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2"><Label className="title font-weight-bold">Password</Label></Col>
                        <Col md="4">
                            <Input onChange={value => this.onChange('password', value)} type="password"></Input>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="2"></Col>
                        <Col><Button className="font-weight-bold" onClick={this.login}>Login</Button></Col>
                    </Row>

                </Container>
            </div>
        );
    }
}