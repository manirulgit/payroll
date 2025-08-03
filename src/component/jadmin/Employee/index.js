import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import Header from '../header';
import Nabvar from '../navbar';
import './Employee.css';

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

    // Mock API function to simulate server-side data fetching
    const fetchEmployees = async (page, size, search, sort, direction, typeFilter) => {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock employee data
        const mockEmployees = [
            { id: 1, name: 'John Smith', loginId: 'jsmith', type: 'Admin', email: 'john.smith@company.com', mobile: '9876543210', status: 'Active', department: 'IT', joinDate: '2023-01-15' },
            { id: 2, name: 'Sarah Johnson', loginId: 'sjohnson', type: 'Manager', email: 'sarah.johnson@company.com', mobile: '9876543211', status: 'Active', department: 'HR', joinDate: '2023-02-20' },
            { id: 3, name: 'Mike Davis', loginId: 'mdavis', type: 'Employee', email: 'mike.davis@company.com', mobile: '9876543212', status: 'Active', department: 'Finance', joinDate: '2023-03-10' },
            { id: 4, name: 'Emily Brown', loginId: 'ebrown', type: 'Employee', email: 'emily.brown@company.com', mobile: '9876543213', status: 'Inactive', department: 'Marketing', joinDate: '2023-04-05' },
            { id: 5, name: 'David Wilson', loginId: 'dwilson', type: 'Manager', email: 'david.wilson@company.com', mobile: '9876543214', status: 'Active', department: 'Sales', joinDate: '2023-05-12' },
            { id: 6, name: 'Lisa Anderson', loginId: 'landerson', type: 'Employee', email: 'lisa.anderson@company.com', mobile: '9876543215', status: 'Active', department: 'IT', joinDate: '2023-06-18' },
            { id: 7, name: 'Robert Taylor', loginId: 'rtaylor', type: 'Admin', email: 'robert.taylor@company.com', mobile: '9876543216', status: 'Active', department: 'Operations', joinDate: '2023-07-22' },
            { id: 8, name: 'Jennifer Garcia', loginId: 'jgarcia', type: 'Employee', email: 'jennifer.garcia@company.com', mobile: '9876543217', status: 'Active', department: 'HR', joinDate: '2023-08-14' },
            { id: 9, name: 'Michael Martinez', loginId: 'mmartinez', type: 'Manager', email: 'michael.martinez@company.com', mobile: '9876543218', status: 'Inactive', department: 'Finance', joinDate: '2023-09-08' },
            { id: 10, name: 'Jessica Lee', loginId: 'jlee', type: 'Employee', email: 'jessica.lee@company.com', mobile: '9876543219', status: 'Active', department: 'Marketing', joinDate: '2023-10-03' },
            { id: 11, name: 'Christopher White', loginId: 'cwhite', type: 'Admin', email: 'christopher.white@company.com', mobile: '9876543220', status: 'Active', department: 'IT', joinDate: '2023-11-16' },
            { id: 12, name: 'Amanda Thompson', loginId: 'athompson', type: 'Employee', email: 'amanda.thompson@company.com', mobile: '9876543221', status: 'Active', department: 'Sales', joinDate: '2023-12-12' }
        ];

        // Apply filtering
        let filteredEmployees = mockEmployees.filter(emp => {
            const matchesSearch = emp.name.toLowerCase().includes(search.toLowerCase()) ||
                                emp.email.toLowerCase().includes(search.toLowerCase()) ||
                                emp.loginId.toLowerCase().includes(search.toLowerCase());
            const matchesType = typeFilter === '' || emp.type === typeFilter;
            return matchesSearch && matchesType;
        });

        // Apply sorting
        filteredEmployees.sort((a, b) => {
            let aVal = a[sort];
            let bVal = b[sort];
            
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (direction === 'asc') {
                return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
            } else {
                return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
            }
        });

        // Apply pagination
        const startIndex = (page - 1) * size;
        const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + size);

        setEmployees(paginatedEmployees);
        setTotalRecords(filteredEmployees.length);
        setLoading(false);
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
                                <option value="Admin">Admin</option>
                                <option value="Manager">Manager</option>
                                <option value="Employee">Employee</option>
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
                                    <button type="button" className="btn btn-outline-success">
                                        <i className="fas fa-check me-1"></i> Activate
                                    </button>
                                    <button type="button" className="btn btn-outline-danger">
                                        <i className="fas fa-trash me-1"></i> Delete
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
                                    <td>{employee.id}</td>
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
            
            <Footer />
        </div>
    );
}

export default Employee