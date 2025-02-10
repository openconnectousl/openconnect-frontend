// src/app/page.tsx
import { useApp } from '@/context/AppContext'
import { ProfessionalNetworkGrid } from '@/components/ProfessionalNetworkGrid'

const Home = () => {
  const { users } = useApp()

  return (
    <div className="container mx-auto p-6">
      <ProfessionalNetworkGrid users={users} />
    </div>
  )
}

export default Home