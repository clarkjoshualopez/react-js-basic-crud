import React, { Component } from 'react';

class MyForm extends Component {
    state = {
        form: {
            first_name: '',
            last_name: '',
            email: '',
            isEdit: false
        },
        btnName: 'Save',
        btnClass: 'ui primary button submit-btn'
    }

    isEmpty(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props && !this.isEmpty(this.props.customer)) {
            // console.log('Update', prevProps, this.props)
            this.setState({
                form: { ...this.props.customer, isEdit: true },
                btnName: 'Update',
                btnClass: 'ui orange button submit-btn'
            })
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        let form = this.state.form;

        form[name] = value;
        this.setState({ form });
    }

    onFormSubmit = event => {
        event.preventDefault();
        this.setState({
            btnClass: this.state.form.isEdit 
                ? 'ui orange loading button submit-btn'
                : 'ui primary loading button submit-btn'
        });

        if (this.formValidation()) {
            this.props.onFormSubmit(this.state.form)
        }

        setTimeout(() => {
            this.setState({
                btnName: 'Save',
                btnClass: 'ui primary button submit-btn'
            });
        }, 150)
        this.clearFormFields()
    }

    formValidation = () => {
        if (document.getElementsByName('first_name')[0].value === '') {
            alert('Enter First Name');
            return false;
        }

        if (document.getElementsByName('last_name')[0].value === '') {
            alert('Enter Last Name');
            return false;
        }

        if (document.getElementsByName('email')[0].value === '') {
            alert('Enter Email');
            return false;
        }

        return true;
    }

    clearFormFields = () => {
        this.setState({
            form: { first_name: '', last_name: '', email: '', isEdit: false }
        });

        document.querySelector('.form').reset();
    }

    render() {
        return (
            <form className="ui form">
                <div className="fields">
                    <div className="four wide field">
                        <label>First Name</label>
                        <input 
                            type="text" 
                            name="first_name" 
                            placeholder="First Name"
                            onChange={this.handleChange}
                            value={this.state.form.first_name}

                        />
                    </div>

                    <div className="four wide field">
                        <label>Last Name</label>
                        <input 
                            type="text" 
                            name="last_name" 
                            placeholder="Last Name" 
                            onChange={this.handleChange}
                            value={this.state.form.last_name}

                        />
                    </div>

                    <div className="four wide field">
                        <label>E-mail</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="email@email.test"
                            onChange={this.handleChange} 
                            value={this.state.form.email}

                        />
                    </div>

                    <div className="four wide field">
                        <button 
                            className={this.state.btnClass}
                            onClick={this.onFormSubmit}
                        >
                            {this.state.btnName}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default MyForm;