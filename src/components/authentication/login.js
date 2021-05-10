import Api from '../../middleware/api';
import { connect } from 'react-redux';
import ACTIONS from '../../modules/action'

const Login = (props) => {
    const handleSubmit = (event) => {
        // debugger;
        event.preventDefault();
        const form = event.target;
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
        Api.Login(data).then(res => {
            console.log(res);
            if(res.data.status === "error"){
                alert(res.data.message)
            }
            if(res.data.status === "SUCCESS"){
                localStorage.setItem('auth', true);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('name', res.data.results.name);
                props.logIn({name:res.data.results.name,
                    token:res.data.token});
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-group row">
                <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                <div className="col-md-6">
                    <input type="text" id="email_address" className="form-control" name="email" required autoFocus />
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                <div className="col-md-6">
                    <input type="password" id="password" className="form-control" name="password" required />
                </div>
            </div>
            <div className="col-md-6 offset-md-4">
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </div>
        </form>
    )
}

const mapDispatchToProps = dispatch => ({
    logIn: (payload) => dispatch(ACTIONS.logIn(payload))
})

export default connect('', mapDispatchToProps )(Login);