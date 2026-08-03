/**
 * `json-vs-yaml`, all four locales.
 *
 * Every sample below is real output from `jsonToYAML` / `yamlToJSON` in
 * `@/lib/json/formats`, captured by running them. `tests/wiki.test.ts` re-runs
 * them and fails if the converters ever stop producing exactly this, so the
 * article cannot quietly start lying about the tool it links to.
 */

import type { WikiArticleContent } from "@/lib/wikiArticle";
import type { WikiLocale, WikiMetaInput } from "@/lib/wikiMeta";

export const SLUG = "json-vs-yaml";
export const REVISED = "2026-08-03";

const CONFIG_INPUT = `{
  "service": "api",
  "replicas": 3,
  "ports": [8080, 8443],
  "env": [
    { "name": "LOG_LEVEL", "value": "debug" },
    { "name": "REGION", "value": "eu" }
  ],
  "limits": { "cpu": "500m", "memory": "512Mi" }
}`;

const CONFIG_OUTPUT = `service: api
replicas: 3
ports:
- 8080
- 8443
env:
- name: LOG_LEVEL
  value: debug
- name: REGION
  value: eu
limits:
  cpu: 500m
  memory: 512Mi`;

const QUOTING_INPUT = `{
  "zip": "01234",
  "version": "1.10",
  "enabled": "yes"
}`;

const QUOTING_OUTPUT = `zip: "01234"
version: "1.10"
enabled: "yes"`;

const UNQUOTED_INPUT = `zip: 01234
version: 1.10
enabled: yes`;

const UNQUOTED_OUTPUT = `{
  "zip": 1234,
  "version": 1.1,
  "enabled": "yes"
}`;

