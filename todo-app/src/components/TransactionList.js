import React, { Component } from 'react'
import TransactionForm from './TransactionForm'

class TransactionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: -1,
            list: this.returnList()
        }
    }

    returnList = () => {
        if (localStorage.getItem('transaction') == null)
            localStorage.setItem('transaction', JSON.stringify([]));
        return JSON.parse(localStorage.getItem('transaction'))
    }

    onAddOrEdit = (data) => {
        var list = this.returnList();
        if (this.state.currentIndex == -1) {
            list.push(data);
        }
        else {
            list[this.state.currentIndex] = data;
        }

        localStorage.setItem('transaction', JSON.stringify(list));
        this.setState({ list: list, currentIndex: -1 });

    }

    handleEdit = index => {
        this.setState({ currentIndex: index });
    }

    handleDelete = index => {
        var list = this.returnList();
        list.splice(index, 1);
        localStorage.setItem('transaction', JSON.stringify(list));
        this.setState({ list: list, currentIndex: -1 });
    }

    render() {
        return (
            <div>
                <TransactionForm onAddOrEdit={this.onAddOrEdit} currentIndex={this.state.currentIndex} list={this.state.list}></TransactionForm>
                <hr />
                <p>List of Transactions</p>
                <table>
                    <tbody>
                        {
                            this.state.list.map((item, index) => {
                                return <tr key={index}>
                                    <td>{item.bAccountNo}</td>
                                    <td>{item.bName}</td>
                                    <td>{item.amount}</td>
                                    <td><button onClick={() => this.handleEdit(index)}>Edit</button></td>
                                    <td><button onClick={() => this.handleDelete(index)}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TransactionList;
