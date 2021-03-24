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


class TableList extends Component {

    state = {
        search: null,
    }
    Next = () => {
        let body = this.state.search ? ({
            search: this.state.search
        }) : ({});
        fetch('/api/show/Users', {
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
                users: r,
            })

        }).catch(function (error) {
            console.log(error);
        });
    }
    Back = () => {
        let body = this.state.search ? ({
            search: this.state.search
        }) : ({});
        fetch('/api/show/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },
            body: JSON.stringify({
                more: -1,
                ...body,
            })

        }).then(async r => {
            r = await r.json();
            console.log('log  => 1', r);
            this.setState({
                users: r,
            })

        }).catch(function (error) {
            console.log(error);
        });
    }
    getUsers = () => {
        let body = this.state.search ? JSON.stringify({
            search: this.state.search
        }) : JSON.stringify({});
        fetch('/api/show/Users', {
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
                users: r,
            })

        }).catch(function (error) {
            console.log(error);
        });
    }

    remove = (d) => {
        $.confirm({
            title: 'Confirm!',
            content: 'are you sure wanna to delete this member?',
            buttons: {
                confirm: () => {
                    fetch('/api/delete/Users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
                        },
                        body: JSON.stringify({
                            id: d.id,
                        })

                    }).then(() => {

                        this.getUsers();

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
    update = (d) => {
        $.confirm({
                title: 'Prompt!',
                content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<label>Enter the new data.</label>' +
                    '<input value="' + d.id + '" type="text" placeholder="id" disabled class="form-control mb-1" required />' +
                    '<input value="' + d.email + '" type="text" placeholder="email" class="email form-control mb-1" required />' +
                    `
                <div class="dropdown mb-1">
              <button class="w-100 btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                default is ${d.role}
              </button>
              <input type="hidden" class="role" value="${d.role}">
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a onclick="$(this).parent().prev().val('super_user')" class="dropdown-item" href="#">super-user</a>
                <a onclick="$(this).parent().prev().val('admin_user')" class="dropdown-item" href="#">admin-user</a>
                <a onclick="$(this).parent().prev().val('viewer_user')" class="dropdown-item" href="#">viewer-user</a>
                <a onclick="$(this).parent().prev().val('normal_user')" class="dropdown-item" href="#">normal-user</a>
              </div>
            </div>

    ` +
                    '<input value="' + d.Place + '" type="text" placeholder="brunch ID" class="brunch form-control mb-1" required />' +
                    '<input value="' + d.name + '" type="text" placeholder="name" class="name form-control mb-1" required />' +
                    '</div>' +
                    '</form>',
                buttons: {
                    formSubmit: {
                        text: 'Submit',
                        btnClass: 'btn-blue',
                        action: function () {
                            var name = this.$content.find('.name').val();
                            var email = this.$content.find('.email').val();
                            var role = this.$content.find('.role').val();
                            var brunch = this.$content.find('.brunch').val();
                            console.log(name, email, role, brunch)
                            if (!name || !email || !role || !brunch) {
                                $.alert('provide a valid data');
                                return;
                            }
                            fetch('/api/update/Users', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
                                },
                                body: JSON.stringify({
                                    id: d.id,
                                    name: name,
                                    email: email,
                                    role: role,
                                    brunch: brunch
                                })

                            }).then(() => {

                                $.alert('Confirmed!');
                            }).catch(function (error) {
                                console.log(error);
                            });
                            return false;
                        },
                    },
                    cancel: function () {
                        //close
                    },
                }
            }
        );
    }

    componentDidMount() {
        this.getUsers();
    }


    render() {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md={12}>
                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-sm">Search by name</span>
                                </div>
                                <input onChange={(d) => {
                                    this.setState({
                                        search: d.target.value,
                                    }, () => {
                                        this.getUsers()

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
                                    <Card.Title as="h4">members List</Card.Title>
                                    <p className="card-category">
                                        Here you can as super user remove/edit the users in the site.
                                    </p>
                                </Card.Header>
                                <Card.Body style={{
                                    overflow: 'scroll',
                                }} className="table-full-width table-responsive px-0">
                                    <Table className="table-hover table-striped">
                                        <thead>
                                        <tr>
                                            <th className="border-0">ID</th>
                                            <th className="border-0">Name</th>
                                            <th className="border-0">Email</th>
                                            <th className="border-0">Role</th>
                                            <th className="border-0">Brunch</th>
                                            <th className="border-0">create at</th>
                                            <th className="border-0">last updated</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.users ? this.state.users.map((d) => {
                                            return <tr>
                                                <td>{d['id']}</td>
                                                <td>{d['name']}</td>
                                                <td>{d['email']}</td>
                                                <td>{d['role']}</td>
                                                <td>{d['place']}</td>
                                                <td>{d['create_at']}</td>
                                                <td>{d['updated_at']}</td>
                                                <td>

                                                    <button onClick={() => {
                                                        this.update(d);
                                                    }
                                                    } type="button" class="btn btn-info d-flex m-1" style={{
                                                        justifyContent: 'center'
                                                    }}>
                                                        <i className="nc-icon nc-settings-gear-64 text-info"></i>
                                                    </button>

                                                    <button onClick={() => {
                                                        this.remove(d);
                                                    }
                                                    } type="button" class="btn btn-danger d-flex m-1" style={{
                                                        justifyContent: 'center'
                                                    }}>
                                                        <i className="nc-icon nc-simple-remove text-danger"></i>
                                                    </button>


                                                </td>
                                            </tr>
                                        }) : <tr/>}

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


export default TableList;
