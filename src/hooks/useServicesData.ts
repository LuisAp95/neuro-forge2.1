import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { get, set, getCacheKey } from "../lib/cache";

interface SliderService {
  id: number;
  title: string;
  description: string;
  description_completa: string | null;
  implementacion: string[];
  beneficios: string[];
  sort_order: number;
}

interface ServiceGridItem {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  image_alt?: string | null;
  sort_order: number;
}

interface Stat {
  id: number;
  value: number;
  label: string;
  suffix: string;
  sort_order: number;
}

interface Tool {
  id: number;
  name: string;
  sort_order: number;
  image_url?: string | null;
}

interface ContentBlocks {
  slider?: any;
  stats?: any;
  servicesGrid?: any;
  tools?: any;
}

interface ServicesData {
  slider: {
    titlePart1?: string;
    titleHighlight?: string;
    implementLabel?: string;
    benefitsLabel?: string;
    services: SliderService[];
  };
  stats: {
    titlePart1?: string;
    titleHighlight?: string;
    items: Stat[];
  };
  servicesGrid: {
    titlePart1?: string;
    titleHighlight?: string;
    subtitle?: string;
    items: ServiceGridItem[];
  };
  tools: {
    titlePart1?: string;
    titleHighlight?: string;
    items: Tool[];
  };
}

const DEFAULT_DATA: ServicesData = {
  slider: { services: [] },
  stats: { items: [] },
  servicesGrid: { items: [] },
  tools: { items: [] },
};

const CACHE_KEY = getCacheKey("services");

export function useServicesData() {
  const [data, setData] = useState<ServicesData>(
    () => get<ServicesData>(CACHE_KEY) ?? DEFAULT_DATA,
  );
  const [loading, setLoading] = useState(
    () => get<ServicesData>(CACHE_KEY) == null,
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cached = get<ServicesData>(CACHE_KEY);
    if (
      cached &&
      (cached.slider?.services?.length > 0 ||
        cached.stats?.items?.length > 0 ||
        cached.slider?.titlePart1)
    ) {
      setData(cached);
      setLoading(false);
      return;
    }

    async function fetchServicesData() {
      try {
        const [
          contentBlocksRes,
          sliderServicesRes,
          statsRes,
          servicesGridRes,
          toolsRes,
        ] = await Promise.all([
          supabase
            .from("content_blocks")
            .select("section, content")
            .eq("page", "services"),
          supabase
            .from("slider_services")
            .select("*")
            .order("sort_order", { ascending: true }),
          supabase
            .from("stats")
            .select("*")
            .order("sort_order", { ascending: true }),
          supabase
            .from("services_grid")
            .select("*")
            .order("sort_order", { ascending: true }),
          supabase
            .from("tools")
            .select("*")
            .order("sort_order", { ascending: true }),
        ]);

        if (contentBlocksRes.error) throw contentBlocksRes.error;
        if (sliderServicesRes.error) throw sliderServicesRes.error;
        if (statsRes.error) throw statsRes.error;
        if (servicesGridRes.error) throw servicesGridRes.error;
        if (toolsRes.error) throw toolsRes.error;

        const contentBlocks: ContentBlocks = {};
        contentBlocksRes.data?.forEach((block) => {
          contentBlocks[block.section as keyof ContentBlocks] = block.content;
        });

        const nextData: ServicesData = {
          slider: {
            ...contentBlocks.slider,
            services: sliderServicesRes.data || [],
          },
          stats: {
            ...contentBlocks.stats,
            items: statsRes.data || [],
          },
          servicesGrid: {
            ...contentBlocks.servicesGrid,
            items: servicesGridRes.data || [],
          },
          tools: {
            ...contentBlocks.tools,
            items: toolsRes.data || [],
          },
        };

        set(CACHE_KEY, nextData);
        setData(nextData);
      } catch (err) {
        setError(err as Error);
        console.error("Error fetching services data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchServicesData();
  }, []);

  return { data, loading, error };
}
