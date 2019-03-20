import React, { Component } from "react";
import {
  Grid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";
import convert from "xml-js";

const gridColumn = [
  { name: "shop", title: "Магазин" },
  { name: "goods", title: "Товары" },
  { name: "price", title: "Общая сумма" },
  { name: "date", title: "Дата" }
];

// THIS!
const gridRows = [
  {
    shop: "г.Могилёв, ул.Каштановая, 43а",
    goods: ["Молоко", "Шаурма"],
    price: 14.7,
    date: "18.03.2019"
  },
  {
    shop: "г.Минск, ул.Подгорная, 12",
    goods: ["Молоко", "Шаурма"],
    price: 74.5,
    date: "19.03.2019"
  }
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
      console.log(u);
      var result = convert.xml2js(u, {
        compact: true,
        spaces: 4
      });
      console.log("result: ", result);
      this.setState({
        file: result.data.orders
      });
    };
    reader.readAsText(input.files[0]);
  };

  render() {
    console.log("this.state.file: ", this.state.file);
    return (
      <div>
        <input
          type="file"
          accept="text/plain"
          onChange={event => this.openFile(event)}
        />
        {this.state.file && (
        //   <Grid columns={gridColumn} rows={gridRows}>
        //     <Table />
        //     <TableHeaderRow />
        //   </Grid>
            // {this.state.file.map(el )}
        )}
      </div>
    );
  }
}

export default TableOrders;
