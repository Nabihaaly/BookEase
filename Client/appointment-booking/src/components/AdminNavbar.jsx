import { Link } from "react-router-dom";

function AdminNavbar() {
    return ( 
        <>
        {/* Navigation Links (Desktop) */}
            <nav className="max-w-7xl mx-auto px-4 pt-4 sm:px-6 lg:px-8">
                <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                <Link to='' smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-md font-medium transition-colors cursor-pointer">Appointments</Link>
                <Link to='' smooth={true} duration={500} offset={-80} className="text-gray-700 hover:text-purple-700 px-3 py-2 text-md font-medium transition-colors cursor-pointer">Users</Link>
                </div>
            </div> 
            </nav>
        </> 
     );
}

export default AdminNavbar;