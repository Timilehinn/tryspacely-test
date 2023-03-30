import React from 'react'
import {Link} from "react-router-dom";


const Notification = () => {
  return (
    <div className="hidden px-10">
      <div className="drop-shadow-2xl w-[32rem] bg-white ml-auto px-5 rounded py-3.5">
        <div>
          <div className="flex gap-x-16 ">
            <h1>Notification</h1>
            <p className="ml-auto text-[#0559FD]">View all</p>
          </div>
        </div>


        <div className="flex items-center gap-x-2 py-2">
          <div className="p-2.5 bg-white drop-shadow-2xl rounded-full">
            <img className="" src="Notification-icon.svg" alt='notification'/>
          </div>

          <p><span className="font-bold">Announcement</span>: Bookings times may change due to Daylight savings <Link className=" hover:text-pink-400 text-[#0559FD]" to="/readmore">ReadMore</Link></p>
        </div>


        <div className="flex items-center gap-x-2 py-2">
          <div className="p-2.5 bg-white drop-shadow-2xl rounded-full">
            <img className="" src="Notification-icon.svg" alt='notification'/>
          </div>

          <p><span className="font-bold">Workspace</span>: Your workspace has been listed</p>
        </div>

        <div className="flex items-center gap-x-2 py-2">
          <div className="p-2.5 bg-white drop-shadow-2xl rounded-full">
            <img className="" src="Notification-icon.svg" alt='notification'/>
          </div>

          <p><span className="font-bold">Bookings</span>: You have a new booking</p>
        </div>


        <div className="flex items-center gap-x-2 py-2">
          <div className="p-2.5 bg-white drop-shadow-2xl rounded-full">
            <img className="" src="Notification-icon.svg" alt='notification'/>
          </div>

          <p><span className="font-bold">Announcement</span>: Bookings times may change due to Daylight savings <Link className="hover:text-pink-400 text-[#0559FD]" to="/readmore">ReadMore</Link></p>
        </div>

        <div className="flex items-center gap-x-2 py-2">
          <div className="p-2.5 bg-white drop-shadow-2xl rounded-full">
            <img className="" src="Notification-icon.svg" alt='notification'/>
          </div>

          <p><span className="font-bold">Payment</span>: Payment has been made for your workspace</p>
        </div>


        <div className="flex items-center gap-x-2 py-2">
          <div className="p-2.5 bg-white drop-shadow-2xl rounded-full">
            <img className="" src="Notification-icon.svg" alt='notification'/>
          </div>

          <p><span className="font-bold">Support</span>: A new support system has been sent in</p>
        </div>
      </div>

    </div>
  )
}
export default Notification