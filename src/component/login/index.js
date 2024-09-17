import Header from '../header';
import Nabvar from '../navbar';
import './Login.css';

function handleSubmit(event) {
   console.log("Login btn click");
   alert("ccc");
    
  }

function Login() {
    return (
        <div>
            <Header />
            <Nabvar />
            <section class="content">
                <div class="row">
                    <div class="login-box">
                        <div class="login-box-body">
                            <form onSubmit={handleSubmit} >
                                <div class="form-group has-feedback">
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                    <span class="glyphicon glyphicon-user form-control-feedback"></span>
                                </div>
                                <div class="form-group has-feedback">
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                    <span class="glyphicon glyphicon-log-in form-control-feedback"></span>
                                </div>

                                <div class="form-group has-feedback">
                                    <input type="button" value="Log In" id="goButton" class="btn btn-primary btn-block btn-flat" />
                                </div>
                            </form>

                            <div class="clearfix"></div>
                        </div>

                    </div>
                </div>
            </section>

        </div>

    );
}

export default Login;