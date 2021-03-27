import React, {Component} from "react";
// react-bootstrap components
import moment from 'moment';
import DatePicker from 'react-date-picker';

import {
    Badge,
    Button,
    Card,
    Dropdown,
    Nav,
    Table,
    Container,
    Row,
    Col,
    Form,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";

class StatementList extends Component {
    state = {
        search: null,
        active: null,
        activeDate: null,
        role: localStorage.getItem('role'),
        date: new Date(),
        brunches: []
    }


    Next = () => {
        this.getRequests(1)

    }
    Back = () => {
        this.getRequests(-1)
    }
    getRequests = (more) => {
        let x = this.state.activeDate ? (this.state.activeDate) : moment().format('YYYY-MM-DD');
        let body = JSON.stringify({
            search: this.state.search,
            date: x,
            brunch: this.state.active,
            more: more,
            advance: true, // advance Search only for super_user and viewer_user
        })
        fetch('/api/show/statement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },
            body: body

        }).then(async r => {
            r = await r.json();
            console.log('log  => 1', r);
            this.setState({
                requests: r,
            })

        }).catch(function (error) {
            console.log(error);
        });
    }
    print = (d) => {
        fetch('/api/statement/print/getdata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },
            body: JSON.stringify({
                date: d.date,
                details: d.details,
                id: d.id,
                brunch:d.brunch_id,
                money_in_text:d.money_in_text,
            })

        }).then(async r => {
            r = await r.json();
            console.log(r);
            localStorage.setItem('SavedDataForPrint', JSON.stringify(r));
            window.location.assign('/helper/statement/print')

        }).catch(function (error) {
            console.log(error);
        });

    }


    onDateChange = (d) => {
        let y = (moment(d).format('YYYY-MM-DD'))
        console.log(y)
        let x = new Date(y);
        this.setState({
            activeDate: y,
            date: x,
        }, () => {
            this.getRequests()
        })
    }
    getBrunches = () => {

        fetch('/api/show/Brunches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },

        }).then(async r => {
            r = await r.json();
            console.log('log  => 1', r);
            this.setState({
                brunches: r,
            })

        }).catch(function (error) {
            console.log(error);
        });
    }


    componentDidMount() {
        this.getRequests();
        this.getBrunches();
    }

    render() {

        return (
            <>
                <Container fluid>
                    <Row className={"mt-2 mb-2"}>
                        <Col md={3}>
                            <DatePicker
                                format={"y-MM-dd"}
                                onChange={this.onDateChange}
                                value={this.state.date}
                            />
                            <Dropdown className={"m-2"}>
                                <Dropdown.Toggle id="dropdown-basic">
                                    pick Brunch
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {this.state.brunches.map((d) => {
                                        return <Dropdown.Item onClick={() => {
                                            this.setState({
                                                active: `${d.id}`
                                            }, () => this.getRequests())
                                        }}>{d.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">Search by request id</span>
                                </div>
                                <input onChange={(d) => {
                                    this.setState({
                                        search: d.target.value,
                                    }, () => {
                                        this.getRequests()

                                    })
                                }
                                } type="text" class="form-control" aria-label="Small"
                                       aria-describedby="inputGroup-sizing-sm"/>
                            </div>

                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Card className="strpied-tabled-with-hover">
                                <Card.Header>
                                    <Card.Title as="h4">List Of Requests</Card.Title>
                                    <p className="card-category">
                                        Here You can see full info about the requests
                                    </p>
                                </Card.Header>
                                <Card.Body style={{
                                    overflow: 'scroll',
                                }} className="table-full-width table-responsive px-0">
                                    <Table className="table-hover table-striped">
                                        <thead>
                                        <tr>
                                            <th className="border-0">id</th>
                                            <th className="border-0">brunch id</th>
                                            <th className="border-0">Money In Number</th>
                                            <th className="border-0">Money In Text</th>
                                            <th className="border-0">details</th>
                                            <th className="border-0">date</th>
                                            <th className="border-0">create at</th>
                                            <th className="border-0">last update at</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.requests ? this.state.requests.map((d, i) => {
                                            return <tr>
                                                <td>{d['id']}</td>
                                                <td>{d['brunch_id']}</td>
                                                <td>{d['money_in_number']}</td>
                                                <td>{d['money_in_text']}</td>
                                                <td>{d['details']}</td>
                                                <td>{d['date']}</td>
                                                <td>{d['created_at']}</td>
                                                <td>{d['updated_at']}</td>

                                                <button onClick={() => this.print(d)} type="button"
                                                        class="btn btn-warning m-1">Print
                                                </button>

                                            </tr>
                                        }) : <div/>}
                                        </tbody>
                                    </Table>

                                </Card.Body>
                            </Card>
                        </Col>
                        <div style={{
                            alignItems: "center",
                            display: "flex",
                            width: '100%',
                            justifyContent: "space-between",
                        }}>
                            <a onClick={this.Back}>
                                <i style={{
                                    cursor: 'pointer',
                                    fontSize: 19
                                }} className="nc-icon nc-stre-left text-warning"></i>

                            </a>

                            <a onClick={this.Next}>
                                <i style={{
                                    cursor: 'pointer',
                                    fontSize: 19
                                }} className="nc-icon nc-stre-right text-warning"></i>

                            </a>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

export default StatementList;
