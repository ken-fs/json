import type { Metadata } from "next";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "JSON anidado: qué es, ejemplo y cómo leerlo",
  description:
    "Un JSON anidado tiene objetos o arrays dentro de otros objetos. Ejemplo copiable, cómo acceder a cada valor y cómo pasarlo a CSV o a un esquema.",
  alternates: { canonical: "/json-anidado/" },
};

const NESTED = `{
  "usuario": {
    "nombre": "Ana",
    "direccion": { "ciudad": "Madrid", "cp": "28001" }
  },
  "pedidos": [
    { "id": 101, "productos": ["lápiz", "papel"] },
    { "id": 102, "productos": [] }
  ]
}`;

const ACCESS = `usuario.direccion.ciudad   →  "Madrid"
pedidos[0].id              →  101
pedidos[0].productos[1]    →  "papel"`;

const link = "text-[#1261ff] underline";
const pre = "mt-3 overflow-x-auto rounded-md border border-[#dedede] bg-white p-4 text-[13px] leading-6";

export default function JsonAnidadoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    inLanguage: "es",
    headline: "JSON anidado: qué es, ejemplo y cómo leerlo",
    url: `${SITE_URL}/json-anidado/`,
    dateModified: "2026-11-21",
    author: { "@type": "Organization", name: "JSON.how" },
  };
  return (
    <div className="flex min-h-screen bg-[#f7f7f4] text-[#141414]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AppSidebar />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="px-6 py-10 text-[15px] leading-relaxed" lang="es">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1261ff]">Guía</p>
            <h1 className="mt-2 text-[34px] font-extrabold leading-tight tracking-[-0.04em]">JSON anidado</h1>
            <p className="mt-4">
              Un JSON anidado es un JSON con objetos o arrays dentro de otros objetos. Es lo normal en casi cualquier
              API. Cuanto más profundo, más difícil de leer.
            </p>

            <h2 className="mt-8 text-lg font-semibold">Ejemplo</h2>
            <p className="mt-2">
              <code>usuario</code> es un objeto con otro objeto dentro (<code>direccion</code>). <code>pedidos</code>{" "}
              es un array de objetos, y cada pedido tiene su propio array.
            </p>
            <pre className={pre}><code>{NESTED}</code></pre>

            <h2 className="mt-8 text-lg font-semibold">Cómo acceder a un valor</h2>
            <p className="mt-2">
              Vas bajando nivel por nivel. Los objetos se leen con un punto y los arrays con un número entre
              corchetes, empezando en 0.
            </p>
            <pre className={pre}><code>{ACCESS}</code></pre>
            <p className="mt-2">
              Para buscar valores con rutas como estas, usa <a className={link} href="/jsonpath/">JSONPath</a>.
            </p>

            <h2 className="mt-8 text-lg font-semibold">Qué hacer con un JSON anidado</h2>
            <ul className="mt-2 list-disc pl-5">
              <li>Comprobar que es válido con el <a className={link} href="/json-validator/">validador de JSON</a>.</li>
              <li>Verlo como árbol plegable en el <a className={link} href="/json-viewer/">visor de JSON</a>.</li>
              <li>
                Pasarlo a hoja de cálculo con <a className={link} href="/json-to-csv/">JSON a CSV</a>. El CSV es
                plano, así que los datos anidados se convierten en columnas con punto, como <code>usuario.nombre</code>.
              </li>
              <li>Generar un esquema con <a className={link} href="/json-to-json-schema/">JSON a JSON Schema</a>.</li>
            </ul>
            <p className="mt-4">
              Más ejemplos (en inglés): <a className={link} href="/json-example/">JSON example</a>.
            </p>
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

