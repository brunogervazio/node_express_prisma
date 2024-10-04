import { env } from "@/common/utils/env.config"
import { app } from "@/server"
import '@/container'


app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  console.log(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`)
});