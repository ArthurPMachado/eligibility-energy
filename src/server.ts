import { app } from "./app";

app
  .listen({
    port: 3333
  })
  .then(() => {
    console.log("🚀 HTTP server running on http://localhost:3333")
  })
