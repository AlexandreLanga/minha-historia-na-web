import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

if (existsSync(".env")) {
  process.loadEnvFile(".env");
}

const jwt = process.env.API_UTILIDADES_JWT;
if (!jwt) {
  console.error("API_UTILIDADES_JWT n�o definida (use .env ou vari�vel de ambiente).");
  process.exit(1);
}

const [command, ...args] = process.argv.slice(2);
const result = spawnSync(
  "npx",
  ["ng", command, ...args, "--define", `API_UTILIDADES_JWT=${JSON.stringify(jwt)}`],
  { stdio: "inherit", shell: true }
);
process.exit(result.status ?? 1);
