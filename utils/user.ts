// utils/user.ts
export const getUserId = (): number => {
    const stored = localStorage.getItem("userId");
    if (stored) return parseInt(stored);
  
    const id = Math.floor(Math.random() * 9000) + 1000;
    localStorage.setItem("userId", id.toString());
    return id;
  };
  