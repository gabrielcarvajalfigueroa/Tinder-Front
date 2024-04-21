import Link from 'next/link';
import RegisterModal from '@/components/register-modal';
import LoginModal from '@/components/login-modal';
import Image from 'next/image';
import NavBar from '@/components/ui/navbar';

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Homepage({ searchParams }: SearchParamProps) {
    const showLogin = searchParams?.showLogin;
    const showRegister = searchParams?.showRegister;

    return (
        <div className="relative w-full h-screen">
            {/* Background image */}
            <div className="absolute inset-0">
                <img src="/background.png" alt="Background Image" className="w-full h-full object-cover opacity-40"/>
            </div>



            {showLogin && <LoginModal/>}
            {showRegister && <RegisterModal/>}

            {/* Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="space-y-4">
                    <Link
                        href="/?showLogin=true"
                        className="block py-3 px-6 bg-blue-500 text-white rounded-md text-lg font-semibold shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Iniciar Sesión
                    </Link>

                    <Link
                        href="/?showRegister=true"
                        className="block py-3 px-6 bg-blue-500 text-white rounded-md text-lg font-semibold shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Crear Cuenta
                    </Link>
                </div>
            </div>
        </div>
    );
}

