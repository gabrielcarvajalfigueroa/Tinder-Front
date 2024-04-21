import TinderCards from "@/components/ui/tinderCards";
import React from "react";
import { cookies } from 'next/headers'
import { jwtDecode } from "jwt-decode";
import ProfileCard from "@/components/ui/profileCard";
import { getClient } from "@/lib/client";
import {USERS_QUERY} from "@/graphQL/querys";

async function getUsersData(){

    const client = getClient();

    const { data } = await client.query({
        query: USERS_QUERY
    });

    return data;
}

export default async function UserPage() {
    const token = cookies().get('jwt');
    const decoded = jwtDecode(token.value);
    const data = await getUsersData();

    return (
        <div className="flex h-screen">
            <div className="flex-1">
                <TinderCards userId={decoded.id} users={data.user} ></TinderCards>
            </div>
            <div className="flex-1">
                <ProfileCard userId={decoded.id}></ProfileCard>
            </div>
        </div>
    );
}
