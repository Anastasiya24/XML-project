import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
//component
import TableGoods from "./components/TableGoods";
import PopupForCreateOrder from "./components/PopupForCreateOrder";
import PopupForShowOrders from "./components/PopupForShowOrders";

// THIS!
const goodsList = [
  {
    view: 'Продовольственные', list: [{
      category: 'Продукты питания', goods: [
        { name: 'Молоко', description: 'Жидкое, свежее', price: 0.7, count: 100 },
        { name: 'Шашлык "По-братски"', description: 'Сочный, что пальчики съешь', price: 0.7, count: 457 },
        { name: 'Шаурма', description: 'Аппетитная', price: 5.5, count: 10006 }
      ]
    },
    {
      category: 'Бытовая химия', goods: [
        { name: 'Крем "Ромашка"', description: 'Крем для рук', price: 1.8, count: 24 },
        { name: 'Крапивная шампунь', description: 'Шампунь для придания густоты', price: 3.3, count: 700 },
      ]
    },
    ]
  }
]

class App extends Component {
  state = {
    openPopupForCreateOrder: false,
    openPopupForShowOrder: false
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

  render() {
    return (
      <div style={{ marginLeft: '20px' }}>
        {this.state.openPopupForCreateOrder &&
          <PopupForCreateOrder handleClose={this.closePopupForCreateOrder} />}
        {this.state.openPopupForShowOrder &&
          <PopupForShowOrders handleClose={this.closePopupForShowOrder} />}
        <h1>Склад</h1>
        <Button variant="contained" color="primary" onClick={() => this.openPopupForCreateOrder()}>
          Создать заказ
        </Button>
        <Button variant="contained" color="secondary" onClick={() => this.openPopupForShowOrder()} style={{ marginLeft: '20px' }}>
          Просмотр заказов
        </Button>
        <div>
          {goodsList.map(el => (
            <div>
              <h2>Вид товаров: {el.view}</h2>
              {el.list.map(list => (
                <div>
                  <h3>Категория: {list.category}</h3>
                  <TableGoods gridRows={list.goods} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
