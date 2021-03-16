import React, { Component } from 'react';
import './Question.scss';
import { Container, Row, Col, Label, Input } from 'reactstrap';
import Option from './Option';

export default class Question extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: '',
            options: []
        }
    }

    componentDidMount() {
    }

    onChange = (fieldName, fieldValue) => {
        let value = fieldValue.target ? fieldValue.target.value : fieldValue;
        this.props.change(this.props.index, { content: value, options: this.state.options });
    }

    delete = (e, index) => {
        e.preventDefault();

        this.props.delete(index);
    }

    addOption = (e) => {
        e.preventDefault();


        let options = this.props.data.options;
        options.push({
            content: "",
            is_correct: false
        });

        this.props.change(this.props.index, { content: this.props.data.content, options: options });

    }

    optionOnChange = (index, data) => {
        let options = this.props.data.options;
        let option = options[index];
        option.content = data.content;
        option.is_correct = data.is_correct;

        this.props.change(this.props.index, { content: this.props.data.content, options: options });
    }

    deleteOption = (index) => {
        let options = this.props.data.options;
        options.splice(index, 1);

        this.props.change(this.props.index, { content: this.props.data.content, options: options });
    }

    render() {


        return (
            <div className="question">
                <fieldset className="border p-2">
                    <legend className="w-auto">Question</legend>

                    <Container>
                        <Row className="mb-4">
                            <Col md="2"><Label className="title font-weight-bold">Content</Label></Col>
                            <Col md="8">
                                <Input value={this.props.data.content} onChange={value => this.onChange('content', value)}></Input>
                            </Col>
                            <Col md="2">
                                <a className="delete-link" href="/#" onClick={(e) => this.delete(e, this.props.index)}>Delete</a>

                            </Col>
                        </Row>
                        <Container>
                            {
                                this.props.data.options &&
                                this.props.data.options.map((option, index) => {
                                    return <Option key={index} data={option} index={index}
                                        change={this.optionOnChange}
                                        delete={this.deleteOption} />
                                })
                            }
                        </Container>
                        <Container>
                            <Row>
                                <Col >
                                    <a className="add-option" href="/#" onClick={(e) => this.addOption(e)}>Add Option</a>
                                </Col>
                            </Row>

                        </Container>
                    </Container>

                </fieldset>
            </div>
        );
    }
}