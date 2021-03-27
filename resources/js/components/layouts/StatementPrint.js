import React, {Component} from 'react';

class StatementPrint extends Component {
    state = {
        data: JSON.parse(localStorage.getItem('SavedDataForPrint'))
    }

    render() {
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
                                                        <h2>Statement #{this.state.data.statement_id}</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="content-block">
                                                        <table class="invoice">
                                                            <tbody>
                                                            <tr>
                                                                <td>
                                                                    ID: {this.state.data.statement_id}
                                                                    <br/>
                                                                    brunch: {this.state.data.brunch}
                                                                    <br/>
                                                                    date: {this.state.data.date}

                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <table class="invoice-items" cellpadding="0"
                                                                           cellspacing="0">
                                                                        <tbody>
        <h3>List</h3>

                                                                        {this.state.data.requests.map((d) => {

                                                                            return <tr>
                                                                                <td>#{d.id}
                                                                                <br/>
                                                                                {d.name}
                                                                                <br/>
                                                                                {d.money_in_number}</td>
                                                                            </tr>
                                                                        })}

                                                                        <tr>
                                                                            <td>total amount in number</td>
                                                                            <td class="alignright">{this.state.data.total}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>total amount in text</td>
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

export default StatementPrint;
