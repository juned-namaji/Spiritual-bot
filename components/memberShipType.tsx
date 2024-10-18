'use client';

import { useState } from 'react';

interface ClientMembershipPopupProps {
  membershipType: string;
}

const MembershipsPopup: React.FC<ClientMembershipPopupProps> = ({ membershipType }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  return (
    <div className="ml-4">
      <button className="text-blue-500 hover:underline" onClick={togglePopup}>
        {membershipType.charAt(0).toUpperCase() + membershipType.slice(1)} Plan
      </button>
      {showPopup && (
        <div className="absolute z-10 mt-2 w-64 bg-white shadow-lg p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Membership Plans</h3>
          <ul>
            <li>Free: 100 queries/day</li>
            <li>Pro: 500 queries/day</li>
            <li>Premium: 2000 queries/day</li>
          </ul>
          <button className="mt-2 text-red-500 hover:underline" onClick={togglePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default MembershipsPopup;
