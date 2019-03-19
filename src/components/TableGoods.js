import React, { Component } from 'react';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import Button from '@material-ui/core/Button';

const gridColumn = [
    { name: 'name', title: 'Название' },
    { name: 'description', title: 'Описание' },
    { name: 'price', title: 'Цена' },
    { name: 'count', title: 'Количество на складе' }
];

class TableGoods extends Component {
    render() {
        const { gridRows } = this.props;
        return (
            <React.Fragment>
                Сортировать
                <Button variant="contained" style={{marginLeft: '10px'}}>
                    по имени
                </Button>
                <Button variant="contained" style={{marginLeft: '10px'}}>
                    по цене
                </Button>
                <Button variant="contained" style={{marginLeft: '10px'}}>
                    по количеству
                </Button>
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

export default TableGoods;
