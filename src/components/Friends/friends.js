import React, {useEffect, useState} from "react";
import {sendJSONRequest} from "../../utils/helpers";
import FriendCard from "./card";

export default function MyFriends() {
    const [users, setUsers] = useState([]);

    const loadData = async () => {
        const res = await sendJSONRequest('GET', '/api/friends/', null, true);
        const data = await res.json();
        setUsers(data.friends);
    }

    useEffect(() => {
        loadData();
    }, [])

    let userEls = <span className='addSomeFriends'>Add some Friends!</span>
    if (users.length > 0) {
        userEls = users.map(x => <FriendCard user={x} context={'friend'} cb={loadData}/>)
    }

    return (
        <>
            {userEls}
        </>
    )
}