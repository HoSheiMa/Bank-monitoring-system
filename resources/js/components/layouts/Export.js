import React, {Component} from 'react';
import XLSX from 'xlsx';

class Export extends Component {
    componentDidMount() {
        fetch('/api/export/excel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },

        }).then(async (d) => {
            let data = await d.json();
            // var data = [
            //     {"name": "John", "city": "Seattle"},
            // ];

            /* this line is only needed if you are not adding a script tag reference */
            if (typeof XLSX == 'undefined') XLSX = require('xlsx');

            /* make the worksheet */
            var ws = XLSX.utils.json_to_sheet(data);

            /* add to workbook */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "People");

            /* generate an XLSX file */
            XLSX.writeFile(wb, "sheetjs.xlsx");


        }).catch(function (error) {
            console.log(error);
        });


    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Export;