export const META: Record<WikiLocale, WikiMetaInput> = {
  en: {
    locale: "en",
    slug: SLUG,
    title: "JSON vs YAML: Which One, and What Converts",
    description:
      "When to reach for JSON and when for YAML, the quoting rules that silently change your values, and exactly what survives a conversion between them.",
    keywords: "JSON vs YAML,YAML to JSON,JSON to YAML,YAML quoting,config file format",
    socialTitle: "JSON vs YAML",
    section: "Formats",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
  cn: {
    locale: "cn",
    slug: SLUG,
    title: "JSON 与 YAML：怎么选，转换会丢什么",
    description:
      "什么时候用 JSON、什么时候用 YAML，哪些引号规则会悄悄改掉你的值，以及两者互转时到底有什么能原样保留下来。",
    keywords: "JSON 与 YAML, YAML 转 JSON, JSON 转 YAML, YAML 引号, 配置文件格式",
    socialTitle: "JSON 与 YAML",
    section: "格式",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
  es: {
    locale: "es",
    slug: SLUG,
    title: "JSON vs YAML: cuál usar y qué se convierte",
    description:
      "Cuándo conviene JSON y cuándo YAML, las reglas de comillas que cambian tus valores sin avisar, y qué sobrevive exactamente a una conversión.",
    keywords: "JSON vs YAML,YAML a JSON,JSON a YAML,comillas YAML,formato configuración",
    socialTitle: "JSON vs YAML",
    section: "Formatos",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
  pt: {
    locale: "pt",
    slug: SLUG,
    title: "JSON vs YAML: qual usar e o que converte",
    description:
      "Quando usar JSON e quando usar YAML, as regras de aspas que mudam seus valores sem avisar, e o que exatamente sobrevive a uma conversão.",
    keywords: "JSON vs YAML,YAML para JSON,JSON para YAML,aspas YAML,formato de configuração",
    socialTitle: "JSON vs YAML",
    section: "Formatos",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
};

const EN: WikiArticleContent = {
  eyebrow: "Formats",
  heading: "JSON vs YAML",
  standfirst:
    "The two formats describe the same shapes — objects, arrays, strings, numbers, booleans, null. The differences that matter in practice are who writes the file, whether comments are allowed, and how aggressively the parser guesses what your unquoted text meant.",
  contentsLabel: "On this page",
  sections: [
    {
      id: "which-one",
      heading: "Which one to use",
      body: [
        "The useful split is not technical, it is about the author. JSON is what programs write and read: it is generated, transmitted, and parsed without a human in the loop. YAML is what people write by hand and then read again six months later.",
        "That single question resolves most cases. An HTTP API returns JSON — YAML would buy nothing, and every client already has a parser. A CI pipeline, a Kubernetes manifest, or an app config is YAML, because a person maintains it and needs to leave notes explaining why a timeout is 45 seconds.",
      ],
      points: [
        "**Wire format, machine-to-machine** — JSON. Smaller, universally parsed, no ambiguity to resolve.",
        "**Config a human edits** — YAML. Comments and less punctuation are the entire reason it exists.",
        "**Data you store and query** — JSON. Databases index it; almost none index YAML.",
        "**Anything untrusted** — JSON. Its grammar is tiny, which leaves far less to get wrong.",
      ],
    },
    {
      id: "differences",
      heading: "What actually differs",
      body: [
        "YAML 1.2 is a superset of JSON: any valid JSON document is also valid YAML. The reverse is not true, and the gaps are where conversion loses things.",
      ],
      table: {
        caption: "Behaviour that changes when you move a document between the two.",
        headers: ["", "JSON", "YAML"],
        rows: [
          ["Comments", "Not allowed at all", "`#` to end of line"],
          ["Structure", "Braces and brackets", "Indentation, or braces"],
          ["Quoting strings", "Always required", "Optional, which is the catch"],
          ["Trailing commas", "Rejected", "Not applicable"],
          ["Duplicate keys", "Last one wins, silently", "An error in strict parsers"],
          ["Multi-line strings", "`\\n` escapes only", "`|` and `>` blocks"],
          ["Anchors and reuse", "None", "`&anchor` and `*ref`"],
        ],
      },
    },
    {
      id: "converting",
      heading: "Converting JSON to YAML",
      body: [
        "A nested payload converts cleanly, and the result is genuinely shorter — the punctuation JSON needs is carried by indentation instead. Arrays sit at their parent's indent level, which is the common house style and what most linters expect.",
        "Note what happened to `env`: an array of objects becomes a list of dashes, with each object's first key inlined on the dash and the rest indented under it. That is the shape Kubernetes and GitHub Actions both use.",
      ],
      sample: {
        inputLabel: "Input JSON",
        input: CONFIG_INPUT,
        outputLabel: "Output YAML",
        output: CONFIG_OUTPUT,
        note: "Real output from the `/json-to-yaml/` converter. Empty objects and arrays stay visible as `{}` and `[]` rather than becoming blank lines you cannot see.",
      },
    },
    {
      id: "quoting",
      heading: "The quoting trap",
      body: [
        "This is the one that costs real time, and it only bites in the YAML direction. In JSON, `\"01234\"` is unmistakably a string, because strings are always quoted. In YAML, quotes are optional — so a parser has to guess, and it guesses from the characters.",
        "Converting out of JSON is safe, because the tool knows what it started with. Anything that would be re-read as a number or a boolean gets quoted on the way out:",
      ],
      sample: {
        inputLabel: "Input JSON",
        input: QUOTING_INPUT,
        outputLabel: "Output YAML",
        output: QUOTING_OUTPUT,
        note: "The quotes are not decoration. Drop them and the next parser reads different values.",
      },
    },
    {
      id: "hand-written",
      heading: "Why hand-written YAML loses data",
      body: [
        "Now the same three fields typed by hand, without quotes. This is the failure people hit, and nothing warns them:",
      ],
      sample: {
        inputLabel: "Hand-written YAML",
        input: UNQUOTED_INPUT,
        outputLabel: "Parsed as JSON",
        output: UNQUOTED_OUTPUT,
        note: "A leading zero is gone, `1.10` became `1.1`, and a postcode is now arithmetic. All three are real output from `/yaml-to-json/`.",
      },
      points: [
        "**Leading zeros** — postcodes, phone numbers, and account IDs all lose them. `01234` becomes `1234`.",
        "**Trailing zeros** — `1.10` becomes `1.1`, so a version string stops matching.",
        "**`yes` and `no`** — our parser keeps these as strings, matching YAML 1.2. Older 1.1 parsers, including PyYAML's default, turn `no` into `false`. This is the Norway problem: the country code `NO` becomes a boolean.",
      ],
    },
    {
      id: "round-trip",
      heading: "What survives a round trip",
      body: [
        "JSON to YAML and back is lossless, because the quoting is written for you. Hand-written YAML to JSON and back is not, and the loss happens on the way in, before any conversion runs.",
        "So the safe habit is one rule: quote every string in YAML that could be read as something else. Numbers stored as text are the whole category — identifiers, versions, postcodes, country codes, anything with a leading zero.",
      ],
      points: [
        "Comments do not survive in either direction. JSON has nowhere to put them, so a conversion drops every `#` line.",
        "Anchors and aliases are expanded, not preserved — reuse becomes repetition.",
        "Key order is kept, which matters more for reviewing a diff than for correctness.",
      ],
    },
  ],
  relatedLabel: "Try it, or read further",
  related: [
    {
      href: "/json-to-yaml/",
      label: "JSON to YAML converter",
      detail: "Quotes ambiguous strings for you, so the output is safe to re-parse.",
    },
    {
      href: "/yaml-to-json/",
      label: "YAML to JSON converter",
      detail: "Paste hand-written YAML here to see what a parser actually reads.",
    },
    {
      href: "/wiki/en/json-comments/",
      label: "Can JSON have comments?",
      detail: "The other reason people move config to YAML, and the alternatives.",
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
  eyebrow: "格式",
  heading: "JSON 与 YAML",
  standfirst:
    "两者描述的结构完全一样：对象、数组、字符串、数字、布尔、null。真正有区别的地方是三件事：谁来写这个文件，能不能写注释，以及解析器会多激进地去猜你没加引号的那段文本是什么意思。",
  contentsLabel: "本页内容",
  sections: [
    {
      id: "which-one",
      heading: "该用哪个",
      body: [
        "有用的分界线不在技术上，在作者是谁。JSON 是程序写、程序读的：生成、传输、解析，全程没有人参与。YAML 是人手写的，而且半年后还要再读一遍。",
        "这一个问题就能定下大部分场景。HTTP 接口返回 JSON，换成 YAML 没有任何好处，客户端本来就都自带解析器。CI 流水线、Kubernetes 清单、应用配置用 YAML，因为它由人维护，需要留一句话说明超时为什么是 45 秒。",
      ],
      points: [
        "**机器之间传输** —— 用 JSON。更小，到处都能解析，没有歧义要处理。",
        "**人手改的配置** —— 用 YAML。能写注释、标点少，这就是它存在的全部理由。",
        "**要存储和查询的数据** —— 用 JSON。数据库能给它建索引，几乎没有数据库给 YAML 建索引。",
        "**任何不可信来源** —— 用 JSON。它的语法极小，能出错的地方也就少得多。",
      ],
    },
    {
      id: "differences",
      heading: "真正的差别",
      body: [
        "YAML 1.2 是 JSON 的超集：任何合法的 JSON 也是合法的 YAML。反过来不成立，而这些缺口正是转换会丢东西的地方。",
      ],
      table: {
        caption: "把文档在两种格式之间搬动时，会发生变化的行为。",
        headers: ["", "JSON", "YAML"],
        rows: [
          ["注释", "完全不允许", "`#` 到行尾"],
          ["结构靠什么", "花括号和方括号", "缩进，也可以用括号"],
          ["字符串引号", "必须加", "可选，坑就在这"],
          ["尾随逗号", "报错", "不涉及"],
          ["重复的键", "后者胜出，且不报错", "严格解析器会报错"],
          ["多行字符串", "只能用 `\\n` 转义", "`|` 和 `>` 块"],
          ["锚点复用", "没有", "`&anchor` 与 `*ref`"],
        ],
      },
    },
    {
      id: "converting",
      heading: "JSON 转成 YAML",
      body: [
        "嵌套的数据能干净地转过去，而且结果确实更短 —— JSON 需要的那些标点，改由缩进承担了。数组和父级同一层缩进，这是通行写法，也是多数 linter 期望的样子。",
        "注意 `env` 变成了什么：对象数组变成一串短横线，每个对象的第一个键跟短横线同行，其余的缩进在下面。Kubernetes 和 GitHub Actions 用的都是这个形状。",
      ],
      sample: {
        inputLabel: "输入 JSON",
        input: CONFIG_INPUT,
        outputLabel: "输出 YAML",
        output: CONFIG_OUTPUT,
        note: "这是 `/json-to-yaml/` 的真实输出。空对象和空数组会保留成 `{}` 和 `[]`，而不是变成你根本看不见的空行。",
      },
    },
    {
      id: "quoting",
      heading: "引号这个坑",
      body: [
        "这个坑真的会浪费时间，而且只在 YAML 这一侧咬人。在 JSON 里，`\"01234\"` 毫无疑问是字符串，因为字符串永远带引号。在 YAML 里引号是可选的 —— 于是解析器只能猜，而它是照着字符猜的。",
        "从 JSON 转出去是安全的，因为工具知道自己拿到的是什么。任何会被重新读成数字或布尔的值，转出时都会补上引号：",
      ],
      sample: {
        inputLabel: "输入 JSON",
        input: QUOTING_INPUT,
        outputLabel: "输出 YAML",
        output: QUOTING_OUTPUT,
        note: "这些引号不是装饰。去掉它们，下一个解析器读到的就是另外三个值。",
      },
    },
    {
      id: "hand-written",
      heading: "手写 YAML 为什么会丢数据",
      body: ["还是这三个字段，改成手写、不加引号。这就是大家真正踩到的坑，而且没有任何提示："],
      sample: {
        inputLabel: "手写的 YAML",
        input: UNQUOTED_INPUT,
        outputLabel: "解析成 JSON",
        output: UNQUOTED_OUTPUT,
        note: "前导零没了，`1.10` 变成了 `1.1`，邮编现在是个算术结果。三条都是 `/yaml-to-json/` 的真实输出。",
      },
      points: [
        "**前导零** —— 邮编、手机号、账号都会丢。`01234` 变成 `1234`。",
        "**末尾零** —— `1.10` 变成 `1.1`，版本号从此匹配不上。",
        "**`yes` 和 `no`** —— 我们的解析器保留成字符串，与 YAML 1.2 一致。更老的 1.1 解析器（包括 PyYAML 的默认行为）会把 `no` 变成 `false`。这就是挪威问题：国家代码 `NO` 变成了布尔值。",
      ],
    },
    {
      id: "round-trip",
      heading: "转一圈能剩下什么",
      body: [
        "JSON 转 YAML 再转回来是无损的，因为引号是工具替你写的。手写 YAML 转 JSON 再转回来就不是，而且损失发生在入口，早于任何转换。",
        "所以安全习惯只有一条：YAML 里凡是可能被读成别的东西的字符串，都加引号。以文本形式存的数字是整个高危类别 —— 标识符、版本号、邮编、国家代码，以及任何带前导零的东西。",
      ],
      points: [
        "注释两个方向都留不住。JSON 没地方放它，所以转换会丢掉每一行 `#`。",
        "锚点和别名会被展开，不会保留 —— 复用变成了重复。",
        "键的顺序会保留，这件事对看 diff 的意义大于对正确性的意义。",
      ],
    },
  ],
  relatedLabel: "去试试，或者继续读",
  related: [
    {
      href: "/json-to-yaml/",
      label: "JSON 转 YAML",
      detail: "会替你给有歧义的字符串加引号，输出可以放心再解析一次。",
    },
    {
      href: "/yaml-to-json/",
      label: "YAML 转 JSON",
      detail: "把手写的 YAML 贴进来，看看解析器实际读到了什么。",
    },
    {
      href: "/wiki/cn/json-comments/",
      label: "JSON 能写注释吗",
      detail: "大家把配置搬去 YAML 的另一个原因，以及有哪些替代做法。",
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
  eyebrow: "Formatos",
  heading: "JSON vs YAML",
  standfirst:
    "Los dos formatos describen las mismas estructuras: objetos, arrays, cadenas, números, booleanos, null. Las diferencias que importan en la práctica son quién escribe el archivo, si se permiten comentarios, y con cuánta agresividad el parser adivina qué querías decir con un texto sin comillas.",
  contentsLabel: "En esta página",
  sections: [
    {
      id: "which-one",
      heading: "Cuál usar",
      body: [
        "La división útil no es técnica, es sobre el autor. JSON es lo que los programas escriben y leen: se genera, se transmite y se parsea sin que intervenga una persona. YAML es lo que la gente escribe a mano y vuelve a leer seis meses después.",
        "Esa única pregunta resuelve la mayoría de los casos. Una API HTTP devuelve JSON: YAML no aportaría nada y todos los clientes ya tienen un parser. Un pipeline de CI, un manifiesto de Kubernetes o la configuración de una app son YAML, porque los mantiene una persona que necesita dejar una nota explicando por qué el timeout es de 45 segundos.",
      ],
      points: [
        "**Formato de transporte entre máquinas** — JSON. Más pequeño, parseable en todas partes, sin ambigüedad que resolver.",
        "**Configuración que edita una persona** — YAML. Los comentarios y la menor puntuación son toda su razón de ser.",
        "**Datos que almacenas y consultas** — JSON. Las bases de datos lo indexan; casi ninguna indexa YAML.",
        "**Cualquier entrada no confiable** — JSON. Su gramática es mínima, así que hay mucho menos que pueda salir mal.",
      ],
    },
    {
      id: "differences",
      heading: "Qué cambia de verdad",
      body: [
        "YAML 1.2 es un superconjunto de JSON: cualquier documento JSON válido también es YAML válido. Al revés no ocurre, y en esos huecos es donde la conversión pierde cosas.",
      ],
      table: {
        caption: "Comportamientos que cambian al mover un documento entre ambos formatos.",
        headers: ["", "JSON", "YAML"],
        rows: [
          ["Comentarios", "No se permiten", "`#` hasta fin de línea"],
          ["Estructura", "Llaves y corchetes", "Indentación, o llaves"],
          ["Comillas en cadenas", "Siempre obligatorias", "Opcionales, ahí está la trampa"],
          ["Comas finales", "Se rechazan", "No aplica"],
          ["Claves duplicadas", "Gana la última, en silencio", "Error en parsers estrictos"],
          ["Cadenas multilínea", "Solo escapes `\\n`", "Bloques `|` y `>`"],
          ["Anclas y reutilización", "No existen", "`&anchor` y `*ref`"],
        ],
      },
    },
    {
      id: "converting",
      heading: "Convertir JSON a YAML",
      body: [
        "Una estructura anidada se convierte sin problemas, y el resultado es realmente más corto: la puntuación que JSON necesita la asume la indentación. Los arrays quedan al nivel de indentación de su padre, que es el estilo habitual y lo que esperan la mayoría de los linters.",
        "Fíjate en qué pasó con `env`: un array de objetos se vuelve una lista de guiones, con la primera clave de cada objeto en la misma línea del guion y el resto indentado debajo. Es la forma que usan tanto Kubernetes como GitHub Actions.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: CONFIG_INPUT,
        outputLabel: "YAML de salida",
        output: CONFIG_OUTPUT,
        note: "Salida real del conversor `/json-to-yaml/`. Los objetos y arrays vacíos siguen visibles como `{}` y `[]` en lugar de volverse líneas en blanco que no puedes ver.",
      },
    },
    {
      id: "quoting",
      heading: "La trampa de las comillas",
      body: [
        "Esta es la que cuesta tiempo real, y solo muerde en la dirección de YAML. En JSON, `\"01234\"` es inequívocamente una cadena, porque las cadenas siempre llevan comillas. En YAML las comillas son opcionales, así que el parser tiene que adivinar, y adivina a partir de los caracteres.",
        "Convertir desde JSON es seguro, porque la herramienta sabe con qué empezó. Todo lo que se releería como número o booleano sale entre comillas:",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: QUOTING_INPUT,
        outputLabel: "YAML de salida",
        output: QUOTING_OUTPUT,
        note: "Las comillas no son decoración. Quítalas y el siguiente parser leerá otros valores.",
      },
    },
    {
      id: "hand-written",
      heading: "Por qué el YAML escrito a mano pierde datos",
      body: [
        "Ahora los mismos tres campos escritos a mano, sin comillas. Este es el fallo con el que se topa la gente, y nada lo avisa:",
      ],
      sample: {
        inputLabel: "YAML escrito a mano",
        input: UNQUOTED_INPUT,
        outputLabel: "Parseado como JSON",
        output: UNQUOTED_OUTPUT,
        note: "El cero inicial desapareció, `1.10` se volvió `1.1`, y un código postal ahora es aritmética. Los tres son salida real de `/yaml-to-json/`.",
      },
      points: [
        "**Ceros iniciales** — códigos postales, teléfonos e identificadores de cuenta los pierden todos. `01234` pasa a ser `1234`.",
        "**Ceros finales** — `1.10` pasa a `1.1`, así que una versión deja de coincidir.",
        "**`yes` y `no`** — nuestro parser los mantiene como cadenas, igual que YAML 1.2. Los parsers 1.1 más antiguos, incluido PyYAML por defecto, convierten `no` en `false`. Es el problema de Noruega: el código de país `NO` se vuelve booleano.",
      ],
    },
    {
      id: "round-trip",
      heading: "Qué sobrevive a la ida y vuelta",
      body: [
        "De JSON a YAML y de vuelta no se pierde nada, porque las comillas las escribe la herramienta por ti. De YAML escrito a mano a JSON y de vuelta sí, y la pérdida ocurre en la entrada, antes de cualquier conversión.",
        "Así que el hábito seguro es una sola regla: pon comillas a toda cadena en YAML que pueda leerse como otra cosa. Los números guardados como texto son la categoría completa: identificadores, versiones, códigos postales, códigos de país y cualquier cosa con un cero inicial.",
      ],
      points: [
        "Los comentarios no sobreviven en ninguna dirección. JSON no tiene dónde ponerlos, así que la conversión descarta cada línea `#`.",
        "Las anclas y los alias se expanden, no se preservan: la reutilización se vuelve repetición.",
        "El orden de las claves se mantiene, lo que importa más para revisar un diff que para la corrección.",
      ],
    },
  ],
  relatedLabel: "Pruébalo, o sigue leyendo",
  related: [
    {
      href: "/json-to-yaml/",
      label: "Conversor de JSON a YAML",
      detail: "Pone comillas a las cadenas ambiguas por ti, así la salida es segura de reparsear.",
    },
    {
      href: "/yaml-to-json/",
      label: "Conversor de YAML a JSON",
      detail: "Pega aquí YAML escrito a mano para ver qué lee realmente un parser.",
    },
    {
      href: "/wiki/es/json-comments/",
      label: "¿Puede JSON llevar comentarios?",
      detail: "La otra razón por la que se mueve la configuración a YAML, y las alternativas.",
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
  eyebrow: "Formatos",
  heading: "JSON vs YAML",
  standfirst:
    "Os dois formatos descrevem as mesmas estruturas: objetos, arrays, strings, números, booleanos, null. As diferenças que importam na prática são quem escreve o arquivo, se comentários são permitidos, e com que agressividade o parser adivinha o que você quis dizer com um texto sem aspas.",
  contentsLabel: "Nesta página",
  sections: [
    {
      id: "which-one",
      heading: "Qual usar",
      body: [
        "A divisão útil não é técnica, é sobre o autor. JSON é o que os programas escrevem e leem: é gerado, transmitido e parseado sem ninguém no meio. YAML é o que as pessoas escrevem à mão e voltam a ler seis meses depois.",
        "Essa única pergunta resolve a maioria dos casos. Uma API HTTP retorna JSON — YAML não traria nada, e todo cliente já tem um parser. Um pipeline de CI, um manifesto do Kubernetes ou a configuração de um app são YAML, porque uma pessoa os mantém e precisa deixar uma nota explicando por que o timeout é de 45 segundos.",
      ],
      points: [
        "**Formato de transporte entre máquinas** — JSON. Menor, parseável em qualquer lugar, sem ambiguidade a resolver.",
        "**Configuração que uma pessoa edita** — YAML. Comentários e menos pontuação são toda a razão de existir dele.",
        "**Dados que você armazena e consulta** — JSON. Bancos de dados indexam; quase nenhum indexa YAML.",
        "**Qualquer entrada não confiável** — JSON. A gramática é mínima, então há muito menos que possa dar errado.",
      ],
    },
    {
      id: "differences",
      heading: "O que realmente muda",
      body: [
        "YAML 1.2 é um superconjunto de JSON: qualquer documento JSON válido também é YAML válido. O contrário não vale, e é nessas lacunas que a conversão perde coisas.",
      ],
      table: {
        caption: "Comportamentos que mudam ao mover um documento entre os dois formatos.",
        headers: ["", "JSON", "YAML"],
        rows: [
          ["Comentários", "Não são permitidos", "`#` até o fim da linha"],
          ["Estrutura", "Chaves e colchetes", "Indentação, ou chaves"],
          ["Aspas em strings", "Sempre obrigatórias", "Opcionais, e aí está a pegadinha"],
          ["Vírgulas finais", "Rejeitadas", "Não se aplica"],
          ["Chaves duplicadas", "A última vence, silenciosamente", "Erro em parsers estritos"],
          ["Strings multilinha", "Apenas escapes `\\n`", "Blocos `|` e `>`"],
          ["Âncoras e reuso", "Não existem", "`&anchor` e `*ref`"],
        ],
      },
    },
    {
      id: "converting",
      heading: "Converter JSON para YAML",
      body: [
        "Uma estrutura aninhada converte sem problemas, e o resultado é de fato mais curto: a pontuação que o JSON precisa passa a ser carregada pela indentação. Arrays ficam no nível de indentação do pai, que é o estilo usual e o que a maioria dos linters espera.",
        "Repare no que aconteceu com `env`: um array de objetos vira uma lista de traços, com a primeira chave de cada objeto na mesma linha do traço e o resto indentado abaixo. É a forma que Kubernetes e GitHub Actions usam.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: CONFIG_INPUT,
        outputLabel: "YAML de saída",
        output: CONFIG_OUTPUT,
        note: "Saída real do conversor `/json-to-yaml/`. Objetos e arrays vazios continuam visíveis como `{}` e `[]` em vez de virarem linhas em branco que você não consegue ver.",
      },
    },
    {
      id: "quoting",
      heading: "A armadilha das aspas",
      body: [
        "Essa é a que custa tempo de verdade, e só morde no sentido do YAML. Em JSON, `\"01234\"` é inequivocamente uma string, porque strings sempre levam aspas. Em YAML as aspas são opcionais — então o parser tem que adivinhar, e ele adivinha a partir dos caracteres.",
        "Converter a partir de JSON é seguro, porque a ferramenta sabe com o que começou. Tudo que seria relido como número ou booleano sai entre aspas:",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: QUOTING_INPUT,
        outputLabel: "YAML de saída",
        output: QUOTING_OUTPUT,
        note: "As aspas não são enfeite. Tire-as e o próximo parser lê outros valores.",
      },
    },
    {
      id: "hand-written",
      heading: "Por que YAML escrito à mão perde dados",
      body: [
        "Agora os mesmos três campos digitados à mão, sem aspas. É essa a falha que as pessoas encontram, e nada avisa:",
      ],
      sample: {
        inputLabel: "YAML escrito à mão",
        input: UNQUOTED_INPUT,
        outputLabel: "Parseado como JSON",
        output: UNQUOTED_OUTPUT,
        note: "O zero à esquerda sumiu, `1.10` virou `1.1`, e um CEP agora é aritmética. Os três são saída real de `/yaml-to-json/`.",
      },
      points: [
        "**Zeros à esquerda** — CEPs, telefones e identificadores de conta perdem todos. `01234` vira `1234`.",
        "**Zeros à direita** — `1.10` vira `1.1`, então uma versão deixa de casar.",
        "**`yes` e `no`** — nosso parser mantém como strings, igual ao YAML 1.2. Parsers 1.1 mais antigos, incluindo o PyYAML por padrão, transformam `no` em `false`. É o problema da Noruega: o código de país `NO` vira booleano.",
      ],
    },
    {
      id: "round-trip",
      heading: "O que sobrevive à ida e volta",
      body: [
        "De JSON para YAML e de volta não se perde nada, porque as aspas são escritas por você pela ferramenta. De YAML escrito à mão para JSON e de volta, sim — e a perda acontece na entrada, antes de qualquer conversão.",
        "Então o hábito seguro é uma regra só: coloque aspas em toda string no YAML que possa ser lida como outra coisa. Números guardados como texto são a categoria inteira — identificadores, versões, CEPs, códigos de país e qualquer coisa com zero à esquerda.",
      ],
      points: [
        "Comentários não sobrevivem em nenhuma direção. JSON não tem onde colocá-los, então a conversão descarta cada linha `#`.",
        "Âncoras e aliases são expandidos, não preservados: reuso vira repetição.",
        "A ordem das chaves é mantida, o que importa mais para revisar um diff do que para a correção.",
      ],
    },
  ],
  relatedLabel: "Experimente, ou continue lendo",
  related: [
    {
      href: "/json-to-yaml/",
      label: "Conversor de JSON para YAML",
      detail: "Coloca aspas nas strings ambíguas por você, então a saída é segura para reparsear.",
    },
    {
      href: "/yaml-to-json/",
      label: "Conversor de YAML para JSON",
      detail: "Cole YAML escrito à mão aqui para ver o que um parser realmente lê.",
    },
    {
      href: "/wiki/pt/json-comments/",
      label: "JSON pode ter comentários?",
      detail: "A outra razão para mover configuração para YAML, e as alternativas.",
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
  configInput: CONFIG_INPUT,
  configOutput: CONFIG_OUTPUT,
  quotingInput: QUOTING_INPUT,
  quotingOutput: QUOTING_OUTPUT,
  unquotedInput: UNQUOTED_INPUT,
  unquotedOutput: UNQUOTED_OUTPUT,
};
