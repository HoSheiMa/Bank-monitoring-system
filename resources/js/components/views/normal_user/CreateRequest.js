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


class CreateRequest extends Component {

    state = {
        search: null,
        brunch: localStorage.getItem('brunch'),
        name: null,
        id_card: null,
        iban: null,
        money_in_number: null,
        money_in_text: null,
        details: null,
        image: null,

    }
    add = (d) => {
        d.preventDefault();

        const formData = new FormData(document.querySelector('form'));
        let body = {};
        for (let e of formData) {
            console.log(e[0], e[1])
            body[e[0]] = e[1]
        }

        if (body['attach']) {
            let file = body['attach'];

            let reader = new FileReader();

            reader.onloadend = () => {
                body['image'] = {
                    type: file.type,
                    name: file.name,
                    src: reader.result
                }
                fetch('/api/add/request', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
                    },
                    body: JSON.stringify(body),

                }).then((d) => {
                    console.log(d)
                    window.location.assign('/BrunchMember/dashboard')
                })
            }
            reader.readAsDataURL(file);
            return;
        }
        fetch('/api/add/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },
            body: JSON.stringify(body),

        }).then((d) => {
            window.location.assign('/BrunchMember/dashboard')

        })


    }

    componentDidMount() {
    }


    render() {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <form method={"POST"} enctype={"multipart/form-data"}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Name</label>
                                    <input name={"name"} onChange={(d) => this.setState({
                                        name: d.target.value
                                    })} type="text" class="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Enter Name"/>
                                </div>
                                <div class="form-group">
                                    <label onChange={(d) => this.setState({
                                        id_card: d.target.value
                                    })} for="exampleInputEmail1">ID</label>
                                    <input name={"id_card"} type="text" class="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Enter ID"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Iban</label>
                                    <input name={"iban"} onChange={(d) => this.setState({
                                        iban: d.target.value
                                    })} type="text" class="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Enter Iban"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">The amount is in numbers</label>
                                    <input name={'money_in_number'} onChange={(d) => this.setState({
                                        money_in_number: d.target.value
                                    })} type="text" class="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="amount"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">The amount is in text</label>
                                    <input name={'money_in_text'} onChange={(d) => this.setState({
                                        money_in_text: d.target.value
                                    })} type="text" class="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="amount"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Details</label>
                                    <input name={'details'} onChange={(d) => this.setState({
                                        details: d.target.value
                                    })} type="text" class="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Enter Details"/>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Details</label>
                                    <input name={'attach'} onChange={(d) => {
                                        console.log(d.target.files[0])
                                        this.setState({
                                            image: d.target.files[0]
                                        })
                                    }} type="File" class="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp" placeholder="Enter Details"/>
                                </div>
                                <button onClick={this.add} type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}


export default CreateRequest;
