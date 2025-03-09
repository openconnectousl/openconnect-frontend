import { Outlet } from 'react-router-dom'
import HeaderHome from '@/components/layout/header/Header-home'
import Footer from '@/components/ui/Footer'
import About from '../ui/About'

export const PublicLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderHome />
            <main className="flex-grow">
                <Outlet />
            </main>
            {/* <About />
            <Footer /> */}
        </div>
    )
}
