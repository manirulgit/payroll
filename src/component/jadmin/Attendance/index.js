import React, { useState, useEffect } from 'react';
import Header from "../header";
import './Attendance.css';

// Sample JSON data for attendance
const attendanceData = [
  {
    id: 1,
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    date: '2025-07-01',
    status: 'Present',
    checkIn: '09:00',
    checkOut: '17:30',
    workingHours: '8.5'
  },
  {
    id: 2,
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    date: '2025-07-01',
    status: 'Present',
    checkIn: '08:45',
    checkOut: '17:15',
    workingHours: '8.5'
  },
  {
    id: 3,
    employeeId: 'EMP003',
    employeeName: 'Mike Johnson',
    date: '2025-07-01',
    status: 'Absent',
    checkIn: '',
    checkOut: '',
    workingHours: '0'
  },
  {
    id: 4,
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    date: '2025-07-02',
    status: 'Present',
    checkIn: '09:15',
    checkOut: '17:45',
    workingHours: '8.5'
  },
  {
    id: 5,
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    date: '2025-07-02',
    status: 'Late',
    checkIn: '10:30',
    checkOut: '18:30',
    workingHours: '8'
  },
  {
    id: 6,
    employeeId: 'EMP003',
    employeeName: 'Mike Johnson',
    date: '2025-07-02',
    status: 'Present',
    checkIn: '08:30',
    checkOut: '16:30',
    workingHours: '8'
  },
  {
    id: 7,
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    date: '2025-07-03',
    status: 'Present',
    checkIn: '09:00',
    checkOut: '17:30',
    workingHours: '8.5'
  },
  {
    id: 8,
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    date: '2025-07-03',
    status: 'Half Day',
    checkIn: '09:00',
    checkOut: '13:00',
    workingHours: '4'
  },
  {
    id: 9,
    employeeId: 'EMP004',
    employeeName: 'Sarah Wilson',
    date: '2025-07-03',
    status: 'Present',
    checkIn: '08:45',
    checkOut: '17:15',
    workingHours: '8.5'
  },
  {
    id: 10,
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    date: '2025-07-31',
    status: 'Present',
    checkIn: '09:00',
    checkOut: '17:30',
    workingHours: '8.5'
  },
  {
    id: 11,
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    date: '2025-07-31',
    status: 'Present',
    checkIn: '08:45',
    checkOut: '17:15',
    workingHours: '8.5'
  }
];

function Attendance() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState(attendanceData);
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'

  // Get unique employees for filter dropdown
  const employees = [...new Set(attendanceData.map(record => record.employeeName))];

  // Filter data based on date range and employee
  useEffect(() => {
    let filtered = attendanceData;

    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.date);
        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);
        return recordDate >= start && recordDate <= end;
      });
    }

    if (selectedEmployee !== 'all') {
      filtered = filtered.filter(record => record.employeeName === selectedEmployee);
    }

    setFilteredData(filtered);
  }, [dateRange, selectedEmployee]);

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Get attendance data for a specific date
  const getAttendanceForDate = (day) => {
    if (!day) return [];
    
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredData.filter(record => record.date === dateStr);
  };

  // Navigate calendar months
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Handle date range filter
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get status color class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'present': return 'status-present';
      case 'absent': return 'status-absent';
      case 'late': return 'status-late';
      case 'half day': return 'status-half-day';
      default: return '';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="attendance-container">
      <Header />
      
      <div className="attendance-content">
         <div className="demo-notice">
          <p>🗺️ <strong>Agen Attendance:</strong> Attendance.</p>
        </div>
        
        {/* Filter Controls */}
        <div className="filter-controls">
          <div className="filter-group">
            <label>View Mode:</label>
            <select 
              value={viewMode} 
              onChange={(e) => setViewMode(e.target.value)}
              className="form-control"
            >
              <option value="calendar">Calendar View</option>
              <option value="list">List View</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Employee:</label>
            <select 
              value={selectedEmployee} 
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="form-control"
            >
              <option value="all">All Employees</option>
              {employees.map((employee, index) => (
                <option key={index} value={employee}>{employee}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateRangeChange}
              className="form-control"
            />
          </div>
          
          <div className="filter-group">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateRangeChange}
              className="form-control"
            />
          </div>
          
          <button 
            onClick={() => {
              setDateRange({ startDate: '', endDate: '' });
              setSelectedEmployee('all');
            }}
            className="btn btn-secondary"
          >
            Clear Filters
          </button>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="calendar-view">
            <div className="calendar-header">
              <button onClick={() => navigateMonth(-1)} className="btn btn-outline-primary">
                &#8249;
              </button>
              <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
              <button onClick={() => navigateMonth(1)} className="btn btn-outline-primary">
                &#8250;
              </button>
            </div>

            <div className="calendar-grid">
              {dayNames.map(day => (
                <div key={day} className="calendar-day-header">
                  {day}
                </div>
              ))}
              
              {generateCalendarDays().map((day, index) => (
                <div key={index} className={`calendar-day ${day ? 'active-day' : 'inactive-day'}`}>
                  {day && (
                    <>
                      <div className="day-number">{day}</div>
                      <div className="day-attendance">
                        {getAttendanceForDate(day).map((record, recordIndex) => (
                          <div 
                            key={recordIndex} 
                            className={`attendance-item ${getStatusClass(record.status)}`}
                            title={`${record.employeeName} - ${record.status}`}
                          >
                            <span className="employee-initial">
                              {record.employeeName.charAt(0)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="list-view">
            <div className="attendance-table">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Working Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((record) => (
                    <tr key={record.id}>
                      <td>{record.employeeId}</td>
                      <td>{record.employeeName}</td>
                      <td>{record.date}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td>{record.checkIn || '-'}</td>
                      <td>{record.checkOut || '-'}</td>
                      <td>{record.workingHours} hrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredData.length === 0 && (
                <div className="no-data">
                  <p>No attendance records found for the selected criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="attendance-stats">
          <div className="stats-card">
            <h3>Total Records</h3>
            <p>{filteredData.length}</p>
          </div>
          <div className="stats-card present">
            <h3>Present</h3>
            <p>{filteredData.filter(r => r.status === 'Present').length}</p>
          </div>
          <div className="stats-card absent">
            <h3>Absent</h3>
            <p>{filteredData.filter(r => r.status === 'Absent').length}</p>
          </div>
          <div className="stats-card late">
            <h3>Late</h3>
            <p>{filteredData.filter(r => r.status === 'Late').length}</p>
          </div>
          <div className="stats-card half-day">
            <h3>Half Day</h3>
            <p>{filteredData.filter(r => r.status === 'Half Day').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;  