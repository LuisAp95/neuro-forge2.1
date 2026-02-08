import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { get, set, getCacheKey } from "../lib/cache";

export interface ContactDirection {
  id: number;
  label: string;
  url: string;
  is_primary: boolean;
  sort_order: number;
}

const CACHE_KEY = getCacheKey("contact_url_directions");

export function useContactDirections() {
  const [directions, setDirections] = useState<ContactDirection[]>(
    () => get<ContactDirection[]>(CACHE_KEY) ?? [],
  );
  const [loading, setLoading] = useState(
    () => get<ContactDirection[]>(CACHE_KEY) == null,
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cached = get<ContactDirection[]>(CACHE_KEY);
    if (cached != null && cached.length >= 0) {
      setDirections(cached);
      setLoading(false);
      if (cached.length > 0) return;
    }

    async function fetchDirections() {
      try {
        const { data, err } = await supabase
          .from("contact_url_directions")
          .select("*")
          .order("sort_order", { ascending: true });

        if (err) throw err;
        const list = (data || []) as ContactDirection[];
        set(CACHE_KEY, list);
        setDirections(list);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching contact_url_directions:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDirections();
  }, []);

  const primaryUrl =
    directions.find((d) => d.is_primary)?.url ?? directions[0]?.url ?? null;

  return { directions, primaryUrl, loading, error };
}
