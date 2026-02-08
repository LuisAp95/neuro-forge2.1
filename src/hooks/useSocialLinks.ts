import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { get, set, getCacheKey } from "../lib/cache";

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  sort_order: number;
}

const CACHE_KEY = getCacheKey("social_links");

export function useSocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>(
    () => get<SocialLink[]>(CACHE_KEY) ?? [],
  );
  const [loading, setLoading] = useState(
    () => get<SocialLink[]>(CACHE_KEY) == null,
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cached = get<SocialLink[]>(CACHE_KEY);
    if (cached != null && cached.length > 0) {
      setLinks(cached);
      setLoading(false);
      return;
    }

    async function fetchLinks() {
      try {
        const { data, err } = await supabase
          .from("social_links")
          .select("*")
          .order("sort_order", { ascending: true });

        if (err) throw err;
        const list = (data || []) as SocialLink[];
        set(CACHE_KEY, list);
        setLinks(list);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching social_links:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLinks();
  }, []);

  return { links, loading, error };
}
