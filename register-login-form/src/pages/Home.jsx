import React, { useState } from "react";
import UserCard from "../components/UserCard";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const users = [
    { name: "Arshad", email: "arshad@email.com", age: 22 },
    { name: "Akbar", email: "akbar@email.com", age: 40 },
    { name: "Akshad", email: "akshad@email.com", age: 20 },
    { name: "Gohar", email: "gohar@email.com", age: 30 },
  ];
  return (
    <div>
      {isLoggedIn ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
      {isLoggedIn && <p>Hello, you are logged in!</p>}
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
