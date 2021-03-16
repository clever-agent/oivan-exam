import React, { Component } from 'react';
import './Option.scss';
import { Container, Row, Col, Label, Input } from 'reactstrap';

export default class Option extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: '',
            is_correct: false
        }
    }

    componentDidMount() {
    }

    onChange = (fieldName, fieldValue) => {
        let value = fieldValue.target ? fieldValue.target.value : fieldValue;
        let data = { content: this.props.data.content, is_correct: this.props.data.is_correct };
        let overrideData = { [fieldName]: value };
        this.props.change(this.props.index, Object.assign({}, data, overrideData));
    }

    onCheckboxChange = (fieldName, fieldValue) => {
        let value = fieldValue.target ? fieldValue.target.checked : fieldValue;
        let data = { content: this.props.data.content, is_correct: this.props.data.is_correct };
        let overrideData = { [fieldName]: value };
        this.props.change(this.props.index, Object.assign({}, data, overrideData));

    }


    delete = (e, index) => {
        e.preventDefault();

        this.props.delete(index);
        console.log("delete option ", index);
    }

    render() {
        console.log("render option", this.props.data.is_correct);

        return (
            <div className="option">
                <Container>
                    <Row>
                        <Col md="2"><Label className="title font-weight-bold">Option</Label></Col>
                        <Col md="6">
                            <Input className="input-content" value={this.props.data.content} onChange={value => this.onChange('content', value)}></Input>
                        </Col>
                        <Col md="1">
                            <Input type="checkbox" defaultChecked={this.props.data.is_correct} value={this.props.data.is_correct} onChange={value => this.onCheckboxChange('is_correct', value)}></Input>
                            <span className="correct">Correct</span>
                        </Col>

                        <Col md="1">
                            <a className="delete-link" href="#" onClick={(e) => this.delete(e, this.props.index)}>Delete</a>

                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}