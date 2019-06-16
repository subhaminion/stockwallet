import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input } from 'reactstrap';



const STOCK_API = 'https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=MSFT,FB,AAPL,GOOG,AMZN&apikey=0PE7ORJNKEJS3KOL';
const USER_API = 'https://qwilrstockwallet.herokuapp.com/api/balance/'


class StockList extends React.Component {
    constructor() {
        super();

        this.state = {
            stockData: [],
            metaData: [],
            modal: false,
            currentOpenStockPrice: '',
            stockNumber: 0
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    fetchStockList() {
        fetch(STOCK_API)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    stockData: json['Stock Quotes'],
                    metaData: json['Meta Data']
                });
            });
    }

    componentWillMount() {
        this.fetchStockList()
    }

    setCurrentOpenStockPrice = price => {
        this.setState({
            currentOpenStockPrice: price
        })
    }

    handleStockNumber = ev => {
        this.setState({
            stockNumber: ev.target.value
        })
    }

    buyShare() {
        var totalAmount = parseFloat(this.state.currentOpenStockPrice) * parseInt(this.state.stockNumber);
        var updatedWalletAmount = this.props.userData.curr_balance - totalAmount;
        var data = {
            curr_balance: updatedWalletAmount
        }
        if (updatedWalletAmount < 0) {
            alert('Oops looks like you are running out of Cash');
            return;
        }
        fetch(USER_API + '1/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                this.props.fetchUserData();
                this.setState({
                    modal: false
                })
        });
    }

    render() {
        // console.log(this.state.metaData)
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Latest Source</th>
                            <th>Latest Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {/* {Object.keys(this.state.stockData).map((val, index) => { console.log(this.state.stockData[val]) })} */}
                        {Object.keys(this.state.stockData).map((item, i) => (
                            <tr key={i}>
                                <td>{this.state.stockData[item]['1. symbol']}</td>
                                <td>{this.state.metaData["1. Information"]}</td>
                                <td>{this.state.stockData[item]["2. price"]}</td>
                                <td><Button onClick={(event) => { this.toggle(); this.setCurrentOpenStockPrice(this.state.stockData[item]["2. price"]) }} color="success">Buy</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Buy Stocks</ModalHeader>
                    <ModalBody>
                        <br />
                        <InputGroup>
                            <Input type="number" placeholder="Enter the Number of stocks" value={this.state.stockNumber} onChange={this.handleStockNumber.bind(this)} />
                            <InputGroupAddon addonType="append">
                                <Button color="success" onClick={this.buyShare.bind(this)}>Buy!</Button>
                            </InputGroupAddon>
                        </InputGroup>

                    </ModalBody>
                    <br />
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default StockList;