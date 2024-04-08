import Image from "next/image";


export default function NavBar() {
  return (
    <nav className="bg-black p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between">
            <div className="flex items-center">
              <Image src="/logo.png" alt="Logo Image" width="64" height="64" className="rounded-full" />
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <h1>Tinder UCN</h1>
            </div>
          </div>
        </div>
    </nav>
  );
}
