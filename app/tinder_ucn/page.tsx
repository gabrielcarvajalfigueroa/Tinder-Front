import TinderCards from "@/components/ui/tinderCards";
import React from "react";
import { cookies } from 'next/headers'

export default function UserPage() {
    
    return (
        <div className="flex justify-center">            
            <TinderCards/>
        </div>
    );

}
