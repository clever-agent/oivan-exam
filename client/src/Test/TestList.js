import React, { Component } from 'react';
import './TestList.scss';
import axios from 'axios';
import Setting from '../Shared/Setting';
import { Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router';
import {
    Link
} from "react-router-dom";
import Menu from '../Menu/Menu';


export default class TestList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tests: []
        }
    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.token) {
            this.getTests();
        }
    }

    getTests = () => {
        let url = Setting.resolveAPIURL("/portal/tests");
        axios.get(url, { headers: { Authorization: `Bearer ${this.props.location.state.token}` } })
            .then(res => {
                this.setState({ tests: res.data });
            })
            .catch(() => {
            });
    }

    delete = (e, id) => {
        e.preventDefault();

        let url = Setting.resolveAPIURL("/portal/tests");
        let requestUrl = `${url}/${id}`;
        axios.delete(requestUrl, { headers: { Authorization: `Bearer ${this.props.location.state.token}` } })
            .then(res => {
                if (res.data.success) {
                    alert("Success");
                    this.getTests();
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
            <div className="test-list">
                <Menu token={this.props.location.state.token} type="test" />
                <Container>
                    <div className="pb-2">
                        <Link to={{
                            pathname: "/UpdateTest",
                            state: { token: this.props.location.state.token }
                        }}>Add Test</Link>
                    </div>
                </Container>
                {
                    <div className="list-content">
                        <Container>
                            <Row className="font-weight-bold table-header">
                                <Col xs="3">Name</Col>
                                <Col xs="3">Description</Col>
                                <Col xs="3">#Questions</Col>
                                <Col xs="3">Actions</Col>
                            </Row>
                            {this.state.tests &&
                                this.state.tests.map((test, index) => {
                                    return <Row key={index} className="table-row">
                                        <Col xs="3" className="ellipsis-overflow-text">{test.name}</Col>
                                        <Col xs="3" className="ellipsis-overflow-text">{test.description}</Col>
                                        <Col xs="3">{test.question_count}</Col>

                                        <Col xs="3">
                                            <Link className="pr-2"
                                                to={{
                                                    pathname: "/UpdateTest",
                                                    state: { id: test.id, token: this.props.location.state.token }
                                                }}>Edit</Link>
                                            <a className="delete-link" href="/#" onClick={(e) => this.delete(e, test.id)}>Delete</a>
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