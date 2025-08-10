import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import Header from '../header';
import Nabvar from '../navbar';
import './Employee.css';
import EmployeeService from '../../../services/employeeService';

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [employeeTypeFilter, setEmployeeTypeFilter] = useState('');
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [newEmployeeData, setNewEmployeeData] = useState({
        name: '',
        loginId: '',
        email: '',
        mobile: '',
        type: 'Employee',
        department: '',
        designation: '',
        salary: '',
        joinDate: '',
        address: '',
        emergencyContact: '',
        bloodGroup: '',
        dateOfBirth: '',
        gender: 'Male',
        maritalStatus: 'Single',
        nationality: 'Indian',
        panNumber: '',
        aadharNumber: '',
        bankAccount: '',
        ifscCode: '',
        status: 'Active'
    });

    // API function to fetch employee data from server
    const fetchEmployees = async (page, size, search, sort, direction, typeFilter) => {
        setLoading(true);
        
        try {
            // Call API service
            const result = await EmployeeService.getEmployees({
                page,
                size,
                search,
                sort,
                direction,
                typeFilter
            });
            

            if (result.success) {
                // Update state with API response
                //console.log('API Response:', result.data);
                
                // Check if result.data is an array directly or has employees property
                let employeeArray = [];
                if (Array.isArray(result.data)) {
                    // If result.data is directly an array
                    employeeArray = result.data;
                } else if (result.data && Array.isArray(result.data.employees)) {
                    // If result.data has employees property
                    employeeArray = result.data.employees;
                } else if (result.data && result.data.data && Array.isArray(result.data.data)) {
                    // If nested under data property
                    employeeArray = result.data.data;
                } else {
                    // Fallback: try to extract array from any property
                    employeeArray = result.data || [];
                }
                
                //console.log('Employee Array:', employeeArray);
                
                // Validate that each employee has required fields, add defaults if missing
                const validatedEmployees = employeeArray.map((emp, index) => ({
                    id: emp.id || emp.employee_id || emp.emp_id || (index + 1),
                    unique_id : emp.unique_id  || 'N/A',
                    name: emp.emp_name  || 'N/A',
                    address: emp.address  || 'N/A',
                    loginId: emp.loginId || emp.login_id || emp.username || emp.email || 'N/A',
                    type: emp.stake_type || emp.employee_type || emp.role || 'Employee',
                    email: emp.email || emp.email_address || 'N/A',
                    mobile: emp.mobile || emp.phone || emp.contact || emp.mobile_number || 'N/A',
                    department: emp.department || emp.dept || emp.division || 'N/A',
                    status: emp.status || emp.emp_status || emp.active ? 'Active' : 'Inactive',
                    joinDate: emp.joinDate || emp.join_date || emp.date_of_joining || 'N/A',
                    designation: emp.designation || emp.position || emp.job_title || 'N/A',
                    salary: emp.salary || emp.basic_salary || emp.monthly_salary || 0
                }));
                
                console.log('result.data.total_count', result.data.total_count);
                setEmployees(validatedEmployees);
                
                // Set total records - use array length if no totalRecords provided
                const totalCount = result.data.total_count;
                                
                setTotalRecords(totalCount);
            } else {
                throw new Error(result.error);
            }
            
        } catch (error) {
            console.error('Error fetching employees:', error);
            
            // Clear employees data on API failure
            setEmployees([]);
            setTotalRecords(0);
            
            // Show error notification to user
            alert('Unable to connect to server. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees(currentPage, pageSize, searchTerm, sortField, sortDirection, employeeTypeFilter);
    }, [currentPage, pageSize, searchTerm, sortField, sortDirection, employeeTypeFilter]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size) => {
        setPageSize(parseInt(size));
        setCurrentPage(1);
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedEmployees(employees.map(emp => emp.id));
        } else {
            setSelectedEmployees([]);
        }
    };

    const handleSelectEmployee = (employeeId) => {
        setSelectedEmployees(prev => 
            prev.includes(employeeId) 
                ? prev.filter(id => id !== employeeId)
                : [...prev, employeeId]
        );
    };

    const totalPages = Math.ceil(totalRecords / pageSize);
    const startRecord = (currentPage - 1) * pageSize + 1;
    const endRecord = Math.min(currentPage * pageSize, totalRecords);

    const getStatusBadge = (status) => {
        const badgeClass = status === 'Active' ? 'badge-success' : 'badge-danger';
        return <span className={`badge ${badgeClass}`}>{status}</span>;
    };

    const getTypeBadge = (type) => {
        let badgeClass = 'badge-primary';
        if (type === 'Admin') badgeClass = 'badge-danger';
        else if (type === 'Manager') badgeClass = 'badge-warning';
        else badgeClass = 'badge-success';
        
        return <span className={`badge ${badgeClass}`}>{type}</span>;
    };

    // Add Employee Modal Functions
    const handleAddEmployeeInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployeeData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveNewEmployee = async () => {
        try {
            // Call API service to create employee
            const result = await EmployeeService.createEmployee(newEmployeeData);

            if (result.success) {
                // Show success message with API response
                alert(`Employee ${result.data.name} (ID: ${result.data.id}) created successfully!`);
            } else {
                throw new Error(result.error);
            }
            
        } catch (error) {
            console.error('Error creating employee:', error);
            
            // Show error message
            alert('Unable to create employee. Please check your connection and try again.');
        } finally {
            // Reset form and close modal
            setNewEmployeeData({
                name: '',
                loginId: '',
                email: '',
                mobile: '',
                type: 'Employee',
                department: '',
                designation: '',
                salary: '',
                joinDate: '',
                address: '',
                emergencyContact: '',
                bloodGroup: '',
                dateOfBirth: '',
                gender: 'Male',
                maritalStatus: 'Single',
                nationality: 'Indian',
                panNumber: '',
                aadharNumber: '',
                bankAccount: '',
                ifscCode: '',
                status: 'Active'
            });
            setShowAddEmployeeModal(false);

            // Refresh employees list
            fetchEmployees(currentPage, pageSize, searchTerm, sortField, sortDirection, employeeTypeFilter);
        }
    };

    const handleCloseModal = () => {
        setShowAddEmployeeModal(false);
        setNewEmployeeData({
            name: '',
            loginId: '',
            email: '',
            mobile: '',
            type: 'Employee',
            department: '',
            designation: '',
            salary: '',
            joinDate: '',
            address: '',
            emergencyContact: '',
            bloodGroup: '',
            dateOfBirth: '',
            gender: 'Male',
            maritalStatus: 'Single',
            nationality: 'Indian',
            panNumber: '',
            aadharNumber: '',
            bankAccount: '',
            ifscCode: '',
            status: 'Active'
        });
    };
    return (
        <div className="employee-management">
            <Header />
            
            {/* Enhanced Controls Section */}
            <div className="table-controls">
                <div className="container-fluid">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-4">
                            
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="fas fa-search"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Search by name, email, or login ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-2">
                           
                            <select 
                                className="form-select"
                                value={employeeTypeFilter}
                                onChange={(e) => setEmployeeTypeFilter(e.target.value)}
                            >
                                <option value="">All Types</option>
                                <option value="2">Admin</option>
                                <option value="4">Employee</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                           
                            <select 
                                className="form-select"
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(e.target.value)}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            
                            <div className="bulk-actions">
                                <div className="btn-group" role="group">
                                    <button type="button" className="btn btn-outline-primary">
                                        <i className="fas fa-edit me-1"></i> Edit
                                    </button>
                                    {/* <button type="button" className="btn btn-outline-success">
                                        <i className="fas fa-check me-1"></i> Activate
                                    </button> */}
                                    <button type="button" className="btn btn-outline-danger">
                                        <i className="fas fa-trash me-1"></i> Delete
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-primary add-employee-btn"
                                        onClick={() => setShowAddEmployeeModal(true)}
                                    >
                                        <i className="fas fa-user-plus me-2"></i>
                                        Add Employee
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* Enhanced Table Section */}
            <div className="table-section">
                {/* <div className="table-header">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="table-info">
                                    Employee Records ({totalRecords} total)
                                </div>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-outline-secondary btn-sm">
                                    <i className="fas fa-download me-2"></i>
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="table-wrapper">
                    {loading && (
                        <div className="loading-overlay">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                    
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th style={{width: '50px'}}>
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input"
                                        onChange={handleSelectAll}
                                        checked={selectedEmployees.length === employees.length && employees.length > 0}
                                    />
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('id')}
                                    style={{cursor: 'pointer'}}
                                >
                                    ID {sortField === 'id' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('name')}
                                    style={{cursor: 'pointer'}}
                                >
                                    Name {sortField === 'name' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('loginId')}
                                    style={{cursor: 'pointer'}}
                                >
                                    Login ID {sortField === 'loginId' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('type')}
                                    style={{cursor: 'pointer'}}
                                >
                                    Type {sortField === 'type' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('email')}
                                    style={{cursor: 'pointer'}}
                                >
                                    Email {sortField === 'email' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('mobile')}
                                    style={{cursor: 'pointer'}}
                                >
                                    Mobile {sortField === 'mobile' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('department')}
                                    style={{cursor: 'pointer'}}
                                >
                                    Department {sortField === 'department' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                <th style={{width: '150px'}}>Address</th>
                                <th 
                                    className="sortable" 
                                    onClick={() => handleSort('status')}
                                    style={{cursor: 'pointer'}}
                                >
                                    Status {sortField === 'status' && (
                                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                                    )}
                                </th>
                                
                                <th style={{width: '150px'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id} className={selectedEmployees.includes(employee.id) ? 'table-active' : ''}>
                                    <td>
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input"
                                            checked={selectedEmployees.includes(employee.id)}
                                            onChange={() => handleSelectEmployee(employee.id)}
                                        />
                                    </td>
                                    <td>{employee.unique_id}</td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="avatar me-3">
                                                {employee.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <strong>{employee.name}</strong>
                                        </div>
                                    </td>
                                    <td>{employee.loginId}</td>
                                    <td>{getTypeBadge(employee.type)}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.mobile}</td>
                                    <td>{employee.department}</td>
                                    <td>{employee.address}</td>
                                    <td>{getStatusBadge(employee.status)}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn btn-sm btn-outline-primary me-1" title="View">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-success me-1" title="Edit">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="btn btn-sm btn-outline-danger" title="Delete">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {employees.length === 0 && !loading && (
                        <div className="text-center py-5">
                            <i className="fas fa-users fa-3x text-muted mb-3"></i>
                            <h5 className="text-muted">No employees found</h5>
                            <p className="text-muted">Try adjusting your search criteria</p>
                        </div>
                    )}
                </div>

                {/* Enhanced Pagination */}
                <div className="pagination-section">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col">
                                <div className="pagination-info">
                                    Showing {startRecord} to {endRecord} of {totalRecords} entries
                                </div>
                            </div>
                            <div className="col-auto">
                                <nav>
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                            >
                                                <i className="fas fa-chevron-left"></i>
                                            </button>
                                        </li>
                                        
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                                            let pageNumber;
                                            if (totalPages <= 5) {
                                                pageNumber = index + 1;
                                            } else if (currentPage <= 3) {
                                                pageNumber = index + 1;
                                            } else if (currentPage >= totalPages - 2) {
                                                pageNumber = totalPages - 4 + index;
                                            } else {
                                                pageNumber = currentPage - 2 + index;
                                            }
                                            
                                            return (
                                                <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                                    <button 
                                                        className="page-link" 
                                                        onClick={() => handlePageChange(pageNumber)}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                </li>
                                            );
                                        })}
                                        
                                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                            <button 
                                                className="page-link" 
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                            >
                                                <i className="fas fa-chevron-right"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Employee Modal */}
            {showAddEmployeeModal && (
                <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
                    <div className="modal-dialog modal-xl modal-dialog-centered" style={{maxWidth: '90%', width: '1200px'}}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="fas fa-user-plus me-2 text-white"></i>
                                    Add New Employee
                                </h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        {/* Personal Information Section */}
                                        <div className="col-12 mb-4">
                                            <h6 className="section-title">
                                                <i className="fas fa-user me-2"></i>
                                                Personal Information
                                            </h6>
                                        </div>

                                        {/* Full Name and Login ID */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-user me-2"></i>
                                                Full Name *
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="name"
                                                value={newEmployeeData.name}
                                                onChange={handleAddEmployeeInputChange}
                                                placeholder="Enter full name..."
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-id-card me-2"></i>
                                                Login ID *
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="loginId"
                                                value={newEmployeeData.loginId}
                                                onChange={handleAddEmployeeInputChange}
                                                placeholder="Enter login ID..."
                                                required
                                            />
                                        </div>

                                        {/* Email and Mobile */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-envelope me-2"></i>
                                                Email Address *
                                            </label>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                name="email"
                                                value={newEmployeeData.email}
                                                onChange={handleAddEmployeeInputChange}
                                                placeholder="Enter email address..."
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-phone me-2"></i>
                                                Mobile Number *
                                            </label>
                                            <input 
                                                type="tel" 
                                                className="form-control" 
                                                name="mobile"
                                                value={newEmployeeData.mobile}
                                                onChange={handleAddEmployeeInputChange}
                                                placeholder="Enter mobile number..."
                                                required
                                            />
                                        </div>

                                        {/* Date of Birth and Gender */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-birthday-cake me-2"></i>
                                                Date of Birth
                                            </label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                name="dateOfBirth"
                                                value={newEmployeeData.dateOfBirth}
                                                onChange={handleAddEmployeeInputChange}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-venus-mars me-2"></i>
                                                Gender
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="gender"
                                                value={newEmployeeData.gender}
                                                onChange={handleAddEmployeeInputChange}
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        {/* Marital Status and Blood Group */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-heart me-2"></i>
                                                Marital Status
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="maritalStatus"
                                                value={newEmployeeData.maritalStatus}
                                                onChange={handleAddEmployeeInputChange}
                                            >
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                                <option value="Divorced">Divorced</option>
                                                <option value="Widowed">Widowed</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-tint me-2"></i>
                                                Blood Group
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="bloodGroup"
                                                value={newEmployeeData.bloodGroup}
                                                onChange={handleAddEmployeeInputChange}
                                            >
                                                <option value="">Select Blood Group</option>
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="O+">O+</option>
                                                <option value="O-">O-</option>
                                            </select>
                                        </div>

                                        {/* Employment Information Section */}
                                        <div className="col-12 mb-4 mt-4">
                                            <h6 className="section-title">
                                                <i className="fas fa-briefcase me-2"></i>
                                                Employment Information
                                            </h6>
                                        </div>

                                        {/* Employee Type and Department */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-user-cog me-2"></i>
                                                Employee Type *
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="type"
                                                value={newEmployeeData.type}
                                                onChange={handleAddEmployeeInputChange}
                                                required
                                            >
                                                <option value="Employee">Employee</option>
                                                <option value="Manager">Manager</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-building me-2"></i>
                                                Department *
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="department"
                                                value={newEmployeeData.department}
                                                onChange={handleAddEmployeeInputChange}
                                                required
                                            >
                                                <option value="">Select Department</option>
                                                <option value="IT">IT</option>
                                                <option value="HR">HR</option>
                                                <option value="Finance">Finance</option>
                                                <option value="Marketing">Marketing</option>
                                                <option value="Sales">Sales</option>
                                                <option value="Operations">Operations</option>
                                            </select>
                                        </div>

                                        {/* Designation and Salary */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-id-badge me-2"></i>
                                                Designation *
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="designation"
                                                value={newEmployeeData.designation}
                                                onChange={handleAddEmployeeInputChange}
                                                placeholder="Enter designation..."
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-money-bill-wave me-2"></i>
                                                Salary
                                            </label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                name="salary"
                                                value={newEmployeeData.salary}
                                                onChange={handleAddEmployeeInputChange}
                                                placeholder="Enter salary amount..."
                                            />
                                        </div>

                                        {/* Join Date and Status */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-calendar-alt me-2"></i>
                                                Join Date *
                                            </label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                name="joinDate"
                                                value={newEmployeeData.joinDate}
                                                onChange={handleAddEmployeeInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-toggle-on me-2"></i>
                                                Status
                                            </label>
                                            <select 
                                                className="form-select" 
                                                name="status"
                                                value={newEmployeeData.status}
                                                onChange={handleAddEmployeeInputChange}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>

                                        {/* Contact Information Section */}
                                        <div className="col-12 mb-4 mt-4">
                                            <h6 className="section-title">
                                                <i className="fas fa-address-book me-2"></i>
                                                Contact Information
                                            </h6>
                                        </div>

                                        {/* Address */}
                                        <div className="col-md-12 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-map-marker-alt me-2"></i>
                                                Address
                                            </label>
                                            <textarea 
                                                className="form-control" 
                                                name="address"
                                                value={newEmployeeData.address}
                                                onChange={handleAddEmployeeInputChange}
                                                rows="3"
                                                placeholder="Enter complete address..."
                                            ></textarea>
                                        </div>

                                        {/* Emergency Contact and Nationality */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-phone-alt me-2"></i>
                                                Emergency Contact
                                            </label>
                                            <input 
                                                type="tel" 
                                                className="form-control" 
                                                name="emergencyContact"
                                                value={newEmployeeData.emergencyContact}
                                                onChange={handleAddEmployeeInputChange}
                                                placeholder="Enter emergency contact number..."
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-flag me-2"></i>
                                                Nationality
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="nationality"
                                                value={newEmployeeData.nationality}
                                                onChange={handleAddEmployeeInputChange}
                                                placeholder="Enter nationality..."
                                            />
                                        </div>

                                        {/* Identity Information Section */}
                                        <div className="col-12 mb-4 mt-4">
                                            <h6 className="section-title">
                                                <i className="fas fa-id-card-alt me-2"></i>
                                                Identity & Banking Information
                                            </h6>
                                        </div>

                                        {/* PAN and Aadhar */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-credit-card me-2"></i>
                                                PAN Number
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="panNumber"
                                                value={newEmployeeData.panNumber}
                                                onChange={handleAddEmployeeInputChange}
                                                placeholder="Enter PAN number..."
                                                style={{textTransform: 'uppercase'}}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-id-card me-2"></i>
                                                Aadhar Number
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="aadharNumber"
                                                value={newEmployeeData.aadharNumber}
                                                onChange={handleAddEmployeeInputChange}
                                                placeholder="Enter Aadhar number..."
                                            />
                                        </div>

                                        {/* Bank Account and IFSC Code */}
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-university me-2"></i>
                                                Bank Account Number
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="bankAccount"
                                                value={newEmployeeData.bankAccount}
                                                onChange={handleAddEmployeeInputChange}
                                                placeholder="Enter bank account number..."
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">
                                                <i className="fas fa-code me-2"></i>
                                                IFSC Code
                                            </label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                name="ifscCode"
                                                value={newEmployeeData.ifscCode}
                                                onChange={handleAddEmployeeInputChange}
                                                placeholder="Enter IFSC code..."
                                                style={{textTransform: 'uppercase'}}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    <i className="fas fa-times me-2"></i>
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-success"
                                    onClick={handleSaveNewEmployee}
                                    disabled={!newEmployeeData.name || !newEmployeeData.loginId || !newEmployeeData.email || !newEmployeeData.mobile}
                                >
                                    <i className="fas fa-user-plus me-2"></i>
                                    Add Employee
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    );
}

export default Employee