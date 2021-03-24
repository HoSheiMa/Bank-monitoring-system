import React, {Component} from "react";
import ChartistGraph from "react-chartist";
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
    Form,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";

class Dashboard extends Component {
    state = {
        search: null,
        role: localStorage.getItem('role'),
    }


    Next = () => {
        let body = this.state.search ? {
            search: this.state.search
        } : {};
        fetch('/api/show/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },
            body: JSON.stringify({
                more: 1,
                ...body
            })

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
    Back = () => {
        let body = this.state.search ? {
            search: this.state.search
        } : {};
        fetch('/api/show/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },
            body: JSON.stringify({
                more: -1, ...body
            })

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
    getRequests = () => {
        let body = this.state.search ? JSON.stringify({
            search: this.state.search
        }) : JSON.stringify({});
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
    ShortData = () => {

        fetch('/api/get/DashBoardSimpleData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },

        }).then(async r => {
            r = await r.json();
            console.log('log  => 1', r);
            this.setState({
                ...r
            })

        }).catch(function (error) {
            console.log(error);
        });
    }
    print = (d) => {
        localStorage.setItem('SavedDataForPrint', JSON.stringify(d));
        window.location.assign('/helper/print')
    }
    cancel = (id) => {
        $.confirm({
            title: 'Confirm!',
            content: 'are you sure wanna to cancel this request?',
            buttons: {
                confirm: () => {
                    fetch('/api/cancel/request', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
                        },
                        body: JSON.stringify({
                            id: id,
                        })

                    }).then(() => {

                        this.getRequests();

                        $.alert('Confirmed!');
                    }).catch(function (error) {
                        console.log(error);
                    });


                },
                cancel: function () {
                    $.alert('Canceled!');
                },

            }
        });


    }
    approve = (id) => {
        $.confirm({
            title: 'Confirm!',
            content: 'are you sure wanna to approve this request?',
            buttons: {
                confirm: () => {
                    fetch('/api/approve/request', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
                        },
                        body: JSON.stringify({
                            id: id,
                        })

                    }).then(() => {

                        this.getRequests();

                        $.alert('Confirmed!');
                    }).catch(function (error) {
                        console.log(error);
                    });


                },
                cancel: function () {
                    $.alert('Canceled!');
                },

            }
        });

    }

    componentDidMount() {
        this.ShortData();
        this.getRequests();
    }

    render() {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col lg="3" sm="6">
                            <Card className="card-stats">
                                <Card.Body>
                                    <Row>
                                        <Col xs="5">
                                            <div className="icon-big text-center icon-warning">
                                                <i className="nc-icon nc-chart text-warning"></i>
                                            </div>
                                        </Col>
                                        <Col xs="7">
                                            <div className="numbers">
                                                <p className="card-category">Branches</p>
                                                <Card.Title as="h4">{this.state.Branches}</Card.Title>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="3" sm="6">
                            <Card className="card-stats">
                                <Card.Body>
                                    <Row>
                                        <Col xs="5">
                                            <div className="icon-big text-center icon-warning">
                                                <i className="nc-icon nc-single-02 text-success"></i>
                                            </div>
                                        </Col>
                                        <Col xs="7">
                                            <div className="numbers">
                                                <p className="card-category">Members</p>
                                                <Card.Title as="h4">{this.state.users}</Card.Title>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="3" sm="6">
                            <Card className="card-stats">
                                <Card.Body>
                                    <Row>
                                        <Col xs="5">
                                            <div className="icon-big text-center icon-warning">
                                                <i className="nc-icon nc-vector text-danger"></i>
                                            </div>
                                        </Col>
                                        <Col xs="7">
                                            <div className="numbers">
                                                <p className="card-category">Padding requests</p>
                                                <Card.Title as="h4">{this.state.padding_requests}</Card.Title>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg="3" sm="6">
                            <Card className="card-stats">
                                <Card.Body>
                                    <Row>
                                        <Col xs="5">
                                            <div className="icon-big text-center icon-warning">
                                                <i className="nc-icon nc-check-2 text-primary"></i>
                                            </div>
                                        </Col>
                                        <Col xs="7">
                                            <div className="numbers">
                                                <p className="card-category">Approved requests</p>
                                                <Card.Title as="h4">{this.state.approved_requests}</Card.Title>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                     <Col onClick={() => window.location.assign('/helper/Export')} md={12} className={'text-right m-3'}><div className="btn btn-info">Export Excel File</div></Col>

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

export default Dashboard;
