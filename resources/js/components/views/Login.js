import React, {Component} from 'react';
import "/Signin Template for Bootstrap_files/signin.css";

class Login extends Component {
    state = {
        user: null,
        password: null,
    }
    Log = (event) => {
        event.preventDefault();

        let {user, password} = this.state;
        if (user && password) {
            fetch('/api/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
                },
                body: JSON.stringify({
                    user: user, password: password,
                    "_token": document.querySelector('meta[name=token]').getAttribute('value')
                })

            }).then(async r => {
                console.log('log  => 1', r);
                r = await r.json();
                if (r.success === true) {
                    localStorage.setItem('role', r.role);
                    localStorage.setItem('brunch', r.brunch);
                    switch (localStorage.getItem('role')) {
                    case 'super_user':
                        window.location.assign('/admin/dashboard')
                        break;
                    case 'viewer_user':
                        window.location.assign('/viewer/dashboard')
                        break;
                    case 'admin_user':
                        window.location.assign('/BrunchAdmin/dashboard')
                        break;
                    case 'normal_user':
                        window.location.assign('/BrunchMember/dashboard')
                        break;


                }

                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    IsLogIn = () => {
        fetch('/api/IsLogIn', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },
            body: JSON.stringify({
                "_token": document.querySelector('meta[name=token]').getAttribute('value')

            })

        }).then(async r => {
            r = await r.json();
            if (r.success === true) {

                switch (localStorage.getItem('role')) {
                    case 'super_user':
                        window.location.assign('/admin/dashboard')
                        break;
                    case 'viewer_user':
                        window.location.assign('/viewer/dashboard')
                        break;
                    case 'admin_user':
                        window.location.assign('/BrunchAdmin/dashboard')
                        break;
                    case 'normal_user':
                        window.location.assign('/BrunchMember/dashboard')
                        break;


                }
            }
        })
        return false;
    }

    componentDidMount() {
        this.IsLogIn();

    }

    render() {
        return (
            <div class="text-center" style={{width: '100vw'}}>
                <form onsubmit="return false" className="form-signin">
                    <img className="mb-4" src=" " alt="" width="72"
                         height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input onChange={(d) => {
                        this.setState({
                            user: d.target.value
                        })
                    }} type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
                           autofocus=""/>
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input onChange={(d) => {
                        this.setState({
                            password: d.target.value
                        })
                    }} type="password" id="inputPassword" className="form-control" placeholder="Password"
                           required=""/>

                    <button onClick={this.Log} className="btn btn-lg btn-primary btn-block" type="submit">Sign in
                    </button>
                    <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
                </form>
            </div>
        );
    }
}

export default Login;
