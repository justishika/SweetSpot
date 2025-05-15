import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const LikeContext = createContext();

export function LikeProvider({ children }) {
  const [likedDesserts, setLikedDesserts] = useState(() => {
    const saved = localStorage.getItem("likedDesserts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("likedDesserts", JSON.stringify(likedDesserts));
  }, [likedDesserts]);

  const toggleLike = (dessertId) => {
    setLikedDesserts((prev) => {
      if (prev.includes(dessertId)) {
        return prev.filter((id) => id !== dessertId);
      }
      return [...prev, dessertId];
    });
  };

  const isLiked = (dessertId) => {
    return likedDesserts.includes(dessertId);
  };

  return (
    <LikeContext.Provider value={{ likedDesserts, toggleLike, isLiked }}>
      {children}
    </LikeContext.Provider>
  );
}

LikeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useLike() {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error("useLike must be used within a LikeProvider");
  }
  return context;
} 