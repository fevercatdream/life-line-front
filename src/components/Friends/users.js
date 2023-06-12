import React, {useEffect, useState} from "react";
import {sendJSONRequest} from "../../utils/helpers";
import FriendCard from "./card";

export default function AllUsers({searchTerm})
{
    const [users, setUsers] = useState([]);

    const loadData = async () => {
        const res = await sendJSONRequest('GET', '/api/friends/all-users', null, true);
        const data = await res.json();
        const usersToShow = searchTerm.trim() === ""
            ? data.users
            : data.users.filter(currentUser => new RegExp(searchTerm, "gi").test(currentUser.name))
        setUsers(usersToShow);
    }

    const userEls = users.map(x => <FriendCard user={x} context={'user'}/>)

    useEffect(() => {
        loadData();
        // eslint-disable-next-line
    }, [searchTerm])

    return (
        <>
            {userEls}
        </>
    )
}