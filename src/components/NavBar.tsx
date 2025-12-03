const NavBar = () => {
    return (
        <nav className="bg-white shadow-md px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-start h-16 gap-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    Items
                </button>
                <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-600 font-medium rounded-md cursor-not-allowed"
                >
                    Donation Centre (Coming soon)
                </button>
            </div>
        </nav>
    );
};

export default NavBar;