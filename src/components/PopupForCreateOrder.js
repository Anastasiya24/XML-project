import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
    menu: {
        width: 300,
    },
});

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

const shops = ['г.Могилёв, ул.Каштановая, 43а', 'г.Минск, ул.Подгорная, 12'];

class PopupForCreateOrder extends React.Component {
    state = {
        shop: '',
        day: new Date(),
        good: "",
        count: null
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    add = (el, newListGoogs) => {
        localStorage.setItem(`${newListGoogs.length + 1}shop`, el.shop);
        localStorage.setItem(`${newListGoogs.length + 1}day`, el.day);
        localStorage.setItem(`${newListGoogs.length + 1}good`, el.goods);
        localStorage.setItem(`${newListGoogs.length + 1}price`, el.price);
    };

    saveOrder = (newListGoogs) => {
        this.props.handleClose();
        let result = {
            shop: this.state.shop,
            goods: this.state.good.name,
            day: this.state.day,
            price: +(this.state.count) * (+this.state.good.price),
        };
        this.add(result, newListGoogs);
    };

    render() {
        const { classes, onlyGoodsList } = this.props;
        let newListGoogs = [];
        let un = onlyGoodsList[0];
        un.map(el => el.map(g => newListGoogs.push(g)))

        return (
            <div>
                <Dialog
                    onClose={this.props.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={true}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.props.handleClose}>
                        Создать заказ
                    </DialogTitle>
                    {newListGoogs && <DialogContent>
                        <TextField
                            select
                            label="Магазин"
                            className={classes.textField}
                            value={this.state.shop}
                            onChange={this.handleChange('shop')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                        >
                            {shops.map(el => (
                                <MenuItem key={el} value={el}>
                                    {el}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br />
                        <TextField
                            name="day"
                            label="Дата"
                            type="date"
                            value={this.state.day}
                            onChange={this.handleChange('day')}
                            className={classes.textField}
                        />
                        <br />
                        <TextField
                            select
                            label="Товар"
                            className={classes.textField}
                            value={this.state.good}
                            onChange={this.handleChange('good')}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                        >
                            {newListGoogs.map(el => (
                                <MenuItem key={el.good} value={el}>
                                    {el.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <br />
                        <TextField
                            name="count"
                            label="Количество"
                            type="number"
                            value={this.state.count}
                            onChange={this.handleChange('count')}
                            className={classes.textField}
                        />
                    </DialogContent>}
                    <DialogActions>
                        <Button onClick={() => this.saveOrder(newListGoogs)} variant="contained" color="primary">
                            Сохранить заказ
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(PopupForCreateOrder);
