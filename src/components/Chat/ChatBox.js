import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom';
import Talk from 'talkjs';
import Cookies from 'universal-cookie';

const ChatBox = (props) => {
  const chatboxEl = useRef();
  const cookies = new Cookies();
  const [searchParams, setSearchParams] = useSearchParams();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);
  const [presentUser, setPresentUser] = useState(null);
  //console.log(presentUser, "presentUser")

  const exchangeTokenForId = async () => {
    const token = cookies.get('user_token')
    if (!token) {
      alert('Not authenticated!!!')
      return
    }
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/retrieve-token`,
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            token,
          }),
        }
      )
      const data = await res.json()
      if (data?.status !== true) {
        console.log('something went wrong. Seems you are not authenticated')
        return
      }
      //console.log(data?.data, "as data recireved");
      setPresentUser(data?.data);
    } catch (error) {
      console.log(error, 'as error')
    }
  }

  useEffect(() => {
    exchangeTokenForId();
  }, [])



  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded && presentUser) {
      const conversation_Id = searchParams.get("conversation");
      const currentUser = new Talk.User({
        id: presentUser?.id,
        name: `${presentUser?.first_name} ${presentUser?.last_name}`,
        email: `${presentUser?.email}`,
        photoUrl: `${presentUser?.profile_url}`,
        welcomeMessage: null,
        role: 'default',
        custom: {
          specialToken: "jd71ba91n"
        }
      });
      console.log(conversation_Id, "conversation_Id")
      if (conversation_Id) {
        const session = new Talk.Session({
          appId: 't5yanii7',
          me: currentUser,
        });
        const conversation = session.getOrCreateConversation(conversation_Id);
        const chatbox = session.createInbox();
        chatbox.select(conversation);
        chatbox.mount(chatboxEl.current);
        return () => session.destroy();
      } 
      if(!conversation_Id && !props?.otherUserDetails?.id){
        const otherUser = new Talk.User({
          // id: 'ai_id',
          // name: 'dummy assistance',
          // email: 'ai_email@test.com',
          // photoUrl: 'https://media.springernature.com/w580h326/nature-cms/uploads/collections/AI_and_machine_learning-00afb90f3d21234fd0f207243f60aa8e.jpg',
          // welcomeMessage: null,
          // role: 'default',
          id: presentUser?.id,
          name: `${presentUser?.first_name} ${presentUser?.last_name}`,
          email: `${presentUser?.email}`,
          photoUrl: `${presentUser?.profile_url}`,
          welcomeMessage: null,
          role: 'default',
        });

        const session = new Talk.Session({
          appId: 't5yanii7',
          me: currentUser,
        });

        const conversationId = Talk.oneOnOneId(currentUser, otherUser);
        const conversation = session.getOrCreateConversation(conversationId);
        conversation.setParticipant(currentUser);
        conversation.setParticipant(otherUser);
        const chatbox = session.createInbox();
        chatbox.select(conversation);
        chatbox.mount(chatboxEl.current);
        return () => session.destroy();
      }
        const otherUser = new Talk.User({
          id: props?.otherUserDetails?.id,
          name: props?.otherUserDetails?.name,
          email: props?.otherUserDetails?.email,
          photoUrl: props?.otherUserDetails?.photoUrl,
          welcomeMessage: null,
          role: 'default',
        });

        const session = new Talk.Session({
          appId: 't5yanii7',
          me: currentUser,
        });

        const conversationId = Talk.oneOnOneId(currentUser, otherUser);
        const conversation = session.getOrCreateConversation(conversationId);
        conversation.setParticipant(currentUser);
        conversation.setParticipant(otherUser);
        const chatbox = session.createInbox();
        chatbox.select(conversation);
        chatbox.mount(chatboxEl.current);
        return () => session.destroy();
      // }
    }
  }, [talkLoaded, presentUser]);

  return <div className='h-[100%] w-[100%]' ref={chatboxEl} />;
}

export default ChatBox