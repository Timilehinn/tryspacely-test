import React from 'react'
import ChatBox from './ChatBox'

const ChatWrapper = (props) => {
    // console.log(props?.currentUserDetails, "currentUserDetails");
    // console.log(props?.otherUserDetails, "otherUserDetails");

    return (
        <div className='h-[100%] w-[100%]'>
            <ChatBox 
                    currentUserDetails={props?.currentUserDetails} 
                    otherUserDetails={props?.otherUserDetails} 
            />
        </div>
    )
}

export default ChatWrapper