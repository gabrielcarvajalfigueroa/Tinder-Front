import TinderCards from "@/components/ui/tinderCards";
import React from "react";
import { cookies } from 'next/headers'
import { jwtDecode } from "jwt-decode";
import ProfileCard from "@/components/ui/profileCard";
import { getClient } from "@/lib/client";
import {GET_USER_BY_ID_QUERY, MATCHES_QUERY, USERS_QUERY} from "@/graphQL/querys";
import {user} from "@nextui-org/react";
interface User {
    _id: string;
    name: string;
    password: string;
    mail: string;
    career: string;
    photo: string;
    year: string;
}

async function getUsersData(){

    const client = getClient();

    const { data } = await client.query({
        query: USERS_QUERY
    });

    return data;
}

async function getMatchesData(userId: string){

    const client = getClient();

    const { data } = await client.query({
        query: MATCHES_QUERY,
        variables: {
            userId: userId
        }
    });

    const matches: String[] = data.getUserMatches;

    let matched_users = [];

    for(let id of matches){
        let { data } = await client.query({
            query: GET_USER_BY_ID_QUERY,
            variables: {
                "userId": id,
            },
        });

        matched_users.push(data.getUserById);
    }

    return matched_users;
}

export default async function UserPage() {
    const token = cookies().get('jwt');
    const decoded = jwtDecode(token.value);
    const data = await getUsersData();
    const currentUser = data.user.find(user => user._id === decoded.id);
    const likes = currentUser.likes;
    const filteredUsers : User[] = data.user?.filter(user => user._id !== currentUser._id && !likes.includes(user._id));
    const matches = await getMatchesData(decoded.id);
    console.log(matches, "este es el matches");

    return (
        <div className="flex h-screen">
            <div className="flex-1">
                <TinderCards userId={decoded.id} users={filteredUsers} ></TinderCards>
            </div>
            <div className="flex-1">
                <ProfileCard userId={decoded.id}   db={matches}></ProfileCard>
            </div>
        </div>
    );
}
