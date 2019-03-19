import React, { Component } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

const gridColumn = [
    { name: 'shop', title: 'Магазин' },
    { name: 'goods', title: 'Товары' },
    { name: 'price', title: 'Общая сумма' },
    { name: 'date', title: 'Дата' }
];

// THIS!
const gridRows = [
    { shop: 'г.Могилёв, ул.Каштановая, 43а', goods: ['Молоко', ', ', 'Шаурма'], price: 14.7, date: '18.03.2019' },
    { shop: 'г.Минск, ул.Подгорная, 12', goods: ['Молоко', ', ', 'Шаурма'], price: 74.5, date: '19.03.2019' }
]

class TableOrders extends Component {
    render() {
        // const { gridRows } = this.props;
        return (
            <React.Fragment>
                <Grid
                    columns={gridColumn}
                    rows={gridRows}
                >
                    <Table />
                    <TableHeaderRow />
                </Grid>
            </React.Fragment>
        );
    };
};

export default TableOrders;
