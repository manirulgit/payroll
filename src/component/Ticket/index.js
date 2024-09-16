import Header from '../header';
import Nabvar from '../navbar';
import './Ticket.css';

function Ticket() {
    return (
        <div>
            <Header />
            <Nabvar />
            
            <section class="content">
                <div class="box box-default">
                    <div class="box-header with-border">
                        <h3 class="box-title">Add Ticket</h3>
                    </div>
                    <form>
                        <div className="box-body">
                        <div class="row">
                            <div className="col-sm-4 ">
                                <div className="form-group">
                                    <label for="exampleInputUsername">First Name <span>*</span></label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputMiddlename">Middle Name</label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputLastname">Last Name <span>*</span></label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                                <div class="form-group">
                                    <label for="Employeetype">Employee Type <span>*</span></label>
                                    <select class="form-control" >
                                        <option selected="selected">Select One</option>
                                        <option>Admin</option>
                                        <option>Supervisor</option>
                                        <option>Agent</option>
                                        <option>ScheduleAgent</option>
                                        <option>Specialist</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputLoginid">Login Id <span>*</span></label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword">Password <span>*</span></label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                            </div>

                            <div className="col-sm-4">
                                <div className="form-group">
                                    <label for="exampleInputAddress">Address 1 <span>*</span></label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputAddress">Address 2 </label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                                <div class="form-group">
                                    <label for="state">State</label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                                <div class="form-group">
                                    <label for="pin">Pin Code</label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="country">Country</label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                                <div class="form-group">
                                    <label for="InputEmail">Email Address <span>*</span></label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                                <div class="form-group">
                                    <label for="offphone">Office Phone</label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                                <div class="form-group">
                                    <label for="homephone">Home Phone</label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                                <div class="form-group">
                                    <label for="mobile">Mobile No. <span>*</span></label>
                                    <input name="myInput" class="form-control" placeholder='Enter name' />
                                </div>
                            </div>
                            </div>

                            <div class="form-group">
                                <label for="mobile"> &nbsp; &nbsp;</label>
                                <button type="button" class="btn btn-default btn-primary"><span class="glyphicon glyphicon-save"></span> Save</button>
                                <button type="button" class="btn btn-default btn-primary"><span class="glyphicon glyphicon-arrow-left"></span> Back</button>
                            </div>
                        </div>
                    </form>

                </div>
            </section>

        </div>

    );
}

export default Ticket;