import React from "react";
import { Line, Notification, Profile, Arrow } from './assets/dashboard_svg'

export function Navbar() {
    return (
        <>
              <div className='navbar'>
                        <div className='hello'> <h2>Hello,Lekan</h2>
                            <p>Have a nice day</p></div>
                        <div className='notification'>
                            <Notification className='notificationss' />
                            <Line />
                            <Profile />
                            <div className='admin'>
                                <h4>Lekan Okeowo</h4>
                                <h5>Admin</h5>
                            </div>
                            <Arrow />

                        </div>
                    </div>
               
            
        </>
    )

}