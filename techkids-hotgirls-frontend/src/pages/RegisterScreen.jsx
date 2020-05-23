import React from 'react';

class RegisterScreen extends React.Component{
    state = {
        email: '',
        fullName: '',
        password: '',
        errMessage: '',
    };

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value,
        });
    };
    handleFullnameChange = (event) => {
        this.setState({
            fullName: event.target.value,
        });
    };
    

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value,
        });
    };
    registerSuccess = () => {
        alert('Register Success')
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3001/users/register',{
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                fullName: this.state.fullName,
                password: this.state.password,
            }),
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(!data.success){
                this.setState({
                    errMessage: data.message,
                });
            } else {
                // redirect user
                window.location.href = '/login';
            } 
        })
        .catch((error) => {
            console.log(error);
            this.setState({
                errMessage: error.message,
            });
        })
    };
    render() {
        return(
            <div className='row'>
               <div className='col-3'></div>
               <div className='col-6 mt-5 pt-4'>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input 
                            value= {this.state.email}
                            onChange= {this.handleEmailChange}
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Full Name</label>
                        <input 
                            value= {this.state.fullName}
                            onChange= {this.handleFullnameChange}
                            type="text" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter full name"
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input 
                            value= {this.state.password}
                            onChange= {this.handlePasswordChange}
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder="Password"
                            />
                    </div>
                    {this.state.errMessage ? (
                      <div class="alert alert-danger" role="alert">
                        {this.state.errMessage}
                      </div>
                    ) : null}
                
                    <button type="submit" class="btn btn-primary" onClick ={this.registerSuccess}>Register</button>
                    </form>
               </div>
               <div className='col-3'></div>
           </div>
        );
    }
}

export default RegisterScreen;