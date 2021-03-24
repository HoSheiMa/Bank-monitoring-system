import React, {Component} from 'react';

class Print extends Component {
    state = {
        data: JSON.parse(localStorage.getItem('SavedDataForPrint'))
    }


    render() {
        console.log(this.state.data)
        return (
            <div className={"row justify-center"} style={{
                width: '100vw'
            }}>

                <table class="body-wrap">
                    <tbody>
                    <tr>
                        <td></td>
                        <td class="container" width="600">
                            <div class="content">
                                <table class="main" width="100%" cellpadding="0" cellspacing="0">
                                    <tbody>
                                    <tr>
                                        <td class="content-wrap aligncenter">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                <tr>
                                                    <td class="content-block">
                                                        <h2>Request #{this.state.data.id}</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="content-block">
                                                        <table class="invoice">
                                                            <tbody>
                                                            <tr>
                                                                <td>
                                                                    ID: {this.state.data.ID_card}
                                                                    <br/>
                                                                    State: {this.state.data.state}
                                                                    <br/>
                                                                    created at: {this.state.data.created_at}
                                                                    <br/>
                                                                    updated at: {this.state.data.updated_at}

                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <table class="invoice-items" cellpadding="0"
                                                                           cellspacing="0">
                                                                        <tbody>
                                                                        <td>{this.state.data['image'] !== "data:" ?
                                                                            <img src={this.state.data['image']} width={300}
                                                                                 height={300}/> : <div/>}</td>

                                                                        <tr>
                                                                            <td>name</td>
                                                                            <td class="alignright">{this.state.data.name}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>brunch id</td>
                                                                            <td class="alignright">{this.state.data.brunch_id}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>iban</td>
                                                                            <td class="alignright">{this.state.data.iban_number}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>money in number</td>
                                                                            <td class="alignright">{this.state.data.money_in_number}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>money in text</td>
                                                                            <td class="alignright">{this.state.data.money_in_text}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>details</td>
                                                                            <td class="alignright">{this.state.data.details}</td>
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td onClick={(e) => {
                                                        e.target.remove();
                                                        window.print()
                                                    }} class="content-block">
                                                        <a href="#">Print</a>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="footer">
                                    <table width="100%">
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Print;
