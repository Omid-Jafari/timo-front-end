import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleMediaQueryChange = (event: {
      matches: boolean | ((prevState: boolean) => boolean);
    }) => {
      setMatches(event.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, [query]);

  return matches;
};
