import React, { Component } from "react";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import convert from "xml-js";

const gridColumn = [
  { name: "shop", title: "Магазин" },
  { name: "goods", title: "Товар" },
  { name: "price", title: "Общая сумма" },
  { name: "date", title: "Дата" }
];

class TableOrders extends Component {
  state = {
    file: null
  };

  openFile = event => {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = () => {
      let u = reader.result.substring(0, 2000);
      var result = convert.xml2js(u, {
        compact: true,
        spaces: 4
      });
      let a = result.data.orders.map(el => {
        let date = el.date._text;
        let price = el.price._text;
        let shop = el.shop._text;
        let goods = el.goods._text;
        return {
          date, price, shop, goods
        }
      });
      this.setState({
        file: a
      });
    };
    reader.readAsText(input.files[0]);
  };

  render() {
    return (
      <div>
        <input
          type="file"
          accept="text/plain"
          onChange={event => this.openFile(event)}
        />
        {this.state.file && (
          <Grid columns={gridColumn} rows={this.state.file}>
            <Table />
            <TableHeaderRow />
          </Grid>
        )}
      </div>
    );
  }
}

export default TableOrders;
