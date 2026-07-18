import React from "react";
import UserCard from "../components/UserCard";

const Home = () => {
  const users = [
    { name: "Arshad", email: "arshad@email.com", age: 22 },
    { name: "Akbar", email: "akbar@email.com", age: 40 },
    { name: "Akshad", email: "akshad@email.com", age: 20 },
    { name: "Gohar", email: "gohar@email.com", age: 30 },
  ];
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <div>
        {users.map((user, index) => (
          <UserCard
            key={index}
            name={user.name}
            email={user.email}
            age={user.age}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
