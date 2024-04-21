import TinderCards from "@/components/ui/tinderCards";
import React from "react";
import { cookies } from 'next/headers'
import {jwtDecode} from "jwt-decode";

export default function UserPage() {
    const token = cookies().get('jwt');

    const decoded = jwtDecode(token.value);
    return (
        <div className="flex justify-center">
            <TinderCards userId={decoded.id}></TinderCards>
        </div>
    );

}
