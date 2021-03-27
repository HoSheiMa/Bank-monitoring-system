import React, {Component} from 'react';

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
} from "react-bootstrap";

import moment from 'moment';
import DatePicker from 'react-date-picker';


class CreateStatement extends Component {

    state = {
        money_in_number: null,
        money_in_text: null,
        details: null,
        date: null,
        id: null,

    }
    onDateChange = (d) => {
        let y = (moment(d).format('YYYY-MM-DD'))
        let x = new Date(y);
        this.setState({
            activeDate: y,
            date: x,
        })
    }
    add = (d) => {
        d.preventDefault();


        fetch('/api/add/statement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },
            body: JSON.stringify({
                money_in_number: this.state.money_in_number,
                money_in_text: this.state.money_in_text,
                details: this.state.details,
                date: this.state.activeDate,
                id: this.state.id,
            }),

        }).then(async (d) => {
            d = await d.json()
            if (d.success === false) {
                this.setState({
                    error: true,
                    msg: d.msg
                })
            } else {
                this.setState({
                    error: false,
                    msg: d.msg
                })
            }

        })


    }
    render() {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <form method={"POST"} enctype={"multipart/form-data"}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">number of statement</label>
                                    <input name={"name"} onChange={(d) => this.setState({
                                        id: d.target.value
                                    })} type="text" class="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Enter Name"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">amount in number</label>
                                    <input name={"name"} onChange={(d) => this.setState({
                                        money_in_number: d.target.value
                                    })} type="text" class="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Enter Name"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">amount in text</label>
                                    <input onChange={(d) => this.setState({
                                        money_in_text: d.target.value
                                    })}  name={"id_card"} type="text" class="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Enter ID"/>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputEmail1">details</label>
                                    <textarea name={"iban"} onChange={(d) => this.setState({
                                        details: d.target.value
                                    })} type="text" class="form-control" id="exampleInputEmail1"
                                              aria-describedby="emailHelp" placeholder="Enter Iban"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Date</label>
                                    <br/>
                                    <DatePicker
                                        format={"y-MM-dd"}
                                        onChange={this.onDateChange}
                                        value={this.state.date}
                                    /></div>


                                {this.state.error === false ? <div class="alert alert-success" role="alert">
                                    {this.state.msg ? this.state.msg : ""}
                                </div> : <div/>}
                                {this.state.error === true ?<div class="alert alert-danger" role="alert">
                                    {this.state.msg ? this.state.msg : ""}
                                </div> : <div/>}

                                <button onClick={this.add} type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}


export default CreateStatement;
