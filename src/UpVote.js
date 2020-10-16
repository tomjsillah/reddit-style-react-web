import React from "react";
const Vote = function() {
  const [count, setCount] = React.useState(0);
  return (

      <button onClick={() => setCount(count + 1)}> 👍🏽 {count}</button>
   
  );
};

export default Vote;
