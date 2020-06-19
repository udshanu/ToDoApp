import React, { Component } from 'react'
import TransactionForm from './TransactionForm'
import { connect } from "react-redux";
import * as actions from "../actions/TransactionActions";
import { bindActionCreators } from "redux";

//----------------REDUX---------------------
//Redux is a state management package.
//There is a redux store.
//Data inside the redux store can be access from any react component.
//Basically in redux, there are action, reducer and store.
//Action is an object which represent an operation.
//Reducer based on action
//Reducer defines how to update current store data.
//Inside the store save data which can be access through out the application.

//How Redux works
// Component => call "dispatch(action)" function => reach to "reducer" => Component

//How to work with redux
//Install redux and react-redux packages
//First need to create Redux store

class TransactionList extends Component {
    constructor(props) {
        super(props);
    }

    handleEdit = index => {
        this.props.updateTransactionIndex(index);
    }

    handleDelete = index => {
        this.props.deleteTransaction(index);
    }

    render() {
        return (
            <div>
                <TransactionForm></TransactionForm>
                <hr />
                <p>List of Transactions</p>
                <table>
                    <tbody>
                        {
                            this.props.list.map((item, index) => {
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

const mapStateToProps = state => {
    return {
        list: state.list
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        deleteTransaction: actions.Delete,
        updateTransactionIndex: actions.UpdateIndex
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
