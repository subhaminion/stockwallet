import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input } from 'reactstrap';

const USER_API = 'https://qwilrstockwallet.herokuapp.com/api/balance/'

class UserData extends React.Component {
    constructor() {
        super();

        this.state = {
            modal: false,
            money: ''
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleMoney(ev) {
        this.setState({
            money: ev.target.value
        })
    }

    addMoneyToWallet() {
        var toAdd = parseFloat(this.props.userData.curr_balance) + parseFloat(this.state.money);
        console.log(toAdd)
        var data = {
            curr_balance: toAdd
        };
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
        return (
            <div>
                <ul className="nav navbar-nav d-inline-flex mr-auto">
                    <li className="nav-item">
                        <ul className="list-inline-mb-0">
                            <li className="list-inline-item"> <b> Current Balance:</b> {this.props.userData.curr_balance}</li>
                            <Button color="success" onClick={this.toggle}>Add Money</Button>
                            <li className="list-inline-item"> </li>
                        </ul>
                    </li>
                </ul>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Buy Stocks</ModalHeader>
                    <ModalBody>
                        <br />
                        <InputGroup>
                            <Input type="number" placeholder="Amount" value={this.state.money} onChange={this.handleMoney.bind(this)}/>
                            <InputGroupAddon addonType="append">
                                <Button color="success" onClick={this.addMoneyToWallet.bind(this)}>Add!</Button>
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

export default UserData;