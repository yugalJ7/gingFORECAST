import React, { useState } from "react";

const Searchbar = () => {
  const [query, setQuery] = useState("");

  return {
    query,
    setQuery,
  };
};

export default Searchbar;
