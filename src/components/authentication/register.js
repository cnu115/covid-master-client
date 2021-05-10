import { useEffect, useState } from 'react';
import Api from '../../middleware/api';
import {connect} from 'react-redux';
import ACTIONS from '../../modules/action';
const Register = (props) => {
    const [errors, updateErros] = useState([]);
    const [successMessage, updateSuccessMessage] = useState('');

    useEffect(()=>{
        updateSuccessMessage('')
    },[])
    
    const handleSubmit = (event) => {
        // debugger;
        event.preventDefault();
        const form = event.target;
        console.log(form)
        const email = form.email.value;
        const name = form.name.value;
        const password = form.password.value;
        const passwordConfirmation = form.passwordConfirmation.value;
        // console.log(formData)
        const data = {
            email: email,
            name: name,
            password: password,
            passwordConfirmation: passwordConfirmation,
        }
        updateErros([]);
        Api.Registration(data).then(res => {
            console.log(res);
            console.log(props)
            if(res.data.status === "SUCCESS"){
                // sessionStorage.setItem('auth', true);
                if(res.data){
                    updateSuccessMessage(res.data.message);
                    setTimeout(() => {
                        props.loginRegiToggle(true)
                    },2000);
                }
            }
        }).catch(err => {
            console.log(err.response);
            if(err.response){
                updateErros(err.response.data);
            }
        })
    }
    const readErrors = () => {
        if(errors.length === 0) return false;
        return errors.map((error,index) => {
            return <div key={index} className="alert alert-danger" role="alert">
                {error.msg}
          </div>
        })
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            {readErrors()}
            {successMessage && <div className="alert alert-success" role="alert">
                {successMessage}
                </div>
            }
            <div className="form-group row">
                <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>
                <div className="col-md-6">
                    <input type="text" id="name" className="form-control" name="name" required autoFocus />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                <div className="col-md-6">
                    <input type="text" id="email_address" className="form-control" name="email" required />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                <div className="col-md-6">
                    <input type="password" id="password" className="form-control" name="password" required />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="passwordConfirmation" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                <div className="col-md-6">
                    <input type="password" id="passwordConfirmation" className="form-control" name="passwordConfirmation" required />
                </div>
            </div>
            <div className="col-md-6 offset-md-4">
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </div>
        </form>
    )
}
const mapDispatchToProps = dispatch => ({
    loginRegiToggle: (payload) => dispatch(ACTIONS.loginRegiToggle(payload))
});

export default connect('',mapDispatchToProps)(Register);