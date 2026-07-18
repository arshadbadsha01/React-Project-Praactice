import React from "react";

const UserCard = ({ name, email, age }) => {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h2>{name} </h2>
      <p>Email: {email} </p>
      <p>Age: {age}</p>
    </div>
  );
};

export default UserCard;
