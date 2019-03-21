import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import convert from "xml-js";
//component
import TableGoods from "./components/TableGoods";
import PopupForCreateOrder from "./components/PopupForCreateOrder";
import PopupForShowOrders from "./components/PopupForShowOrders";

class App extends Component {
  state = {
    openPopupForCreateOrder: false,
    openPopupForShowOrder: false,
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


      let el = result.data;
      let view = el.view._text;
      let list = el.list.map(l => {
        let category = l.category._text;
        let goods = l.goods.map(gd => {
          return {
            name: gd.name._text,
            description: gd.description._text,
            price: gd.price._text,
            count: gd.count._text,
          }
        })
        return { category, goods }
      });
      let a = {
        view, list
      };

      this.setState({
        file: [a]
      });
    };
    reader.readAsText(input.files[0]);
  };

  openPopupForCreateOrder = () => {
    this.setState({
      openPopupForCreateOrder: true
    })
  };

  closePopupForCreateOrder = () => {
    this.setState({
      openPopupForCreateOrder: false
    })
  };

  openPopupForShowOrder = () => {
    this.setState({
      openPopupForShowOrder: true
    })
  };

  closePopupForShowOrder = () => {
    this.setState({
      openPopupForShowOrder: false
    })
  };


  sortToPrice = () => {
    const goodsList = this.state.file;
    let finalFile = goodsList.map(el => {
      let finalGoods = el.list.map(list => {
        let goods = list.goods;
        let gMin = 0;
        for (let i = 0; i < goods.length; i++) {
          let mm;
          if (goods[i].price < goods[gMin].price) {
            mm = goods[i];
            goods[i] = goods[gMin];
            goods[gMin] = mm;
            gMin = i
          }
        }
        return { category: list.category, goods };
      })

      return { list: finalGoods, view: el.view };
    })

    this.setState({
      file: finalFile
    });
    console.log('sortToPrice: ', finalFile);
  };

  sortToCount = () => {
    const goodsList = this.state.file;
    let finalFile = goodsList.map(el => {
      let finalGoods = el.list.map(list => {
        let goods = list.goods;
        let gMin = 0;
        for (let i = 0; i < goods.length; i++) {
          let mm;
          if (goods[i].count < goods[gMin].count) {
            mm = goods[i];
            goods[i] = goods[gMin];
            goods[gMin] = mm;
            gMin = i
          }
        }
        return { category: list.category, goods };
      })

      return { list: finalGoods, view: el.view };
    })

    this.setState({
      file: finalFile
    });
    console.log('sortToCount: ', finalFile);
  }

  render() {
    const goodsList = this.state.file;
    return (
      <div style={{ marginLeft: '20px' }}>
        <input
          type="file"
          accept="text/plain"
          onChange={event => this.openFile(event)}
        />
        {this.state.openPopupForCreateOrder && this.state.file &&
          <PopupForCreateOrder handleClose={this.closePopupForCreateOrder} onlyGoodsList={goodsList.map(el => { let e = el.list.map(list => { return list.goods }); return e })} />}
        {this.state.openPopupForShowOrder &&
          <PopupForShowOrders handleClose={this.closePopupForShowOrder} />}
        <h1>Склад</h1>
        <Button variant="contained" color="primary" onClick={() => this.openPopupForCreateOrder()}>
          Создать заказ
        </Button>
        <Button variant="contained" color="secondary" onClick={() => this.openPopupForShowOrder()} style={{ marginLeft: '20px' }}>
          Просмотр заказов
        </Button>
        {this.state.file && (
          <div>
            {goodsList.map(el => (
              <div>
                <h2>Вид товаров: {el.view}</h2>
                {el.list.map(list => (
                  <div>
                    <h3>Категория: {list.category}</h3>
                    <TableGoods gridRows={list.goods} sortToPrice={this.sortToPrice} sortToCount={this.sortToCount} />
                  </div>
                ))}
              </div>
            ))}
          </div>)}
      </div>
    );
  }
}

export default App;
