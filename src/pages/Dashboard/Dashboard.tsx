import { Link } from 'react-router-dom'

const Dashboard: React.FC = () => {
    return (
        <>
            <Link to="/create-events">Create Events</Link>
            <Link to="/manage-users">Manage Users</Link>
            <Link to="/manage-projects">Manage Projects</Link>
        </>
    )
}

export default Dashboard
