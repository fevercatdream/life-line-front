import React from 'react';
import PersonRemove from '@mui/icons-material/PersonRemove';
import Block from '@mui/icons-material/Block';
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";
import Clear from "@mui/icons-material/Clear";

export function FriendCard({context}) {
    let showBlockButton = true;
    let action;
    if (context === 'friend') {
        action = <button className='deleteFriend'><PersonRemove sx={{ fontSize: 40 }}/></button>;
    } else if (context === 'user') {
        action = <button className='addFriend'><PersonAddAlt1 sx={{ fontSize: 40 }}/></button>;
    } else if (context === 'ignored') {
        action = <button className='deleteFriend'><Clear sx={{ fontSize: 40 }}/></button>;
        showBlockButton = false;
    }
    return (
        <figure className='friendCard2'>
            {showBlockButton && <Block sx={{ fontSize: 50 }} className='blockUser'/> }
            <img className="friendPhoto" src="http://placekitten.com/300/300" />
            <figcaption className='friendBio'>
                <div className='friendBioName'>
                    <p className='smallerP'>Sneaky Mc'Alleycat</p>
                    <p className='smallerP'>Tacoma, Washington</p>
                </div>
                {action}
            </figcaption>
        </figure>
    )
}
