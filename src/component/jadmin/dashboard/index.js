import Header from '../header';
import Nabvar from '../navbar';
import './Dashboard.css';

function Dashboard() {
    return (
        <div>
            <Header />
            <Nabvar />
            <section class="content">
                <h4>This is Dashboard</h4>
            </section>
        </div>
    );
}

export default Dashboard