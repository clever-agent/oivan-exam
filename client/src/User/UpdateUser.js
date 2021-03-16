import React, { Component } from 'react';
import './UpdateUser.scss';
import axios from 'axios';
import Setting from '../Shared/Setting';
import { Container, Row, Col, Button, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router';
import {
    Link
} from "react-router-dom";
import Menu from '../Menu/Menu';



export default class UpdateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: '',
            email: '',
            password: '',
            confirm_password: '',
            role: 'teacher',
            redirect: false
        };

    }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    checkValidParams = () => {
        if (this.state.name === '') {
            alert("Name can't be empty");
            return false;
        }
        else if (this.state.email === '') {
            alert("Email can't be empty");
            return false;
        }
        else if (!this.validateEmail(this.state.email)) {
            alert("Email is wrong format");
            return false;
        }
        else if (this.state.password === '') {
            alert("Password can't be empty");
            return false;
        }
        else if (this.state.confirm_password === '') {
            alert("Confirm Password can't be empty");
            return false;
        }
        else if (this.state.password !== this.state.confirm_password) {
            alert("Confirm Password must be the same as Password");
            return false;
        }

        return true;
    }

    getParams = () => {
        return {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        };
    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.id) {
            let url = Setting.resolveAPIURL("/portal/users");
            let requestUrl = `${url}/${this.props.location.state.id}?token=${this.props.location.state.token}`;
            axios.get(requestUrl)
                .then(res => {
                    this.setState({
                        id: res.data.id,
                        name: res.data.name,
                        email: res.data.email,
                        role: res.data.role
                    });
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

    saveUser = () => {
        let params = this.getParams();


        if (!this.checkValidParams()) {
            return;
        }

        let url = Setting.resolveAPIURL("/portal/users");
        params["token"] = this.props.location.state.token;
        axios.post(url, params)
            .then(res => {
                if (res.data.success) {
                    this.setState({ redirect: true });
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

        if (this.state.redirect) {
            return <Redirect push
                to={{
                    pathname: "/UserList",
                    state: { token: this.props.location.state.token }
                }} />;
        }

        return (
            <div className="update-user">
                <Menu token={this.props.location.state.token} type="user" />
                <Container>
                    <div className="list-title pb-4">
                        <Link to={{
                            pathname: "/UserList",
                            state: { token: this.props.location.state.token }
                        }}>Back</Link>
                    </div>
                </Container>
                <Container>
                    <Row>
                        <Col md="3"><Label className="title font-weight-bold">Name</Label></Col>
                        <Col md="6">
                            <Input value={this.state.name} onChange={value => this.onChange('name', value)}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3"><Label className="title font-weight-bold">Email</Label></Col>
                        <Col md="6">
                            <Input value={this.state.email} onChange={value => this.onChange('email', value)}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3"><Label className="title font-weight-bold">Password</Label></Col>
                        <Col md="6">
                            <Input type="password" value={this.state.password} onChange={value => this.onChange('password', value)}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3"><Label className="title font-weight-bold">Confirm Password</Label></Col>
                        <Col md="6">
                            <Input type="password" value={this.state.confirm_password} onChange={value => this.onChange('confirm_password', value)}></Input>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3"><Label className="title font-weight-bold">Role</Label></Col>
                        <Col md="6">
                            <Input type="select" value={this.state.role} onChange={value => this.onChange('role', value)} >
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </Input>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="3"></Col>
                        <Col md="6"><Button className="font-weight-bold mt-3" onClick={this.saveUser}>Save</Button></Col>
                    </Row>

                </Container>
            </div>
        );
    }
}