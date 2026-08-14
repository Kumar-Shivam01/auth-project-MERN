import logo from '../assets/web-app-manifest.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className='absolute inset-x-0 top-0 z-10 flex w-full items-center justify-between p-4 sm:p-6 sm:px-24 mb-10'>
        <div className='flex items-center'>
            <img src={logo} alt="" className='h-15 w-15 shrink-0' />
            <span className='ml-3 min-w-40 text-4xl font-bold tracking-wide text-black sm:min-w-56 sm:text-3xl'>Auth</span>
        </div>
        
        <button onClick={()=>navigate('/login')} className='flex items-center gap-2 rounded-full border border-gray-500 px-4 py-2 text-black hover:bg-white/10'>
          Login <span aria-hidden="true">→</span>
        </button>
    </nav>
  )
}

export default Navbar
