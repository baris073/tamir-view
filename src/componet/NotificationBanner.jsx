import { useState } from 'react';
import Ads from '../assets/ads.gif'

export default function NotificationBanner() {
 

  return (
    // 🚨 መላው ባነር ከላይ ተጣብቆ (fixed top-0) እንዲቀመጥ ተደርጓል
    <div className="">
      <img src={Ads} alt='ads' className='w-full h-[200px]' />
      
    </div>
  );
}