import React from "react";

const UserDetailCard = ({ activeUserData }) => {
  console.log(activeUserData);
  const fullName = "Fullname";
  const [firstName, ...lastNameArray] = fullName.split(" ");
  const lastName = lastNameArray.join(" ");
  return (
    <div className="w-[90%] h-[184px] bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <h1 className="font-semibold">Customer details</h1>
      <div className="flex justify-between items-center">
        <h2>Email</h2>
        <h5 className="text-sm">{activeUserData.email}</h5>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-sm">First Name</h2>
        <h2 className="text-sm font-medium">firstName</h2>
      </div>
      <div className="flex justify-between items-center">
        <h2>Last Name</h2>
        <h2 className="text-[14px] font-medium">{lastName}</h2>
      </div>
      <h2 className="text-primaryBlue font-medium">View more details</h2>
    </div>
  );
};

export default UserDetailCard;
