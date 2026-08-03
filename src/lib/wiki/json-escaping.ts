/**
 * `json-escaping`, all four locales.
 *
 * Every sample is real output from `escapeJSON` / `unescapeJSON` in
 * `@/lib/utils`, captured by running them. `tests/wiki.test.ts` re-derives each
 * one so the article cannot drift from the buttons it describes.
 */

import type { WikiArticleContent } from "@/lib/wikiArticle";
import type { WikiLocale, WikiMetaInput } from "@/lib/wikiMeta";

export const SLUG = "json-escaping";
export const REVISED = "2026-08-03";

const PLAIN = `{"user":{"name":"Ada"},"ok":true}`;

const ESCAPED_ONCE = `"{\\"user\\":{\\"name\\":\\"Ada\\"},\\"ok\\":true}"`;

const ESCAPED_TWICE = `"\\"{\\\\\\"user\\\\\\":{\\\\\\"name\\\\\\":\\\\\\"Ada\\\\\\"},\\\\\\"ok\\\\\\":true}\\""`;

const UNESCAPED_PRETTY = `{
  "user": {
    "name": "Ada"
  },
  "ok": true
}`;

const CONTROL_INPUT = `{"s":"a\\tb\\r\\nc"}`;

const CONTROL_OUTPUT = `"{\\"s\\":\\"a\\\\tb\\\\r\\\\nc\\"}"`;

const UNICODE_INPUT = `{"s":"café 中文 😀"}`;

const UNICODE_OUTPUT = `"{\\"s\\":\\"café 中文 😀\\"}"`;

