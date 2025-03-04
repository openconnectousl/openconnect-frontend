const Footer: React.FC = () => {
    return (
        <div className="bg-blue-600 text-white py-4 text-center space-y-1">
            <p className="text-sm">© 2025 OpenConnect. All rights reserved.</p>
            <div>
                <button className="text-white text-sm font-medium underline-offset-4 hover:underline">
                    Privacy Policy
                </button>
                <button className="text-white text-sm font-medium underline-offset-4 hover:underline ml-4">
                    Terms of Service
                </button>
            </div>
        </div>
    )
}

export default Footer
