// Deno Özelliği #5: Native ES Modules
// JSR (@oak/oak) ve yerel TypeScript modüllerinden import/export kullanımı
import { Application, send } from "@oak/oak";
import { router } from "./routes.ts";

// Deno Özelliği #2: Native TypeScript Support
// .ts dosyaları doğrudan çalıştırılıyor, tsconfig.json veya derleme adımı gerekmiyor

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
    // Deno Özelliği #4: Deno Runtime API
    // Deno.cwd() - Yerleşik Deno runtime API'si ile çalışma dizini alma
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  });

  const port = 8000;
  console.log(`Todo App http://localhost:${port} adresinde çalışıyor`);
  
  // Deno Özelliği #3: Top-Level Await
  // Async fonksiyon sarmalayıcısı olmadan doğrudan await kullanımı
  await app.listen({ port });
}