export const META: Record<WikiLocale, WikiMetaInput> = {
  en: {
    locale: "en",
    slug: SLUG,
    title: "JSON Escaping: Why Your Log Line Is Full of \\\"",
    description:
      "What escaping actually does, why a JSON string inside a JSON string doubles every backslash, and how to read a payload back out of a log line.",
    keywords:
      "JSON escaping,unescape JSON,escaped JSON string,backslash JSON,double encoded JSON",
    socialTitle: "JSON escaping, explained",
    section: "Syntax",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
  cn: {
    locale: "cn",
    slug: SLUG,
    title: '为什么日志里全是 \\" —— JSON 转义详解',
    description:
      "转义到底做了什么，为什么 JSON 字符串套 JSON 字符串会让每个反斜杠翻倍，以及怎么把数据从一行日志里还原出来。",
    keywords: "JSON 转义, JSON 去转义, 转义的 JSON 字符串, JSON 反斜杠, 双重编码 JSON",
    socialTitle: "JSON 转义详解",
    section: "语法",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
  es: {
    locale: "es",
    slug: SLUG,
    title: 'Escapado JSON: por qué tu log está lleno de \\"',
    description:
      "Qué hace realmente el escapado, por qué una cadena JSON dentro de otra duplica cada barra invertida, y cómo recuperar los datos de una línea de log.",
    keywords:
      "escapado JSON,desescapar JSON,cadena JSON escapada,barra invertida JSON,JSON doble codificado",
    socialTitle: "Escapado JSON explicado",
    section: "Sintaxis",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
  pt: {
    locale: "pt",
    slug: SLUG,
    title: 'Escape em JSON: por que seu log está cheio de \\"',
    description:
      "O que o escape realmente faz, por que uma string JSON dentro de outra dobra cada barra invertida, e como recuperar os dados de uma linha de log.",
    keywords:
      "escape JSON,remover escape JSON,string JSON escapada,barra invertida JSON,JSON duplamente codificado",
    socialTitle: "Escape em JSON explicado",
    section: "Sintaxe",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
};

const EN: WikiArticleContent = {
  eyebrow: "Syntax",
  heading: "JSON escaping",
  standfirst:
    "You pasted something out of a log file and it is unreadable — every quote has a backslash in front of it, and the braces are inside quotes. Nothing is broken. You are looking at a JSON document that was stored as a JSON string, and there is a mechanical way back.",
  contentsLabel: "On this page",
  sections: [
    {
      id: "what-it-is",
      heading: "What escaping is for",
      body: [
        "A JSON string is delimited by double quotes. So the moment the text inside needs a double quote of its own, there is a conflict: the parser would read that quote as the end of the string. Escaping resolves it by putting a backslash in front — `\\\"` means a literal quote character, not a delimiter.",
        "The same trick covers everything else that cannot appear raw inside a string: the backslash itself, and the control characters below `U+0020`.",
      ],
      table: {
        caption: "The complete set of escapes JSON defines. There are no others.",
        headers: ["Escape", "Means"],
        rows: [
          ['`\\"`', "A double quote, not the end of the string"],
          ["`\\\\`", "One literal backslash"],
          ["`\\n`", "Newline"],
          ["`\\r`", "Carriage return"],
          ["`\\t`", "Tab"],
          ["`\\b` `\\f`", "Backspace and form feed"],
          ["`\\/`", "A forward slash. Legal, but never required"],
          ["`\\uXXXX`", "Any character by code point"],
        ],
      },
    },
    {
      id: "not-escaped",
      heading: "What does not need escaping",
      body: [
        "This is worth stating because over-escaping is as common as under-escaping. Non-ASCII text does not need to be escaped at all. JSON is Unicode, so accented letters, Chinese characters, and emoji are all valid raw inside a string.",
      ],
      sample: {
        inputLabel: "Input JSON",
        input: UNICODE_INPUT,
        outputLabel: "After escaping",
        output: UNICODE_OUTPUT,
        note: "Only the structural quotes gained a backslash. `café`, `中文`, and the emoji passed through untouched — `\\u00e9` would have been legal too, just unreadable.",
      },
      points: [
        "**Forward slashes never need it.** `https://example.com` is fine as-is. `\\/` is legal and some encoders emit it, which is why URLs in logs often look strange for no reason.",
        "**Single quotes never need it.** They have no special meaning in JSON, so `\\'` is not a valid escape — it is an error.",
        "**Control characters always need it.** A raw tab or newline inside a string is invalid JSON. They become `\\t` and `\\n`; anything more obscure becomes `\\u0001`-style.",
      ],
    },
    {
      id: "control-chars",
      heading: "Control characters",
      body: [
        "A tab and a newline inside a string value cannot be written literally, so they come out as two-character escapes. This is the one case where escaping changes the byte count in a way people notice: a multi-line string gets visibly longer.",
      ],
      sample: {
        inputLabel: "Input JSON",
        input: CONTROL_INPUT,
        outputLabel: "After escaping",
        output: CONTROL_OUTPUT,
        note: "The `\\t` in the input was already an escape. After one round it is `\\\\t` — a backslash followed by a `t`, which is how a nested layer preserves it.",
      },
    },
    {
      id: "nesting",
      heading: "Why the backslashes multiply",
      body: [
        "Here is the actual cause of the mess. A service logs a request body by putting the whole JSON document into a string field of another JSON document. The inner document's quotes now sit inside a string, so every one of them gets a backslash.",
      ],
      sample: {
        inputLabel: "The payload",
        input: PLAIN,
        outputLabel: "Stored as a JSON string",
        output: ESCAPED_ONCE,
        note: "The braces are now inside quotes: the whole document has become one string value.",
      },
    },
    {
      id: "double",
      heading: "Two layers, and the doubling",
      body: [
        "Do it twice — a service logs a message that already contained a logged payload — and each backslash from the first round now needs escaping itself. One quote becomes `\\\\\\\"`: an escaped backslash followed by an escaped quote.",
        "This is why the count looks arbitrary. It is not: each layer roughly doubles the backslashes, so 1, 3, 7 backslashes means one, two, three layers of encoding.",
      ],
      sample: {
        inputLabel: "One layer",
        input: ESCAPED_ONCE,
        outputLabel: "Two layers",
        output: ESCAPED_TWICE,
        note: "Counting backslashes before a quote tells you how many times to unescape. Three means twice.",
      },
    },
    {
      id: "getting-back",
      heading: "Getting the payload back",
      body: [
        "Unescaping is the inverse, one layer at a time. Feed the escaped string in and you get the document back, formatted:",
      ],
      sample: {
        inputLabel: "Escaped input",
        input: ESCAPED_ONCE,
        outputLabel: "After removing escapes",
        output: UNESCAPED_PRETTY,
        note: "Real output from the Remove Escapes button on the formatter.",
      },
      points: [
        "**One press removes one layer.** A double-encoded string comes back as a still-escaped string, not as the document. Press again.",
        "**The button is disabled when there is nothing to remove.** It only lights up when the input parses as a string that itself parses as JSON — so a plain document cannot be mangled by an accidental click.",
        "**Paste an escaped payload and the formatter notices.** It says so rather than silently reformatting, because a string that happens to contain JSON and a JSON document are different things.",
      ],
    },
    {
      id: "avoiding",
      heading: "Avoiding it in the first place",
      body: [
        "Nested encoding is almost always accidental. If you control the code producing it, these are the fixes, in order of how much they help.",
      ],
      points: [
        "**Log structured, not stringified.** Most loggers accept an object for a field. `logger.info({ body: payload })` nests properly; `JSON.stringify(payload)` creates the layer you then have to peel.",
        "**Do not stringify before storing in a JSON column.** Postgres `jsonb` and its equivalents take the value directly. Stringifying first stores a string, and every query against it needs a cast.",
        "**Never build JSON by concatenating strings.** That is where under-escaping comes from — a quote in someone's surname ends the string early and the whole payload becomes invalid. Serialise with a library.",
        "**Check message queue payloads.** A body that is already JSON does not need re-encoding on the way into a queue that carries text.",
      ],
    },
  ],
  relatedLabel: "Try it, or read further",
  related: [
    {
      href: "/",
      label: "JSON formatter",
      detail: "Has Escape and Remove Escapes in the toolbar, and detects escaped input on paste.",
    },
    {
      href: "/wiki/en/json-validation/",
      label: "JSON validation and Schema",
      detail: "The other half of why a payload gets rejected.",
    },
    {
      href: "/wiki/en/json-comments/",
      label: "Can JSON have comments?",
      detail: "Another thing the spec does not allow, and what to do about it.",
    },
    {
      href: "/wiki/en/json-guide/",
      label: "Complete JSON guide",
      detail: "Syntax, types, and the rules behind the errors.",
    },
  ],
  backToWiki: "Knowledge base",
  backToTools: "JSON tools",
};

const CN: WikiArticleContent = {
  eyebrow: "语法",
  heading: "JSON 转义",
  standfirst:
    "你从日志里复制出一段东西，完全读不了 —— 每个引号前面都有反斜杠，花括号还被包在引号里。这不是坏了。你看到的是一份被当成 JSON 字符串存起来的 JSON 文档，而回去的路是有章法的。",
  contentsLabel: "本页内容",
  sections: [
    {
      id: "what-it-is",
      heading: "转义是为了什么",
      body: [
        "JSON 字符串用双引号界定。所以一旦里面的文本自己需要一个双引号，冲突就来了：解析器会把那个引号当成字符串结束。转义的办法是在前面加个反斜杠 —— `\\\"` 表示一个真正的引号字符，不是界定符。",
        "同一招也覆盖其他不能原样出现在字符串里的东西：反斜杠本身，以及 `U+0020` 以下的控制字符。",
      ],
      table: {
        caption: "JSON 定义的全部转义序列。没有别的了。",
        headers: ["转义", "含义"],
        rows: [
          ['`\\"`', "一个双引号，不是字符串结束"],
          ["`\\\\`", "一个真正的反斜杠"],
          ["`\\n`", "换行"],
          ["`\\r`", "回车"],
          ["`\\t`", "制表符"],
          ["`\\b` `\\f`", "退格与换页"],
          ["`\\/`", "正斜杠。合法，但从不必需"],
          ["`\\uXXXX`", "按码点表示任意字符"],
        ],
      },
    },
    {
      id: "not-escaped",
      heading: "哪些不需要转义",
      body: [
        "这点值得单独讲，因为转义过度和转义不足一样常见。非 ASCII 文本完全不需要转义。JSON 本身就是 Unicode，所以带音标的字母、汉字、emoji 原样放在字符串里都是合法的。",
      ],
      sample: {
        inputLabel: "输入 JSON",
        input: UNICODE_INPUT,
        outputLabel: "转义后",
        output: UNICODE_OUTPUT,
        note: "只有结构性的引号多了反斜杠。`café`、`中文` 和 emoji 都原样穿过去了 —— 写成 `\\u00e9` 也合法，只是没人读得懂。",
      },
      points: [
        "**正斜杠永远不需要。** `https://example.com` 直接写就行。`\\/` 是合法的，有些编码器会输出它，这就是日志里的 URL 常常莫名其妙很难看的原因。",
        "**单引号永远不需要。** 它在 JSON 里没有特殊含义，所以 `\\'` 不是合法转义，是错误。",
        "**控制字符永远需要。** 字符串里出现真正的制表符或换行是非法 JSON。它们变成 `\\t` 和 `\\n`；更冷僻的会变成 `\\u0001` 这种形式。",
      ],
    },
    {
      id: "control-chars",
      heading: "控制字符",
      body: [
        "字符串值里的制表符和换行不能直接写，所以会变成两个字符的转义序列。这是转义唯一一处会让长度变化到肉眼可见的地方：多行字符串会明显变长。",
      ],
      sample: {
        inputLabel: "输入 JSON",
        input: CONTROL_INPUT,
        outputLabel: "转义后",
        output: CONTROL_OUTPUT,
        note: "输入里的 `\\t` 本来就是个转义序列。转一轮之后变成 `\\\\t` —— 一个反斜杠加一个 `t`，这就是外层如何把它保住的。",
      },
    },
    {
      id: "nesting",
      heading: "反斜杠为什么会翻倍",
      body: [
        "这才是那团乱麻真正的来源。某个服务要记录请求体，做法是把整份 JSON 文档塞进另一份 JSON 文档的一个字符串字段里。内层文档的引号现在处于字符串内部，于是每一个都得到一个反斜杠。",
      ],
      sample: {
        inputLabel: "原始数据",
        input: PLAIN,
        outputLabel: "作为 JSON 字符串存起来",
        output: ESCAPED_ONCE,
        note: "花括号现在在引号里面了：整份文档变成了一个字符串值。",
      },
    },
    {
      id: "double",
      heading: "两层，以及翻倍",
      body: [
        "做两次 —— 某个服务记录了一条本身就含着已记录数据的消息 —— 第一轮产生的每个反斜杠现在自己也需要转义。一个引号变成 `\\\\\\\"`：一个被转义的反斜杠，跟一个被转义的引号。",
        "所以数量看着像是随机的。其实不是：每一层大致让反斜杠翻一倍，所以 1 个、3 个、7 个反斜杠分别对应一层、两层、三层编码。",
      ],
      sample: {
        inputLabel: "一层",
        input: ESCAPED_ONCE,
        outputLabel: "两层",
        output: ESCAPED_TWICE,
        note: "数一下引号前面有几个反斜杠，就知道要去转义几次。三个就是两次。",
      },
    },
    {
      id: "getting-back",
      heading: "把数据还原出来",
      body: ["去转义就是反向操作，一次一层。把转义过的字符串贴进去，就能拿回格式化好的文档："],
      sample: {
        inputLabel: "转义过的输入",
        input: ESCAPED_ONCE,
        outputLabel: "去掉转义后",
        output: UNESCAPED_PRETTY,
        note: "这是格式化工具上「去除转义」按钮的真实输出。",
      },
      points: [
        "**按一次去掉一层。** 双重编码的字符串还原出来仍然是个转义过的字符串，不是文档。再按一次。",
        "**没东西可去掉时按钮是禁用的。** 只有当输入能解析成字符串、而这个字符串本身又能解析成 JSON 时它才亮起 —— 所以误点一下不会把一份正常文档搞坏。",
        "**贴进转义过的数据时格式化工具会认出来。** 它会明确告诉你，而不是默默重新排版，因为「恰好含着 JSON 的字符串」和「JSON 文档」是两回事。",
      ],
    },
    {
      id: "avoiding",
      heading: "从源头避免",
      body: ["嵌套编码几乎都是意外。如果产生它的代码在你手上，下面这些是修法，按收益从大到小排。"],
      points: [
        "**日志记结构，别记字符串。** 多数日志库的字段可以直接收一个对象。`logger.info({ body: payload })` 会正确嵌套；`JSON.stringify(payload)` 制造的就是你后面要一层层剥的那一层。",
        "**存进 JSON 列之前不要先 stringify。** Postgres 的 `jsonb` 之类直接收值。先 stringify 存进去的是个字符串，之后每次查询都要加一次类型转换。",
        "**永远不要用拼字符串的方式造 JSON。** 转义不足就是这么来的 —— 某人姓名里的一个引号提前结束了字符串，整份数据就非法了。用库去序列化。",
        "**检查消息队列里的内容。** 本来就是 JSON 的消息体，进入一个承载文本的队列时不需要再编码一次。",
      ],
    },
  ],
  relatedLabel: "去试试，或者继续读",
  related: [
    {
      href: "/",
      label: "JSON 格式化",
      detail: "工具栏里有「转义」和「去除转义」，粘贴转义过的内容时会自动认出来。",
    },
    {
      href: "/wiki/cn/json-validation/",
      label: "JSON 校验与 Schema",
      detail: "数据被拒的另一半原因。",
    },
    {
      href: "/wiki/cn/json-comments/",
      label: "JSON 能写注释吗",
      detail: "规范同样不允许的另一件事，以及能怎么办。",
    },
    {
      href: "/wiki/cn/json-guide/",
      label: "JSON 完全指南",
      detail: "语法、类型，以及那些报错背后的规则。",
    },
  ],
  backToWiki: "知识库",
  backToTools: "JSON 工具",
};

const ES: WikiArticleContent = {
  eyebrow: "Sintaxis",
  heading: "Escapado en JSON",
  standfirst:
    "Copiaste algo de un archivo de log y es ilegible: cada comilla lleva una barra invertida delante y las llaves están dentro de comillas. Nada está roto. Estás viendo un documento JSON que se guardó como una cadena JSON, y hay una forma mecánica de volver.",
  contentsLabel: "En esta página",
  sections: [
    {
      id: "what-it-is",
      heading: "Para qué sirve el escapado",
      body: [
        "Una cadena JSON se delimita con comillas dobles. Así que en cuanto el texto interior necesita una comilla doble propia, hay un conflicto: el parser leería esa comilla como el fin de la cadena. El escapado lo resuelve poniendo una barra invertida delante — `\\\"` significa un carácter de comilla literal, no un delimitador.",
        "El mismo truco cubre todo lo demás que no puede aparecer en crudo dentro de una cadena: la propia barra invertida y los caracteres de control por debajo de `U+0020`.",
      ],
      table: {
        caption: "El conjunto completo de escapes que define JSON. No hay otros.",
        headers: ["Escape", "Significa"],
        rows: [
          ['`\\"`', "Una comilla doble, no el fin de la cadena"],
          ["`\\\\`", "Una barra invertida literal"],
          ["`\\n`", "Salto de línea"],
          ["`\\r`", "Retorno de carro"],
          ["`\\t`", "Tabulación"],
          ["`\\b` `\\f`", "Retroceso y salto de página"],
          ["`\\/`", "Una barra normal. Legal, pero nunca obligatoria"],
          ["`\\uXXXX`", "Cualquier carácter por punto de código"],
        ],
      },
    },
    {
      id: "not-escaped",
      heading: "Qué no necesita escaparse",
      body: [
        "Vale la pena decirlo porque escapar de más es tan común como escapar de menos. El texto no ASCII no necesita escaparse en absoluto. JSON es Unicode, así que las letras acentuadas, los caracteres chinos y los emoji son válidos en crudo dentro de una cadena.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: UNICODE_INPUT,
        outputLabel: "Tras escapar",
        output: UNICODE_OUTPUT,
        note: "Solo las comillas estructurales ganaron una barra invertida. `café`, `中文` y el emoji pasaron intactos — `\\u00e9` también habría sido legal, solo ilegible.",
      },
      points: [
        "**Las barras normales nunca lo necesitan.** `https://example.com` está bien tal cual. `\\/` es legal y algunos codificadores lo emiten, y por eso las URLs en los logs a menudo se ven raras sin motivo.",
        "**Las comillas simples nunca lo necesitan.** No tienen significado especial en JSON, así que `\\'` no es un escape válido: es un error.",
        "**Los caracteres de control siempre lo necesitan.** Una tabulación o un salto de línea en crudo dentro de una cadena es JSON inválido. Se vuelven `\\t` y `\\n`; algo más raro se vuelve del estilo `\\u0001`.",
      ],
    },
    {
      id: "control-chars",
      heading: "Caracteres de control",
      body: [
        "Una tabulación y un salto de línea dentro de un valor de cadena no pueden escribirse literalmente, así que salen como escapes de dos caracteres. Es el único caso donde el escapado cambia el tamaño de forma que la gente lo nota: una cadena multilínea se alarga visiblemente.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: CONTROL_INPUT,
        outputLabel: "Tras escapar",
        output: CONTROL_OUTPUT,
        note: "El `\\t` de la entrada ya era un escape. Tras una ronda es `\\\\t` — una barra invertida seguida de una `t`, que es cómo una capa anidada lo preserva.",
      },
    },
    {
      id: "nesting",
      heading: "Por qué se multiplican las barras",
      body: [
        "Aquí está la causa real del desastre. Un servicio registra un cuerpo de petición metiendo el documento JSON entero en un campo de cadena de otro documento JSON. Las comillas del documento interior quedan ahora dentro de una cadena, así que cada una recibe una barra invertida.",
      ],
      sample: {
        inputLabel: "Los datos",
        input: PLAIN,
        outputLabel: "Guardados como cadena JSON",
        output: ESCAPED_ONCE,
        note: "Las llaves están ahora dentro de comillas: el documento entero se ha vuelto un único valor de cadena.",
      },
    },
    {
      id: "double",
      heading: "Dos capas, y la duplicación",
      body: [
        "Hazlo dos veces — un servicio registra un mensaje que ya contenía datos registrados — y cada barra invertida de la primera ronda necesita ahora escaparse a su vez. Una comilla se vuelve `\\\\\\\"`: una barra invertida escapada seguida de una comilla escapada.",
        "Por eso el número parece arbitrario. No lo es: cada capa aproximadamente duplica las barras, así que 1, 3 o 7 barras significan una, dos o tres capas de codificación.",
      ],
      sample: {
        inputLabel: "Una capa",
        input: ESCAPED_ONCE,
        outputLabel: "Dos capas",
        output: ESCAPED_TWICE,
        note: "Contar las barras antes de una comilla te dice cuántas veces desescapar. Tres significa dos veces.",
      },
    },
    {
      id: "getting-back",
      heading: "Recuperar los datos",
      body: [
        "Desescapar es la inversa, una capa a la vez. Introduce la cadena escapada y recuperas el documento, ya formateado:",
      ],
      sample: {
        inputLabel: "Entrada escapada",
        input: ESCAPED_ONCE,
        outputLabel: "Tras quitar los escapes",
        output: UNESCAPED_PRETTY,
        note: "Salida real del botón Quitar escapes del formateador.",
      },
      points: [
        "**Una pulsación quita una capa.** Una cadena doblemente codificada vuelve como una cadena aún escapada, no como el documento. Púlsalo otra vez.",
        "**El botón está deshabilitado cuando no hay nada que quitar.** Solo se activa cuando la entrada se parsea como una cadena que a su vez se parsea como JSON, así que un clic accidental no puede estropear un documento normal.",
        "**Si pegas datos escapados, el formateador lo detecta.** Lo dice en lugar de reformatear en silencio, porque una cadena que casualmente contiene JSON y un documento JSON son cosas distintas.",
      ],
    },
    {
      id: "avoiding",
      heading: "Evitarlo desde el principio",
      body: [
        "La codificación anidada casi siempre es accidental. Si controlas el código que la produce, estas son las soluciones, ordenadas por cuánto ayudan.",
      ],
      points: [
        "**Registra estructurado, no serializado.** La mayoría de los loggers aceptan un objeto para un campo. `logger.info({ body: payload })` anida correctamente; `JSON.stringify(payload)` crea la capa que luego tienes que pelar.",
        "**No serialices antes de guardar en una columna JSON.** El `jsonb` de Postgres y equivalentes toman el valor directamente. Serializar primero guarda una cadena, y cada consulta contra ella necesita un cast.",
        "**Nunca construyas JSON concatenando cadenas.** De ahí viene el escapado insuficiente: una comilla en el apellido de alguien termina la cadena antes de tiempo y todo el payload se vuelve inválido. Serializa con una librería.",
        "**Revisa los payloads de las colas de mensajes.** Un cuerpo que ya es JSON no necesita recodificarse al entrar en una cola que transporta texto.",
      ],
    },
  ],
  relatedLabel: "Pruébalo, o sigue leyendo",
  related: [
    {
      href: "/",
      label: "Formateador JSON",
      detail: "Tiene Escapar y Quitar escapes en la barra, y detecta entrada escapada al pegar.",
    },
    {
      href: "/wiki/es/json-validation/",
      label: "Validación y Schema JSON",
      detail: "La otra mitad de por qué se rechaza un payload.",
    },
    {
      href: "/wiki/es/json-comments/",
      label: "¿Puede JSON llevar comentarios?",
      detail: "Otra cosa que la especificación no permite, y qué hacer al respecto.",
    },
    {
      href: "/wiki/es/json-guide/",
      label: "Guía completa de JSON",
      detail: "Sintaxis, tipos y las reglas detrás de los errores.",
    },
  ],
  backToWiki: "Base de conocimiento",
  backToTools: "Herramientas JSON",
};

const PT: WikiArticleContent = {
  eyebrow: "Sintaxe",
  heading: "Escape em JSON",
  standfirst:
    "Você copiou algo de um arquivo de log e está ilegível: cada aspa tem uma barra invertida na frente e as chaves estão dentro de aspas. Nada está quebrado. Você está vendo um documento JSON que foi guardado como uma string JSON, e existe um caminho mecânico de volta.",
  contentsLabel: "Nesta página",
  sections: [
    {
      id: "what-it-is",
      heading: "Para que serve o escape",
      body: [
        "Uma string JSON é delimitada por aspas duplas. Então no momento em que o texto interno precisa de uma aspa dupla própria, há um conflito: o parser leria essa aspa como o fim da string. O escape resolve colocando uma barra invertida na frente — `\\\"` significa um caractere de aspa literal, não um delimitador.",
        "O mesmo truque cobre todo o resto que não pode aparecer cru dentro de uma string: a própria barra invertida e os caracteres de controle abaixo de `U+0020`.",
      ],
      table: {
        caption: "O conjunto completo de escapes que o JSON define. Não há outros.",
        headers: ["Escape", "Significa"],
        rows: [
          ['`\\"`', "Uma aspa dupla, não o fim da string"],
          ["`\\\\`", "Uma barra invertida literal"],
          ["`\\n`", "Nova linha"],
          ["`\\r`", "Retorno de carro"],
          ["`\\t`", "Tabulação"],
          ["`\\b` `\\f`", "Backspace e form feed"],
          ["`\\/`", "Uma barra normal. Legal, mas nunca obrigatória"],
          ["`\\uXXXX`", "Qualquer caractere por ponto de código"],
        ],
      },
    },
    {
      id: "not-escaped",
      heading: "O que não precisa de escape",
      body: [
        "Vale dizer porque escapar demais é tão comum quanto escapar de menos. Texto não ASCII não precisa de escape nenhum. JSON é Unicode, então letras acentuadas, caracteres chineses e emoji são todos válidos crus dentro de uma string.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: UNICODE_INPUT,
        outputLabel: "Depois do escape",
        output: UNICODE_OUTPUT,
        note: "Só as aspas estruturais ganharam barra invertida. `café`, `中文` e o emoji passaram intactos — `\\u00e9` também seria legal, só ilegível.",
      },
      points: [
        "**Barras normais nunca precisam.** `https://example.com` está bem como está. `\\/` é legal e alguns codificadores emitem, e é por isso que URLs em logs muitas vezes ficam estranhas sem motivo.",
        "**Aspas simples nunca precisam.** Não têm significado especial em JSON, então `\\'` não é um escape válido: é um erro.",
        "**Caracteres de controle sempre precisam.** Uma tabulação ou nova linha crua dentro de uma string é JSON inválido. Viram `\\t` e `\\n`; algo mais obscuro vira do tipo `\\u0001`.",
      ],
    },
    {
      id: "control-chars",
      heading: "Caracteres de controle",
      body: [
        "Uma tabulação e uma nova linha dentro de um valor de string não podem ser escritas literalmente, então saem como escapes de dois caracteres. É o único caso em que o escape muda o tamanho de um jeito que as pessoas notam: uma string multilinha fica visivelmente mais longa.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: CONTROL_INPUT,
        outputLabel: "Depois do escape",
        output: CONTROL_OUTPUT,
        note: "O `\\t` da entrada já era um escape. Depois de uma rodada é `\\\\t` — uma barra invertida seguida de um `t`, que é como uma camada aninhada o preserva.",
      },
    },
    {
      id: "nesting",
      heading: "Por que as barras se multiplicam",
      body: [
        "Aqui está a causa real da confusão. Um serviço registra um corpo de requisição colocando o documento JSON inteiro em um campo de string de outro documento JSON. As aspas do documento interno agora ficam dentro de uma string, então cada uma recebe uma barra invertida.",
      ],
      sample: {
        inputLabel: "Os dados",
        input: PLAIN,
        outputLabel: "Guardados como string JSON",
        output: ESCAPED_ONCE,
        note: "As chaves agora estão dentro de aspas: o documento inteiro virou um único valor de string.",
      },
    },
    {
      id: "double",
      heading: "Duas camadas, e a duplicação",
      body: [
        "Faça duas vezes — um serviço registra uma mensagem que já continha dados registrados — e cada barra invertida da primeira rodada agora precisa de escape ela mesma. Uma aspa vira `\\\\\\\"`: uma barra invertida escapada seguida de uma aspa escapada.",
        "É por isso que a contagem parece arbitrária. Não é: cada camada aproximadamente dobra as barras, então 1, 3 ou 7 barras significam uma, duas ou três camadas de codificação.",
      ],
      sample: {
        inputLabel: "Uma camada",
        input: ESCAPED_ONCE,
        outputLabel: "Duas camadas",
        output: ESCAPED_TWICE,
        note: "Contar as barras antes de uma aspa diz quantas vezes remover o escape. Três significa duas vezes.",
      },
    },
    {
      id: "getting-back",
      heading: "Recuperar os dados",
      body: [
        "Remover o escape é o inverso, uma camada por vez. Coloque a string escapada e você recupera o documento, já formatado:",
      ],
      sample: {
        inputLabel: "Entrada escapada",
        input: ESCAPED_ONCE,
        outputLabel: "Depois de remover os escapes",
        output: UNESCAPED_PRETTY,
        note: "Saída real do botão Remover escapes do formatador.",
      },
      points: [
        "**Um toque remove uma camada.** Uma string duplamente codificada volta como uma string ainda escapada, não como o documento. Toque de novo.",
        "**O botão fica desabilitado quando não há nada a remover.** Ele só acende quando a entrada é parseada como uma string que por sua vez é parseada como JSON, então um clique acidental não estraga um documento normal.",
        "**Se você cola dados escapados, o formatador percebe.** Ele avisa em vez de reformatar em silêncio, porque uma string que por acaso contém JSON e um documento JSON são coisas diferentes.",
      ],
    },
    {
      id: "avoiding",
      heading: "Evitar desde o começo",
      body: [
        "Codificação aninhada é quase sempre acidental. Se você controla o código que a produz, estas são as correções, na ordem de quanto ajudam.",
      ],
      points: [
        "**Registre estruturado, não serializado.** A maioria dos loggers aceita um objeto para um campo. `logger.info({ body: payload })` aninha corretamente; `JSON.stringify(payload)` cria a camada que você depois tem que descascar.",
        "**Não serialize antes de guardar em uma coluna JSON.** O `jsonb` do Postgres e equivalentes recebem o valor direto. Serializar primeiro guarda uma string, e toda consulta contra ela precisa de um cast.",
        "**Nunca construa JSON concatenando strings.** É de lá que vem o escape insuficiente: uma aspa no sobrenome de alguém termina a string antes da hora e todo o payload fica inválido. Serialize com uma biblioteca.",
        "**Confira os payloads de filas de mensagens.** Um corpo que já é JSON não precisa ser recodificado ao entrar numa fila que transporta texto.",
      ],
    },
  ],
  relatedLabel: "Experimente, ou continue lendo",
  related: [
    {
      href: "/",
      label: "Formatador JSON",
      detail: "Tem Escapar e Remover escapes na barra, e detecta entrada escapada ao colar.",
    },
    {
      href: "/wiki/pt/json-validation/",
      label: "Validação e Schema JSON",
      detail: "A outra metade do motivo pelo qual um payload é rejeitado.",
    },
    {
      href: "/wiki/pt/json-comments/",
      label: "JSON pode ter comentários?",
      detail: "Outra coisa que a especificação não permite, e o que fazer a respeito.",
    },
    {
      href: "/wiki/pt/json-guide/",
      label: "Guia completo de JSON",
      detail: "Sintaxe, tipos e as regras por trás dos erros.",
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
  plain: PLAIN,
  escapedOnce: ESCAPED_ONCE,
  escapedTwice: ESCAPED_TWICE,
  unescapedPretty: UNESCAPED_PRETTY,
  controlInput: CONTROL_INPUT,
  controlOutput: CONTROL_OUTPUT,
  unicodeInput: UNICODE_INPUT,
  unicodeOutput: UNICODE_OUTPUT,
};
