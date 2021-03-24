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


class BrunchesList extends Component {

    state = {}
    Next = () => {
        fetch('/api/show/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },
            body: JSON.stringify({
                more: 1,
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
        fetch('/api/show/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },
            body: JSON.stringify({
                more: -1,
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
                Brunches: r,
            })

        }).catch(function (error) {
            console.log(error);
        });
    }


    componentDidMount() {
        this.getBrunches();
    }

    addNewUser = (d) => {
         $.confirm({
                title: 'Prompt!',
                content: '' +
                    '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<label>Enter the new data.</label>' +
                    '<input value="" type="text" placeholder="email" class="email form-control mb-1" required />' +
                    `
                <div class="dropdown mb-1">
              <button class="w-100 btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                choose the role
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
                    '<input disabled value="' + d.id + '" type="text" placeholder="brunch ID" class="brunch form-control mb-1" required />' +
                    '<input value="" type="text" placeholder="name" class="name form-control mb-1" required />' +
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
                            fetch('/api/add/Users', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
                                },
                                body: JSON.stringify({
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

    render() {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col md="12">
                            <Card className="strpied-tabled-with-hover">
                                <Card.Header>
                                    <Card.Title as="h4">Striped Table with Hover</Card.Title>
                                    <p className="card-category">
                                        Here is a subtitle for this table
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
                                            <th className="border-0">Address</th>
                                            <th className="border-0">Details</th>
                                            <th className="border-0">create at</th>
                                            <th className="border-0">last updated</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.Brunches ? this.state.Brunches.map((d) => {
                                            return <tr>
                                                <td>{d['id']}</td>
                                                <td>{d['name']}</td>
                                                <td>{d['address']}</td>
                                                <td>{d['details']}</td>
                                                <td>{d['create_at']}</td>
                                                <td>{d['updated_at']}</td>
                                                <td>

                                                    <button onClick={() => {
                                                        this.addNewUser(d);
                                                    }
                                                    } type="button" class="btn btn-success d-flex m-1" style={{
                                                        justifyContent: 'center'
                                                    }}>
                                                        <i className="nc-icon nc-simple-add text-success"></i>
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


export default BrunchesList;
