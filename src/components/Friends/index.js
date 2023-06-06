import React, {useEffect, useState} from 'react';
import PersonRemove from '@mui/icons-material/PersonRemove';
import Block from '@mui/icons-material/Block';
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";
import Clear from "@mui/icons-material/Clear";
import {sendJSONRequest} from "../../utils/helpers";
import {PendingOutlined, Person} from "@mui/icons-material";
import {Link} from "react-router-dom";

export function FriendCard({user, context}) {
    const [pendingFriend, setPendingFriend] = useState();
    const [isFriend, setisFriend] = useState();

    useEffect(() => {
        if (!user) {
            return;
        }
        setPendingFriend(user.isPending)
        setisFriend(user.isFriend);
    }, [user])

    const addFriend = async () => {
        const res = await sendJSONRequest('POST', '/api/friends/create-request', {
            friendId: user.id,
        }, true)
        if (res.status !== 200) {
            return;
        }
        setPendingFriend(true);
    }

    let showBlockButton = true;
    let action;
    if (context === 'friend') {
        action = <button className='deleteFriend'><PersonRemove sx={{ fontSize: 40 }}/></button>;
    } else if (context === 'user') {
        if (isFriend) {
            action = <Person sx={{fontSize: 40}} color={'success'} />
        } else if (pendingFriend) {
            action = <PendingOutlined sx={{fontSize: 40}} />
        } else {
            action = <button className='addFriend'><PersonAddAlt1 sx={{fontSize: 40}} onClick={addFriend}/></button>;
        }
    } else if (context === 'ignored') {
        action = <button className='deleteFriend'><Clear sx={{ fontSize: 40 }}/></button>;
        showBlockButton = false;
    }
    return (
        <figure className='friendCard2'>
            {showBlockButton && <Block sx={{ fontSize: 50 }} className='blockUser'/> }
            <Link to={`/timeline/${user.id}`}>
                <img className="friendPhoto" src={user.profilePhoto} />
            </Link>
            <figcaption className='friendBio'>
                <div className='friendBioName'>
                    <p className='smallerP'>{user.name}</p>
                    <p className='smallerP'>{user.location}</p>
                </div>
                {action}
            </figcaption>
        </figure>
    )
}
