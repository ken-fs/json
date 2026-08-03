/**
 * `json-comments`, all four locales.
 *
 * The parser errors quoted here are the real messages V8 produces, and the
 * YAML round-trip sample is real `yamlToJSON` output — including the part where
 * a trailing `#` survives into the string value. `tests/wiki.test.ts` re-derives
 * both, so if the converter changes its mind the article fails the build.
 */

import type { WikiArticleContent } from "@/lib/wikiArticle";
import type { WikiLocale, WikiMetaInput } from "@/lib/wikiMeta";

export const SLUG = "json-comments";
export const REVISED = "2026-08-03";

const WITH_COMMENT = `{
  "port": 8080 // the port
}`;

const PARSE_ERROR = `Expected ',' or '}' after property value
in JSON at position 17 (line 2 column 16)`;

const YAML_INPUT = `# the port the server binds to
port: 8080
host: localhost  # trailing comment
features:
  # experimental, off by default
  - search
  - export`;

const YAML_OUTPUT = `{
  "port": 8080,
  "host": "localhost  # trailing comment",
  "features": [
    "search",
    "export"
  ]
}`;

const SIDECAR = `{
  "_comment": "port must match the load balancer",
  "port": 8080
}`;

export const META: Record<WikiLocale, WikiMetaInput> = {
  en: {
    locale: "en",
    slug: SLUG,
    title: "Can JSON Have Comments? No, and What to Do",
    description:
      "JSON has no comment syntax. What the parser says when you try, what JSON5 and JSONC change, and the four workarounds ranked by how well they hold up.",
    keywords:
      "JSON comments,JSON5,JSONC,comment in JSON,JSON trailing comma,tsconfig comments",
    socialTitle: "Can JSON have comments?",
    section: "Syntax",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
  cn: {
    locale: "cn",
    slug: SLUG,
    title: "JSON 能写注释吗？不能，那该怎么办",
    description:
      "JSON 没有注释语法。写了会报什么错，JSON5 和 JSONC 改了什么，以及四种变通办法按可靠程度排序。",
    keywords: "JSON 注释, JSON5, JSONC, JSON 能写注释吗, JSON 尾随逗号, tsconfig 注释",
    socialTitle: "JSON 能写注释吗",
    section: "语法",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
  es: {
    locale: "es",
    slug: SLUG,
    title: "¿Puede JSON tener comentarios? No, y qué hacer",
    description:
      "JSON no tiene sintaxis de comentarios. Qué dice el parser si lo intentas, qué cambian JSON5 y JSONC, y cuatro alternativas ordenadas por fiabilidad.",
    keywords:
      "comentarios JSON,JSON5,JSONC,comentario en JSON,coma final JSON,comentarios tsconfig",
    socialTitle: "¿Puede JSON tener comentarios?",
    section: "Sintaxis",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
  pt: {
    locale: "pt",
    slug: SLUG,
    title: "JSON pode ter comentários? Não, e o que fazer",
    description:
      "JSON não tem sintaxe de comentários. O que o parser diz se você tentar, o que JSON5 e JSONC mudam, e quatro alternativas ordenadas por confiabilidade.",
    keywords:
      "comentários JSON,JSON5,JSONC,comentário em JSON,vírgula final JSON,comentários tsconfig",
    socialTitle: "JSON pode ter comentários?",
    section: "Sintaxe",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
};

const EN: WikiArticleContent = {
  eyebrow: "Syntax",
  heading: "Can JSON have comments?",
  standfirst:
    "No. There is no comment syntax in JSON and there never was — the format was specified as a data interchange format, and a comment is a note between people, not data. That answer is short, so the rest of this page is about what to do instead, and which workarounds actually survive contact with a build pipeline.",
  contentsLabel: "On this page",
  sections: [
    {
      id: "short-answer",
      heading: "The short answer",
      body: [
        "Douglas Crockford, who specified JSON, removed comments deliberately. His stated reason was that people had started putting parsing directives in them, which would have broken interoperability — the one property the format exists to have.",
        "So `//`, `/* */`, and `#` are all syntax errors, in every conforming parser, in every language. There is no flag to turn them on because the grammar has no production for them.",
      ],
    },
    {
      id: "what-happens",
      heading: "What happens if you try",
      body: [
        "The error is rarely the word \"comment\", which is why this trips people up. The parser reaches the `/` where it expected a comma or a closing brace and reports that instead.",
      ],
      sample: {
        inputLabel: "Input",
        input: WITH_COMMENT,
        outputLabel: "Error",
        output: PARSE_ERROR,
        note: "Position 17 is the first `/`. Nothing in the message mentions comments, so the usual reaction is to go looking for a missing comma.",
      },
      table: {
        caption: "The other things people assume are allowed, and are not.",
        headers: ["Written", "Result"],
        rows: [
          ["`// note` or `# note`", "Syntax error"],
          ["`/* note */`", "Syntax error"],
          ['`{"port": 8080,}`', "Syntax error: trailing comma"],
          ["`{'port': 8080}`", "Syntax error: single quotes"],
          ["`{port: 8080}`", "Syntax error: unquoted key"],
        ],
      },
    },
    {
      id: "json5-jsonc",
      heading: "JSON5 and JSONC",
      body: [
        "Two supersets exist, and the difference between them matters when you pick one. Neither is JSON: a file written in either will be rejected by `JSON.parse` and by every strict parser.",
      ],
      points: [
        "**JSONC** is JSON plus comments and trailing commas. Nothing else. It is what VS Code uses for `settings.json`, and what the TypeScript compiler accepts in `tsconfig.json` — which is why comments work there and people conclude, reasonably, that JSON allows them.",
        "**JSON5** goes considerably further: unquoted keys, single quotes, hex numbers, leading and trailing decimal points, `Infinity` and `NaN`, multi-line strings. Closer to a JavaScript object literal than to JSON.",
        "**Neither has a registered media type.** There is no `application/json5`, so these are file formats for tools you control, not wire formats for an API.",
      ],
      table: {
        caption: "Where each is safe to use.",
        headers: ["", "Config file you own", "API request or response"],
        rows: [
          ["JSON", "Yes", "Yes"],
          ["JSONC", "If the reader supports it", "No"],
          ["JSON5", "If the reader supports it", "No"],
        ],
      },
    },
    {
      id: "workarounds",
      heading: "The four workarounds",
      body: [
        "Ranked by how well they hold up. The first two are fine; the third has a real cost; the fourth is a trap.",
      ],
      points: [
        "**1. Use a format that has comments.** If the file is configuration a human maintains, YAML and TOML both support `#` comments as part of the actual grammar. This is the fix, not a workaround — a config file has no reason to be JSON.",
        "**2. Strip comments before parsing.** Standard for JSONC-style config: a small strip pass, then `JSON.parse`. Use a real JSONC parser rather than a regex, because a regex will happily destroy a `//` that appears inside a string value such as a URL.",
        "**3. A sidecar key.** Legal JSON, and sometimes the only option when the file must stay strict. The cost is that it is now data: it ships to clients, appears in diffs of the parsed object, and any schema with `additionalProperties: false` will reject it.",
        "**4. Do not comment out a block by adding a key like `\"_disabled\"`.** The block is still parsed, still present, and the next person will not know which keys the marker was meant to cover. Delete it; the history is in version control.",
      ],
      sample: {
        inputLabel: "The sidecar-key approach",
        input: SIDECAR,
        note: "Valid JSON, and readable. But `_comment` is now a field in your data, and a strict schema will reject it.",
      },
    },
    {
      id: "yaml-route",
      heading: "Converting to YAML for the comments",
      body: [
        "If the goal is a config file a human can annotate, converting the JSON to YAML once and then adding comments by hand is the clean path. Going the other direction is where the loss happens, and it is worth seeing exactly how.",
      ],
      sample: {
        inputLabel: "Commented YAML",
        input: YAML_INPUT,
        outputLabel: "Converted to JSON",
        output: YAML_OUTPUT,
        note: "The full-line comments are gone, which is expected — JSON cannot hold them. But look at `host`.",
      },
      points: [
        "**Full-line `#` comments are dropped.** Correct behaviour: there is nowhere in JSON to put them.",
        "**A trailing `#` on an unquoted scalar becomes part of the value.** `host` came back as `\"localhost  # trailing comment\"`. YAML's own spec requires a space before an inline comment and treats it as a comment, so this is a limitation of the converter, not of YAML. Quote the value or put the comment on its own line and it round-trips cleanly.",
        "**So treat the conversion as one-way.** Generate YAML from JSON, annotate the YAML, and keep the YAML as the source of truth rather than converting back and forth.",
      ],
    },
    {
      id: "advice",
      heading: "What to do",
      body: [
        "The decision is really about what the file is for. Data moving between machines does not need comments. A file a person edits does, and that file should not have been JSON.",
      ],
      points: [
        "**API payloads:** no comments, no supersets. Document the fields in a schema or in your API docs, where the reader will actually look.",
        "**A config read by one tool you control:** JSONC if the tool supports it, otherwise strip-then-parse.",
        "**A config several people edit:** move it to YAML or TOML and stop fighting the format.",
        "**Anything you need to explain in place:** if the explanation matters enough to write down, it matters enough to go in a schema `description`, which tooling can actually show to the reader.",
      ],
    },
  ],
  relatedLabel: "Try it, or read further",
  related: [
    {
      href: "/json-to-yaml/",
      label: "JSON to YAML",
      detail: "Convert once, then add the comments YAML supports natively.",
    },
    {
      href: "/wiki/en/json-vs-yaml/",
      label: "JSON vs YAML",
      detail: "Which one a given file should have been in the first place.",
    },
    {
      href: "/wiki/en/json-escaping/",
      label: "JSON escaping",
      detail: "The other rule the spec enforces that surprises people.",
    },
    {
      href: "/wiki/en/json-guide/",
      label: "Complete JSON guide",
      detail: "The full grammar, in the order you need it.",
    },
  ],
  backToWiki: "Knowledge base",
  backToTools: "JSON tools",
};

const CN: WikiArticleContent = {
  eyebrow: "语法",
  heading: "JSON 能写注释吗",
  standfirst:
    "不能。JSON 里没有注释语法，从来也没有过 —— 这个格式当初就是作为数据交换格式定的，而注释是人和人之间的说明，不是数据。答案就这么短，所以这页剩下的篇幅讲替代方案，以及哪些变通办法真能扛过构建流水线。",
  contentsLabel: "本页内容",
  sections: [
    {
      id: "short-answer",
      heading: "简短的答案",
      body: [
        "制定 JSON 的 Douglas Crockford 是刻意去掉注释的。他给出的理由是：有人开始往注释里塞解析指令，这会破坏互操作性 —— 而互操作性是这个格式存在的唯一理由。",
        "所以 `//`、`/* */` 和 `#` 全都是语法错误，在任何合规的解析器里，在任何语言里。没有开关能打开它们，因为语法里根本没有对应的产生式。",
      ],
    },
    {
      id: "what-happens",
      heading: "写了会怎样",
      body: [
        "报错里很少出现「注释」这个词，这就是为什么很多人会被绕住。解析器走到那个 `/`，而它期待的是逗号或右花括号，于是报的是后者。",
      ],
      sample: {
        inputLabel: "输入",
        input: WITH_COMMENT,
        outputLabel: "报错",
        output: PARSE_ERROR,
        note: "位置 17 就是第一个 `/`。消息里完全没提注释，所以通常的反应是回去找漏掉的逗号。",
      },
      table: {
        caption: "其他大家以为允许、其实不允许的写法。",
        headers: ["写法", "结果"],
        rows: [
          ["`// 说明` 或 `# 说明`", "语法错误"],
          ["`/* 说明 */`", "语法错误"],
          ['`{"port": 8080,}`', "语法错误：尾随逗号"],
          ["`{'port': 8080}`", "语法错误：单引号"],
          ["`{port: 8080}`", "语法错误：键没加引号"],
        ],
      },
    },
    {
      id: "json5-jsonc",
      heading: "JSON5 和 JSONC",
      body: [
        "有两个超集，选之前得知道它们的区别。两个都不是 JSON：用任一种写的文件，`JSON.parse` 和所有严格解析器都会拒绝。",
      ],
      points: [
        "**JSONC** 是 JSON 加注释和尾随逗号。仅此而已。VS Code 的 `settings.json` 用的就是它，TypeScript 编译器在 `tsconfig.json` 里接受的也是它 —— 这就是那里能写注释的原因，也难怪有人由此推断 JSON 允许注释。",
        "**JSON5** 走得远得多：键不用加引号、单引号、十六进制数字、小数点前后可以留空、`Infinity` 和 `NaN`、多行字符串。它离 JavaScript 对象字面量比离 JSON 更近。",
        "**两者都没有注册的媒体类型。** 不存在 `application/json5`，所以它们是给你自己掌控的工具用的文件格式，不是 API 的传输格式。",
      ],
      table: {
        caption: "各自能安全用在哪里。",
        headers: ["", "自己维护的配置文件", "API 请求或响应"],
        rows: [
          ["JSON", "可以", "可以"],
          ["JSONC", "读它的程序支持才行", "不行"],
          ["JSON5", "读它的程序支持才行", "不行"],
        ],
      },
    },
    {
      id: "workarounds",
      heading: "四种变通办法",
      body: ["按可靠程度排序。前两个没问题；第三个有实际代价；第四个是个坑。"],
      points: [
        "**1. 换一个本来就有注释的格式。** 如果这个文件是人在维护的配置，YAML 和 TOML 的语法里都有 `#` 注释。这不是变通，这是正解 —— 配置文件没什么理由非得是 JSON。",
        "**2. 解析前先把注释剥掉。** JSONC 风格配置的标准做法：先跑一遍剥离，再 `JSON.parse`。用真正的 JSONC 解析器，别用正则，因为正则会毫不犹豫地毁掉字符串值里的 `//`，比如一个 URL。",
        "**3. 加一个附带的键。** 这是合法 JSON，而且当文件必须保持严格时，有时只能这样。代价是它现在是数据了：会发到客户端、会出现在解析后对象的 diff 里，而任何设了 `additionalProperties: false` 的 schema 都会拒绝它。",
        '**4. 不要用加一个 `"_disabled"` 之类的键来「注释掉」一段。** 那一段照样被解析、照样存在，而下一个人不会知道这个标记本来是要覆盖哪几个键的。删掉它，历史在版本控制里。',
      ],
      sample: {
        inputLabel: "附带键的写法",
        input: SIDECAR,
        note: "合法 JSON，也读得懂。但 `_comment` 现在是你数据里的一个字段，严格的 schema 会拒绝它。",
      },
    },
    {
      id: "yaml-route",
      heading: "转成 YAML 来写注释",
      body: [
        "如果目的是要一份人能加说明的配置文件，那把 JSON 转成 YAML 一次、然后手写注释，是干净的路子。反方向才是会丢东西的地方，而这值得看清楚是怎么丢的。",
      ],
      sample: {
        inputLabel: "带注释的 YAML",
        input: YAML_INPUT,
        outputLabel: "转成 JSON",
        output: YAML_OUTPUT,
        note: "整行的注释没了，这是预期之内 —— JSON 装不下它们。但你看 `host`。",
      },
      points: [
        "**整行的 `#` 注释被丢掉。** 这是对的：JSON 里没地方放它们。",
        "**未加引号的标量后面跟的 `#` 会变成值的一部分。** `host` 回来时是 `\"localhost  # trailing comment\"`。YAML 自己的规范要求行内注释前有个空格、并把它当注释处理，所以这是转换器的局限，不是 YAML 的。给值加上引号、或者把注释单独放一行，就能干净地转回来。",
        "**所以把这个转换当成单向的。** 从 JSON 生成 YAML，在 YAML 里加说明，然后就以 YAML 为准，别来回转。",
      ],
    },
    {
      id: "advice",
      heading: "该怎么做",
      body: [
        "这个决定其实取决于文件是干什么的。在机器之间流动的数据不需要注释。人要编辑的文件需要，而那种文件本来就不该是 JSON。",
      ],
      points: [
        "**API 数据：** 不写注释，不用超集。把字段写在 schema 或 API 文档里，读的人真的会去那儿看。",
        "**只被一个你掌控的工具读取的配置：** 那个工具支持就用 JSONC，否则先剥离再解析。",
        "**多人一起改的配置：** 挪到 YAML 或 TOML，别跟格式硬扛。",
        "**任何需要就地解释的东西：** 如果这个解释值得写下来，它就值得放进 schema 的 `description`，那里工具真的能把它展示给读的人。",
      ],
    },
  ],
  relatedLabel: "去试试，或者继续读",
  related: [
    {
      href: "/json-to-yaml/",
      label: "JSON 转 YAML",
      detail: "转一次，然后写上 YAML 原生支持的注释。",
    },
    {
      href: "/wiki/cn/json-vs-yaml/",
      label: "JSON 与 YAML 对比",
      detail: "一份文件本来就该用哪个。",
    },
    {
      href: "/wiki/cn/json-escaping/",
      label: "JSON 转义",
      detail: "规范强制、但同样让人意外的另一条规则。",
    },
    {
      href: "/wiki/cn/json-guide/",
      label: "JSON 完全指南",
      detail: "完整语法，按你需要的顺序讲。",
    },
  ],
  backToWiki: "知识库",
  backToTools: "JSON 工具",
};

const ES: WikiArticleContent = {
  eyebrow: "Sintaxis",
  heading: "¿Puede JSON tener comentarios?",
  standfirst:
    "No. No hay sintaxis de comentarios en JSON y nunca la hubo: el formato se especificó como formato de intercambio de datos, y un comentario es una nota entre personas, no datos. Esa respuesta es corta, así que el resto de esta página trata de qué hacer en su lugar, y qué alternativas sobreviven al contacto con un pipeline de build.",
  contentsLabel: "En esta página",
  sections: [
    {
      id: "short-answer",
      heading: "La respuesta corta",
      body: [
        "Douglas Crockford, que especificó JSON, quitó los comentarios deliberadamente. Su razón declarada fue que la gente había empezado a poner directivas de parseo en ellos, lo que habría roto la interoperabilidad, la única propiedad por la que el formato existe.",
        "Así que `//`, `/* */` y `#` son todos errores de sintaxis, en cualquier parser conforme, en cualquier lenguaje. No hay un flag para activarlos porque la gramática no tiene ninguna producción para ellos.",
      ],
    },
    {
      id: "what-happens",
      heading: "Qué pasa si lo intentas",
      body: [
        'El error casi nunca contiene la palabra "comentario", y por eso esto despista. El parser llega al `/` donde esperaba una coma o una llave de cierre, y reporta eso.',
      ],
      sample: {
        inputLabel: "Entrada",
        input: WITH_COMMENT,
        outputLabel: "Error",
        output: PARSE_ERROR,
        note: "La posición 17 es el primer `/`. Nada en el mensaje menciona comentarios, así que la reacción habitual es buscar una coma que falta.",
      },
      table: {
        caption: "Las otras cosas que la gente asume permitidas, y no lo están.",
        headers: ["Escrito", "Resultado"],
        rows: [
          ["`// nota` o `# nota`", "Error de sintaxis"],
          ["`/* nota */`", "Error de sintaxis"],
          ['`{"port": 8080,}`', "Error de sintaxis: coma final"],
          ["`{'port': 8080}`", "Error de sintaxis: comillas simples"],
          ["`{port: 8080}`", "Error de sintaxis: clave sin comillas"],
        ],
      },
    },
    {
      id: "json5-jsonc",
      heading: "JSON5 y JSONC",
      body: [
        "Existen dos superconjuntos, y la diferencia importa al elegir. Ninguno es JSON: un archivo escrito en cualquiera de los dos será rechazado por `JSON.parse` y por todo parser estricto.",
      ],
      points: [
        "**JSONC** es JSON más comentarios y comas finales. Nada más. Es lo que usa VS Code para `settings.json` y lo que el compilador de TypeScript acepta en `tsconfig.json`, y por eso ahí los comentarios funcionan y la gente concluye, razonablemente, que JSON los permite.",
        "**JSON5** va bastante más lejos: claves sin comillas, comillas simples, números hexadecimales, puntos decimales al principio y al final, `Infinity` y `NaN`, cadenas multilínea. Está más cerca de un literal de objeto de JavaScript que de JSON.",
        "**Ninguno tiene un tipo de medio registrado.** No existe `application/json5`, así que son formatos de archivo para herramientas que controlas, no formatos de transporte para una API.",
      ],
      table: {
        caption: "Dónde es seguro usar cada uno.",
        headers: ["", "Archivo de config propio", "Petición o respuesta de API"],
        rows: [
          ["JSON", "Sí", "Sí"],
          ["JSONC", "Si el lector lo soporta", "No"],
          ["JSON5", "Si el lector lo soporta", "No"],
        ],
      },
    },
    {
      id: "workarounds",
      heading: "Las cuatro alternativas",
      body: [
        "Ordenadas por fiabilidad. Las dos primeras están bien; la tercera tiene un coste real; la cuarta es una trampa.",
      ],
      points: [
        "**1. Usa un formato que tenga comentarios.** Si el archivo es configuración que mantiene una persona, YAML y TOML soportan comentarios `#` como parte de la gramática. Esto es la solución, no un parche: un archivo de configuración no tiene motivo para ser JSON.",
        "**2. Quita los comentarios antes de parsear.** Es lo estándar para config estilo JSONC: una pasada de limpieza y luego `JSON.parse`. Usa un parser JSONC real y no una expresión regular, porque una regex destruirá alegremente un `//` que aparezca dentro de un valor de cadena, como una URL.",
        "**3. Una clave acompañante.** JSON válido, y a veces la única opción cuando el archivo debe seguir siendo estricto. El coste es que ahora es un dato: viaja a los clientes, aparece en los diffs del objeto parseado, y cualquier schema con `additionalProperties: false` la rechazará.",
        '**4. No "comentes" un bloque añadiendo una clave como `"_disabled"`.** El bloque se sigue parseando, sigue ahí, y la siguiente persona no sabrá qué claves cubría ese marcador. Bórralo; la historia está en el control de versiones.',
      ],
      sample: {
        inputLabel: "El enfoque de la clave acompañante",
        input: SIDECAR,
        note: "JSON válido, y legible. Pero `_comment` es ahora un campo de tus datos, y un schema estricto lo rechazará.",
      },
    },
    {
      id: "yaml-route",
      heading: "Convertir a YAML por los comentarios",
      body: [
        "Si el objetivo es un archivo de configuración que una persona pueda anotar, convertir el JSON a YAML una vez y luego añadir los comentarios a mano es el camino limpio. La dirección contraria es donde se pierde algo, y vale la pena ver exactamente cómo.",
      ],
      sample: {
        inputLabel: "YAML con comentarios",
        input: YAML_INPUT,
        outputLabel: "Convertido a JSON",
        output: YAML_OUTPUT,
        note: "Los comentarios de línea completa desaparecieron, lo cual es esperable: JSON no puede contenerlos. Pero mira `host`.",
      },
      points: [
        "**Los comentarios `#` de línea completa se descartan.** Comportamiento correcto: en JSON no hay dónde ponerlos.",
        '**Un `#` al final de un escalar sin comillas pasa a formar parte del valor.** `host` volvió como `"localhost  # trailing comment"`. La propia especificación de YAML exige un espacio antes de un comentario en línea y lo trata como comentario, así que es una limitación del convertidor, no de YAML. Pon el valor entre comillas o el comentario en su propia línea y el ciclo es limpio.',
        "**Así que trata la conversión como de una sola dirección.** Genera YAML desde JSON, anota el YAML y mantén el YAML como fuente de verdad en lugar de convertir de ida y vuelta.",
      ],
    },
    {
      id: "advice",
      heading: "Qué hacer",
      body: [
        "La decisión depende en realidad de para qué es el archivo. Los datos que se mueven entre máquinas no necesitan comentarios. Un archivo que edita una persona sí, y ese archivo no debería haber sido JSON.",
      ],
      points: [
        "**Payloads de API:** sin comentarios, sin superconjuntos. Documenta los campos en un schema o en tu documentación de API, donde el lector va a mirar de verdad.",
        "**Una config que lee una sola herramienta que controlas:** JSONC si la herramienta lo soporta; si no, limpiar y luego parsear.",
        "**Una config que editan varias personas:** pásala a YAML o TOML y deja de pelear con el formato.",
        "**Cualquier cosa que necesites explicar en el sitio:** si la explicación importa lo bastante para escribirla, importa lo bastante para ir en un `description` del schema, que las herramientas sí pueden mostrar al lector.",
      ],
    },
  ],
  relatedLabel: "Pruébalo, o sigue leyendo",
  related: [
    {
      href: "/json-to-yaml/",
      label: "JSON a YAML",
      detail: "Convierte una vez y añade los comentarios que YAML soporta de forma nativa.",
    },
    {
      href: "/wiki/es/json-vs-yaml/",
      label: "JSON vs YAML",
      detail: "En cuál de los dos debería haber estado el archivo desde el principio.",
    },
    {
      href: "/wiki/es/json-escaping/",
      label: "Escapado en JSON",
      detail: "La otra regla que impone la especificación y que sorprende a la gente.",
    },
    {
      href: "/wiki/es/json-guide/",
      label: "Guía completa de JSON",
      detail: "La gramática completa, en el orden en que la necesitas.",
    },
  ],
  backToWiki: "Base de conocimiento",
  backToTools: "Herramientas JSON",
};

const PT: WikiArticleContent = {
  eyebrow: "Sintaxe",
  heading: "JSON pode ter comentários?",
  standfirst:
    "Não. Não existe sintaxe de comentários em JSON e nunca existiu: o formato foi especificado como formato de intercâmbio de dados, e um comentário é uma nota entre pessoas, não dados. Essa resposta é curta, então o resto desta página trata do que fazer em vez disso, e de quais alternativas sobrevivem ao contato com um pipeline de build.",
  contentsLabel: "Nesta página",
  sections: [
    {
      id: "short-answer",
      heading: "A resposta curta",
      body: [
        "Douglas Crockford, que especificou o JSON, removeu os comentários de propósito. A razão que ele declarou foi que as pessoas tinham começado a colocar diretivas de parsing neles, o que quebraria a interoperabilidade — a única propriedade pela qual o formato existe.",
        "Então `//`, `/* */` e `#` são todos erros de sintaxe, em qualquer parser conforme, em qualquer linguagem. Não há flag para ativá-los porque a gramática não tem produção nenhuma para eles.",
      ],
    },
    {
      id: "what-happens",
      heading: "O que acontece se você tentar",
      body: [
        'O erro quase nunca contém a palavra "comentário", e é por isso que isso confunde. O parser chega no `/` onde esperava uma vírgula ou uma chave de fechamento, e reporta isso.',
      ],
      sample: {
        inputLabel: "Entrada",
        input: WITH_COMMENT,
        outputLabel: "Erro",
        output: PARSE_ERROR,
        note: "A posição 17 é a primeira `/`. Nada na mensagem menciona comentários, então a reação usual é ir procurar uma vírgula faltando.",
      },
      table: {
        caption: "As outras coisas que as pessoas presumem permitidas, e não são.",
        headers: ["Escrito", "Resultado"],
        rows: [
          ["`// nota` ou `# nota`", "Erro de sintaxe"],
          ["`/* nota */`", "Erro de sintaxe"],
          ['`{"port": 8080,}`', "Erro de sintaxe: vírgula final"],
          ["`{'port': 8080}`", "Erro de sintaxe: aspas simples"],
          ["`{port: 8080}`", "Erro de sintaxe: chave sem aspas"],
        ],
      },
    },
    {
      id: "json5-jsonc",
      heading: "JSON5 e JSONC",
      body: [
        "Existem dois superconjuntos, e a diferença importa na hora de escolher. Nenhum dos dois é JSON: um arquivo escrito em qualquer um deles será rejeitado pelo `JSON.parse` e por todo parser estrito.",
      ],
      points: [
        "**JSONC** é JSON mais comentários e vírgulas finais. Nada além disso. É o que o VS Code usa para o `settings.json` e o que o compilador do TypeScript aceita no `tsconfig.json` — e é por isso que ali os comentários funcionam e as pessoas concluem, com razão, que o JSON os permite.",
        "**JSON5** vai bem mais longe: chaves sem aspas, aspas simples, números hexadecimais, pontos decimais no início e no fim, `Infinity` e `NaN`, strings multilinha. Está mais perto de um literal de objeto JavaScript do que de JSON.",
        "**Nenhum tem tipo de mídia registrado.** Não existe `application/json5`, então são formatos de arquivo para ferramentas que você controla, não formatos de transporte para uma API.",
      ],
      table: {
        caption: "Onde é seguro usar cada um.",
        headers: ["", "Arquivo de config próprio", "Requisição ou resposta de API"],
        rows: [
          ["JSON", "Sim", "Sim"],
          ["JSONC", "Se quem lê suportar", "Não"],
          ["JSON5", "Se quem lê suportar", "Não"],
        ],
      },
    },
    {
      id: "workarounds",
      heading: "As quatro alternativas",
      body: [
        "Ordenadas por confiabilidade. As duas primeiras estão bem; a terceira tem um custo real; a quarta é uma armadilha.",
      ],
      points: [
        "**1. Use um formato que tenha comentários.** Se o arquivo é configuração que uma pessoa mantém, YAML e TOML suportam comentários `#` como parte da gramática. Isso é a solução, não um contorno: um arquivo de configuração não tem motivo para ser JSON.",
        "**2. Remova os comentários antes de parsear.** É o padrão para config no estilo JSONC: uma passada de limpeza e depois `JSON.parse`. Use um parser JSONC de verdade e não uma expressão regular, porque uma regex vai destruir alegremente um `//` que apareça dentro de um valor de string, como uma URL.",
        "**3. Uma chave acompanhante.** JSON válido, e às vezes a única opção quando o arquivo precisa continuar estrito. O custo é que agora é dado: vai para os clientes, aparece nos diffs do objeto parseado, e qualquer schema com `additionalProperties: false` vai rejeitá-la.",
        '**4. Não "comente" um bloco adicionando uma chave como `"_disabled"`.** O bloco continua sendo parseado, continua ali, e a próxima pessoa não vai saber quais chaves aquele marcador cobria. Apague; o histórico está no controle de versão.',
      ],
      sample: {
        inputLabel: "A abordagem da chave acompanhante",
        input: SIDECAR,
        note: "JSON válido, e legível. Mas `_comment` agora é um campo dos seus dados, e um schema estrito vai rejeitá-lo.",
      },
    },
    {
      id: "yaml-route",
      heading: "Converter para YAML pelos comentários",
      body: [
        "Se o objetivo é um arquivo de configuração que uma pessoa possa anotar, converter o JSON para YAML uma vez e depois adicionar os comentários à mão é o caminho limpo. A direção contrária é onde se perde algo, e vale a pena ver exatamente como.",
      ],
      sample: {
        inputLabel: "YAML com comentários",
        input: YAML_INPUT,
        outputLabel: "Convertido para JSON",
        output: YAML_OUTPUT,
        note: "Os comentários de linha inteira sumiram, o que é esperado: o JSON não consegue guardá-los. Mas olhe o `host`.",
      },
      points: [
        "**Comentários `#` de linha inteira são descartados.** Comportamento correto: no JSON não há onde colocá-los.",
        '**Um `#` no fim de um escalar sem aspas passa a fazer parte do valor.** O `host` voltou como `"localhost  # trailing comment"`. A própria especificação do YAML exige um espaço antes de um comentário em linha e o trata como comentário, então isso é uma limitação do conversor, não do YAML. Coloque o valor entre aspas ou o comentário em uma linha própria e o ciclo fica limpo.',
        "**Então trate a conversão como de mão única.** Gere YAML a partir do JSON, anote o YAML e mantenha o YAML como fonte da verdade em vez de converter de ida e volta.",
      ],
    },
    {
      id: "advice",
      heading: "O que fazer",
      body: [
        "A decisão depende, na verdade, do que o arquivo é. Dados que se movem entre máquinas não precisam de comentários. Um arquivo que uma pessoa edita precisa, e esse arquivo não deveria ter sido JSON.",
      ],
      points: [
        "**Payloads de API:** sem comentários, sem superconjuntos. Documente os campos em um schema ou na sua documentação de API, onde quem lê realmente vai olhar.",
        "**Uma config lida por uma única ferramenta que você controla:** JSONC se a ferramenta suportar; se não, limpar e depois parsear.",
        "**Uma config que várias pessoas editam:** mude para YAML ou TOML e pare de brigar com o formato.",
        "**Qualquer coisa que você precise explicar no lugar:** se a explicação importa o bastante para ser escrita, importa o bastante para ir em um `description` do schema, que as ferramentas conseguem de fato mostrar a quem lê.",
      ],
    },
  ],
  relatedLabel: "Experimente, ou continue lendo",
  related: [
    {
      href: "/json-to-yaml/",
      label: "JSON para YAML",
      detail: "Converta uma vez e adicione os comentários que o YAML suporta nativamente.",
    },
    {
      href: "/wiki/pt/json-vs-yaml/",
      label: "JSON vs YAML",
      detail: "Em qual dos dois o arquivo deveria estar desde o começo.",
    },
    {
      href: "/wiki/pt/json-escaping/",
      label: "Escape em JSON",
      detail: "A outra regra que a especificação impõe e que surpreende as pessoas.",
    },
    {
      href: "/wiki/pt/json-guide/",
      label: "Guia completo de JSON",
      detail: "A gramática completa, na ordem em que você precisa dela.",
    },
  ],
  backToWiki: "Base de conhecimento",
  backToTools: "Ferramentas JSON",
};

export const CONTENT: Record<WikiLocale, WikiArticleContent> = {
  en: EN,
  cn: CN,
  es: ES,
  pt: PT,
};

/** The verified samples, exported so `tests/wiki.test.ts` can re-derive them. */
export const SAMPLES = {
  withComment: WITH_COMMENT,
  yamlInput: YAML_INPUT,
  yamlOutput: YAML_OUTPUT,
  sidecar: SIDECAR,
};
