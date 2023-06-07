import React, {useEffect, useState} from "react";
import {sendJSONRequest} from "../../utils/helpers";
import FriendCard from "./card";

export default function AllUsers()
{
    const [users, setUsers] = useState([]);

    const loadData = async () => {
        const res = await sendJSONRequest('GET', '/api/friends/all-users', null, true);
        const data = await res.json();
        setUsers(data.users);
    }

    const userEls = users.map(x => <FriendCard user={x} context={'user'}/>)

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            {userEls}
        </>
    )
}