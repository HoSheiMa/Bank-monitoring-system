import React, {Component} from 'react';

var pdfMake = require('pdfmake');
var pdfFonts = require('pdfmake/build/vfs_fonts');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// console.log(pdfMake)
// let Roboto = require('./fonts/Roboto-Regular.ttf');
// pdfMake.addFonts(Roboto);

class Pdf extends Component {
    componentDidMount() {
        fetch('/api/export/excel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": document.querySelector('meta[name=token]').getAttribute('value')
            },

        }).then(async (d) => {
            d = await d.json();
            let keys = Object.keys(d[0]);
            let _key = ""
            for (let i in keys) {
                if (keys[i] == "image") continue;
                _key += "\n" + keys[i];
            }
            let arr = [];
            for (let i in d) {
                let a = '';
                for (let ii in keys) {
                    if (keys[ii] == "image") continue;
                    a += "\n" + (d[i][keys[ii]]);
                }
                arr.push([_key, a]);
                if (d[i]['image'] !== "data:") {
                    arr.push(['image', {
                        image: d[i]['image'],
                        width: 400,
                    },])
                } else {
                     arr.push(['image', '-'])
                }

            }
            var docDefinition = {
                content: [
                    {
                        table: {
                            style: 'tableExample',
                            heights: 40,
                            widths: ['auto', '*'],
                            // headers are automatically repeated if the table spans over multiple pages
                            // you can declare how many rows should be treated as headers
                            body: [
                                ['Tags', 'Values'],
                                ...arr
                            ]
                        }
                    }
                ]
            };
            pdfMake.tableLayouts = {
                exampleLayout: {
                    hLineWidth: function (i, node) {
                        if (i === 0 || i === node.table.body.length) {
                            return 0;
                        }
                        return (i === node.table.headerRows) ? 2 : 1;
                    },
                    vLineWidth: function (i) {
                        return 0;
                    },
                    hLineColor: function (i) {
                        return i === 1 ? 'black' : '#aaa';
                    },
                    paddingLeft: function (i) {
                        return i === 0 ? 0 : 8;
                    },
                    paddingRight: function (i, node) {
                        return (i === node.table.widths.length - 1) ? 0 : 8;
                    }
                }
            };

// download the PDF
            pdfMake.createPdf(docDefinition).download();
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

export default Pdf;
