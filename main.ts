import { Application, send } from "@oak/oak";
import { router } from "./routes.ts";

// Ana uygulama
if (import.meta.main) {
  const app = new Application();

  // Logger middleware
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
  });

  // Routes
  app.use(router.routes());
  app.use(router.allowedMethods());

  // Statik dosyalar
  app.use(async (ctx) => {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  });

  const port = 8000;
  console.log(`🦕 Todo App http://localhost:${port} adresinde çalışıyor`);
  await app.listen({ port });
}
