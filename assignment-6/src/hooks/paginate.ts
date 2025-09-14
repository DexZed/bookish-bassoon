import { useState } from "react";

export default function usePaginate<T>(data: T[] | undefined) {
  const [visibleCount, setVisibleCount] = useState(3);
  const items = data ?? [];
  const visibleData = items.slice(0, visibleCount);
  const isdisabled = visibleCount >= items.length;
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };
  return { visibleData, isdisabled, handleLoadMore };
    
  
}
