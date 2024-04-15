import ProfileCard from "@/app/ui/profileCard";
import MatchCard from "@/app/ui/tinderCards";
import TinderCards from "@/app/ui/tinderCards";
import React from "react";
import Link from "next/link";

export default function UserPage() {

    return (
        <div>

            <Link
                href="/edit_profile"
                className="block py-1 px-6 bg-blue-500 w-1/3 text-white rounded-md text-lg font-semibold shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Editar Perfil
            </Link>

            <div className="flex justify-center">
                <TinderCards/>
            </div>            
        </div>
    );

}
