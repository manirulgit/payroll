import Header from '../header';
import Nabvar from '../navbar';
import './Login.css';

function handleSubmit(event) {
    console.log("Login btn click");
    alert("ccc");

}

function Login() {
    const navigateToDashboard = () => {
        window.location.href = "/dashboard";
    };

    return (
        <div>
            <section
                className="content"
                style={{
                    maxWidth: "400px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "80vh"
                }}
            >
                <div className="row" style={{ width: "100%" }}>
                    <div className="login-box" style={{ width: "100%" }}>
                        <div className="login-box-body">
                            <form>
                                <div className="form-group has-feedback">
                                    <input name="myInput" className="form-control" placeholder='Enter User Id' />
                                    <span className="glyphicon glyphicon-user form-control-feedback"></span>
                                </div>
                                <div className="form-group has-feedback">
                                    <input name="myInput" className="form-control" placeholder='Enter Password' />
                                    <span className="glyphicon glyphicon-log-in form-control-feedback"></span>
                                </div>
                                <div className="form-group has-feedback" style={{ display: "flex", justifyContent: "center" }}>
                                    <input
                                        type="button"
                                        value="Log In"
                                        id="goButton"
                                        className="btn btn-primary btn-block btn-flat"
                                        style={{ maxWidth: "150px" }}
                                        onClick={navigateToDashboard}
                                    />
                                </div>
                            </form>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;