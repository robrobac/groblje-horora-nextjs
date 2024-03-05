import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * React Hook to get the scroll percentage from the page, returns value from 0 to 100
 */
export function useReadingProgress() {
  const [completion, setCompletion] = useState(0);
  const path = usePathname();

  useEffect(() => {
    setCompletion(0); // Reset completion when the route changes
    
    function updateScrollCompletion() {
      const movie1Element = document.getElementById("movie1");
      const commentsAndLikesElement = document.getElementById("commentsAndLikes");

      if (movie1Element && commentsAndLikesElement) {
        const scrollTop = window.scrollY;
        const movie1Top = movie1Element.offsetTop;
        const commentsAndLikesTop = commentsAndLikesElement.offsetTop;
        const commentsAndLikesBottom = commentsAndLikesTop + commentsAndLikesElement.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Calculate the range between movie1 and commentsAndLikes elements
        let scrollRange = commentsAndLikesBottom - movie1Top - viewportHeight;

        // Check if the viewport is above or below the movie1 and commentsAndLikes elements
        if (scrollTop <= movie1Top) {
          setCompletion(0);
        } else if (scrollTop >= commentsAndLikesBottom - viewportHeight) {
          setCompletion(100);
        } else {
          // Calculate completion percentage within the scrollRange
          const distanceScrolledPastMovie1 = scrollTop - movie1Top;
          setCompletion(
            Number(((distanceScrolledPastMovie1 / scrollRange) * 100).toFixed(2))
          );
        }
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", updateScrollCompletion);

    // Remove event listener on unmount
    return () => {
      window.removeEventListener("scroll", updateScrollCompletion);
    };
  }, [path]);

  return completion;
}
