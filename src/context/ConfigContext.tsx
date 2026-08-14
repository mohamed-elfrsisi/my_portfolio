import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { config as defaultConfig } from "../config";

export type ConfigType = typeof defaultConfig;

interface ConfigContextValue {
  config: ConfigType;
  loading: boolean;
  isLive: boolean;
  refresh: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextValue>({
  config: defaultConfig,
  loading: false,
  isLive: false,
  refresh: async () => {},
});

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<ConfigType>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/config");
      if (res.ok) {
        const data = await res.json();
        if (data.config) {
          // Merge over the bundled default so any fields not yet saved
          // to the database still fall back gracefully.
          setConfig({ ...defaultConfig, ...data.config });
          setIsLive(true);
        }
      }
    } catch (err) {
      // No live backend configured yet, or request failed — silently
      // fall back to the config.ts bundled with the site.
      console.warn("Using bundled config (live config unavailable):", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  // Keep the browser tab title / meta description in sync with the
  // (possibly live-edited) config.
  useEffect(() => {
    if (config.meta?.siteTitle) {
      document.title = config.meta.siteTitle;
    }
    if (config.meta?.siteDescription) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", config.meta.siteDescription);
    }
  }, [config]);

  return (
    <ConfigContext.Provider
      value={{ config, loading, isLive, refresh: fetchConfig }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = (): ConfigType => useContext(ConfigContext).config;
export const useConfigContext = () => useContext(ConfigContext);
