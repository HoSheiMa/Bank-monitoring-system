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

class BrunchesRquests extends Component {
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
        fetch('/api/show/requests', {
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
        localStorage.setItem('SavedDataForPrint', JSON.stringify(d));
        window.location.assign('/helper/print')
    }


    onDateChange = (d) => {
        let y= (moment(d).format('YYYY-MM-DD'))
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
                    <Col md={12} className={'text-right m-3'}>
                        <div onClick={() => window.location.assign('/helper/Export')} className="btn btn-success m-1">Export
                            Excel File
                        </div>
                         <div onClick={() => window.location.assign('/helper/PDF')} className="btn btn-danger m-1">Export
                            PDF File
                        </div>
                    </Col>
                    <Col md={12} className={'text-right m-3'}>

                    </Col>
                    <Row className={"mt-2 mb-2"}>
                        <Col md={3}>
                            <DatePicker
                                format={"y-MM-dd"}
                                onChange={this.onDateChange}
                                value={this.state.date}
                            />
                        </Col>
                        <Col md={3}>
                            <Dropdown>
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
                                            <th className="border-0">state</th>
                                            <th className="border-0">name</th>
                                            <th className="border-0">Money In Number</th>
                                            <th className="border-0">Money In Text</th>
                                            <th className="border-0">iban</th>
                                            <th className="border-0">Image</th>

                                            <th className="border-0">create at</th>
                                            <th className="border-0">last update at</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.requests ? this.state.requests.map((d, i) => {
                                            return <tr>
                                                <td>{d['id']}</td>
                                                <td>{d['brunch_id']}</td>
                                                <td>{d['state']}</td>
                                                <td>{d['name']}</td>
                                                <td>{d['ID_card']}</td>
                                                <td>{d['money_in_number']}</td>
                                                <td>{d['money_in_text']}</td>
                                                <td>{d['details']}</td>
                                                <td>{d['iban_number']}</td>
                                                <td>{d['image'] !== "data:" ?
                                                    <img src={d['image']} width={100} height={100}/> : <div/>}</td>
                                                <td>{d['created_at']}</td>
                                                <td>{d['updated_at']}</td>
                                                {this.state.role == "admin_user" && d['state'] == "padding" ? <td>
                                                    <button onClick={() => this.approve(d['id'])} type="button"
                                                            class="btn btn-success m-1">Approve
                                                    </button>
                                                    <button onClick={() => this.cancel(d['id'])} type="button"
                                                            class="btn btn-danger m-1">Canncel
                                                    </button>

                                                </td> : <div/>}
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

export default BrunchesRquests;
