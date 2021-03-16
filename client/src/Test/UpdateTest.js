import React, { Component } from 'react';
import './UpdateTest.scss';
import axios from 'axios';
import Setting from '../Shared/Setting';
import { Container, Row, Col, Button, Label, Input } from 'reactstrap';
import Menu from '../Menu/Menu';
import {    
    Link
} from "react-router-dom";
import { Redirect } from 'react-router';
import Question from './Question';



export default class UpdateTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: '',
            description: '',
            questions: [],
            redirect: false
        };
    }

    addQuestion = (e) => {
        e.preventDefault();


        let questions = this.state.questions;
        questions.push({
            content: "",
            options: []
        });
        this.setState({
            questions: questions
        })
    }

    deleteQuestion = (index) => {
        let questions = this.state.questions;
        questions.splice(index, 1);

        this.setState({
            questions: questions
        })

    }

    questionOnChange = (index, data) => {
        let questions = this.state.questions;
        let question = questions[index];
        question.content = data.content;
        question.options = data.options;

        this.setState({
            questions: questions
        })
    }

    checkValidParams = () => {
        if (this.state.name === '') {
            alert("Test Name can't be empty");
            return false;
        }

        if (this.state.description === '') {
            alert("Test Description can't be empty");
            return false;
        }

        return this.validateQuestions();
    }

    validateQuestions = () => {
        if (this.state.questions.length === 0) {
            alert("Test must have at least 1 Question");
            return false;
        }

        for (var i = 0; i < this.state.questions.length; i++) {
            if (!this.validateQuestion(this.state.questions[i])) {
                return false;
            }
        }

        return true;
    }


    validateQuestion = (question) => {
        console.log("validate question: ", question);
        if (question.content === '') {
            alert("Question Content can't be empty");
            return false;
        }
        else {
            let countOption = 0;
            let countCorrectOption = 0;
            for (var i = 0; i < question.options.length; i++) {
                if (question.options[i].content === '') {
                    alert("Option Content can't be empty");
                    return false;
                }

                countOption += 1;
                if (question.options[i].is_correct) {
                    countCorrectOption += 1;
                }
            }

            if (countOption < 2) {
                alert("Question must have at least 2 options");
                return false;
            }

            if (countCorrectOption < 1) {
                alert("Question must have at least 1 correct option");
                return false;
            }
        }

        return true;
    }

    getParams = () => {
        return {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            questions: this.state.questions
        };
    }

    componentDidMount() {
        if (this.props.location.state && this.props.location.state.id) {
            let url = Setting.resolveAPIURL("/portal/tests");
            let requestUrl = `${url}/${this.props.location.state.id}?token=${this.props.location.state.token}`;
            axios.get(requestUrl)
                .then(res => {
                    console.log(res);
                    this.setState({
                        id: res.data.id,
                        name: res.data.name,
                        description: res.data.description,
                        questions: res.data.questions
                    });
                })
                .catch(() => {
                });
        }
    }

    onChange = (fieldName, fieldValue) => {
        console.log(fieldValue);
        let value = fieldValue.target ? fieldValue.target.value : fieldValue;
        this.setState({
            [fieldName]: value
        });
    }

    save = () => {
        let params = this.getParams();

        if (!this.checkValidParams()) {
            return;
        }

        let url = Setting.resolveAPIURL("/portal/tests");
        params["token"] = this.props.location.state.token;
        axios.post(url, params)
            .then(res => {
                console.log(res);

                if(res.data.success){
                    this.setState({ redirect: true });
                }
                else{
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
                    pathname: "/TestList",
                    state: { token: this.props.location.state.token }
                }} />;
        }

        return (
            <div className="update-test">
                <Menu token={this.props.location.state.token} type="test" />
                <Container className="pb-4">
                    <Link to={{
                        pathname: "/TestList",
                        state: { token: this.props.location.state.token }
                    }}>Back</Link>
                    <a className="pl-3" href="#" onClick={(e) => this.addQuestion(e)}>Add Question</a>
                </Container>

                <Container>

                    <Row>
                        <Col md="2"><Label className="title font-weight-bold">Name</Label></Col>
                        <Col >
                            <Input value={this.state.name} onChange={value => this.onChange('name', value)}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2"><Label className="title font-weight-bold">Description</Label></Col>
                        <Col >
                            <Input value={this.state.description} onChange={value => this.onChange('description', value)}></Input>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="2"><Label className="title"></Label></Col>
                        <Col >
                            {
                                this.state.questions && this.state.questions.length > 0 &&
                                this.state.questions.map((question, index) => {
                                    return <Question key={index} data={question}
                                        index={index} delete={this.deleteQuestion}
                                        change={this.questionOnChange} />
                                })
                            }
                        </Col>
                    </Row>


                    <Row>
                        <Col md="2"></Col>
                        <Col><Button className="font-weight-bold mb-3" onClick={this.save}>Save</Button></Col>
                    </Row>

                </Container>

            </div>
        );
    }
}