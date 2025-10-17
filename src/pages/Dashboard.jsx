import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import StatsCards from '../components/Dashboard/StatCard';
import TaskTable from '../components/Dashboard/TaskTable';
import SummaryTable from '../components/Dashboard/SummaryTable';
import Roles from '../components/Dashboard/Roles';
import Permissions from '../components/Dashboard/Permissions';
import Tasks from '../components/Dashboard/Tasks';
import Projects from '../components/Dashboard/Projects';
import TaskReport from '../components/Dashboard/TaskReport';
import './Dashboard.css';
function Dashboard() {
    const [active, setActive] = useState('Dashboard'); // Sidebar selection

    const renderContent = () => {
        switch (active) {
            case 'Dashboard':
                return (
                    <div className="dashboard-section">
                        <StatsCards />
                        <div className="task-tables">
                            <TaskTable title="Recent Tasks" bgColor="bg-[#FFD2CE]" />
                            <TaskTable title="Over Tasks" bgColor="bg-[#FFD2CE]" />
                        </div>
                        <div className="summary-grid">
                            <SummaryTable title="Engineer Tasks" bgColor="bg-[#FFD2CE]" />
                            <SummaryTable title="Project Wise Tasks" bgColor="bg-[#FFD2CE]" />
                        </div>
                    </div>
                );

            case 'Tasks':
                return <Tasks />

            case 'Permissions':
                return <Permissions />
            case 'Roles':
                return <Roles />

            case 'Projects':
                return <Projects />


            case 'Task Report':
                return <TaskReport />;

            case 'Users':
                return <div className="page-text">Users Management</div>;

            default:
                return null;
        }
    };

    return (
        <div className="dashboard-wrapper">
            <Sidebar active={active} setActive={setActive} />
            <div className="dashboard-main">
                <Navbar />
                <main className="dashboard-content">{renderContent()}</main>
            </div>
        </div>
    );
}

export default Dashboard;
