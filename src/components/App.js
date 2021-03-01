import { Component } from "react"
import React from 'react';
import axios from 'axios';
import MyForm from './MyForm';
import CustomerList from './CustomerList';
import Loader from './Loader';
import Error from './Error';
import '../app.css';

class App extends Component {
    state = {
        customer: {},
        customers: [],
        loader: false,
        fetchError: false,
        url: 'http://laravel-rest-api.test/api/customers'
    };

    getCustomers = async () => {
        this.setState({ loader: true });
        const customers = await axios.get(this.state.url)
            .catch((error) => {
                // Error
                if (error.response) {
                    this.setState({ error: true });
                    console.log('Error Response', error.response);
                } else if (error.request) {
                    this.setState({ error: true });
                    console.log(error.request);
                } else {
                    this.setState({ error: true });
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        if (!this.state.error) {
            this.setState({
                customers: customers.data,
                loader: false
            });
        } else {
            this.setState({
                loader: false
            });
        }
    };

    deleteCustomer = async id => {
        this.setState({ loader: true });
        await axios.delete(`${this.state.url}/${id}`)
        this.setState({ loader: false });

        this.getCustomers();
    };

    createCustomer = async data => {
        this.setState({ loader: true });
        await axios.post(this.state.url, {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
        });
        this.setState({ loader: false });

        this.getCustomers();
    };

    editCustomer = async data => {
        this.setState({ customer: {}, loader: true });
        await axios.put(`${this.state.url}/${data.id}`, {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
        })
        this.setState({ loader: false });

        this.getCustomers();
    }

    componentDidMount() {
        this.getCustomers();
    }

    onDelete = id => {
        this.deleteCustomer(id);
    };

    onEdit = data => {
        this.setState({ customer: data });
    };

    onFormSubmit = data => {
        if (data.isEdit) {
            this.editCustomer(data);
        } else {
            this.createCustomer(data);
        }
    };

    render() {
        return (
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" className="header item">
                            React JS CRUD Laravel API
                        </a>
                    </div>
                </div>

                <div className="ui main container">
                    <MyForm 
                        customer={this.state.customer} 
                        onFormSubmit={this.onFormSubmit}
                    />
                    {this.state.error ? <Error /> : ''}
                    {this.state.loader 
                        ? <Loader /> 
                        : <CustomerList 
                            customers={this.state.customers} 
                            onEdit={this.onEdit}
                            onDelete={this.onDelete}

                        />
                    }
                </div>
            </div>
        );
    }
}

export default App;