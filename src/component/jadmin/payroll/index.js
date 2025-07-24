import React from 'react';
import Header from '../header';
import './payroll.css'; // Assuming

function Payroll()  {
    const [showModal, setShowModal] = React.useState(false);
    const [modalData, setModalData] = React.useState(null);

    const handlePreview = (row) => {
        setModalData(row);
        setShowModal(true);
    };

    const sampleData = [
        {
            id: 1,
            name: "John Doe",
            salary: "$3000",
            bonus: "$500",
            total: "$3500"
        },
        {
            id: 2,
            name: "Jane Smith",
            salary: "$3200",
            bonus: "$400",
            total: "$3600"
        }
    ];

    return (
        <div>
            <Header />
            <section className="payroll-section">
                <div className='payroll-header'>
                    <div className='payroll-title'>
                        <p>Payroll Management</p>
                    </div>
                </div>
            </section>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <input
                    type="date"
                    onChange={(e) => {
                        console.log('Selected date:', e.target.value);
                    }}
                />
                <button className="payroll-btn" onClick={() => {}}>Submit</button>
            </div>
            <div className="payroll-table-container">
                <table className="payroll-table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Salary</th>
                            <th>Bonus</th>
                            <th>Total Pay</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleData.map((row) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.salary}</td>
                                <td>{row.bonus}</td>
                                <td>{row.total}</td>
                                <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                                    <button className="payroll-btn" onClick={() => handlePreview(row)}>
                                        </button>
                                    
                                        
                                        {/* Success Icon SVG */}
                                        <span style={{ marginLeft: 6, verticalAlign: 'middle' }}>
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                <circle cx="8" cy="8" r="8" fill="#4BB543"/>
                                                <path d="M4 8.5L7 11.5L12 6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </span>
                                   
                                    <button className="payroll-btn" onClick={() => handlePreview(row)}>Preview</button>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showModal && (
                <div className="payroll-modal-overlay" style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className="payroll-modal" style={{
                        background: '#fff',
                        padding: '24px',
                        borderRadius: '8px',
                        minWidth: '300px'
                    }}>
                        <h2>Payroll Details</h2>
                        <p><strong>Employee ID:</strong> {modalData.id}</p>
                        <p><strong>Name:</strong> {modalData.name}</p>
                        <p><strong>Salary:</strong> {modalData.salary}</p>
                        <p><strong>Bonus:</strong> {modalData.bonus}</p>
                        <p><strong>Total Pay:</strong> {modalData.total}</p>
                        <button className="payroll-btn" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Payroll;