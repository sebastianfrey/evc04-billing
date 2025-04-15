import react from "@vitejs/plugin-react-swc";
import type { UserConfig } from "vite";

const config: UserConfig = {
  worker: {
    format: 'es',
  },
  plugins: [
    react(),
    {
      name: "full-reload",
      handleHotUpdate({ server }) {
        server.ws.send({ type: "full-reload" });
        return [];
      },
    },
  ],
};

export default config;
