/**
 * `json-to-csv-nested`, all four locales.
 *
 * Every sample is real output from `jsonToCSV` / `csvToJSON` in
 * `@/lib/json/formats`, captured by running them. `tests/wiki.test.ts` re-derives
 * each one, so a change to the flattener fails the suite instead of quietly
 * turning this page into fiction.
 */

import type { WikiArticleContent } from "@/lib/wikiArticle";
import type { WikiLocale, WikiMetaInput } from "@/lib/wikiMeta";

export const SLUG = "json-to-csv-nested";
export const REVISED = "2026-08-03";

const NESTED_INPUT = `[
  { "id": 1, "user": { "name": "Ada", "addr": { "city": "London" } } },
  { "id": 2, "user": { "name": "Alan", "addr": { "city": "Wilmslow" } } }
]`;

const NESTED_OUTPUT = `id,user.name,user.addr.city
1,Ada,London
2,Alan,Wilmslow`;

const SCALAR_ARRAY_INPUT = `[
  { "id": 1, "tags": ["a", "b"] },
  { "id": 2, "tags": ["c"] }
]`;

const SCALAR_ARRAY_OUTPUT = `id,tags
1,a; b
2,c`;

const OBJECT_ARRAY_INPUT = `[
  { "id": 1, "items": [{ "sku": "x", "qty": 2 }, { "sku": "y", "qty": 1 }] },
  { "id": 2, "items": [{ "sku": "z", "qty": 5 }] }
]`;

const OBJECT_ARRAY_OUTPUT = `id,items[0].sku,items[0].qty,items[1].sku,items[1].qty
1,x,2,y,1
2,z,5,,`;

const RAGGED_INPUT = `[
  { "id": 1, "name": "Ada" },
  { "id": 2, "email": "a@b.c" }
]`;

const RAGGED_OUTPUT = `id,name,email
1,Ada,
2,,a@b.c`;

const WRAPPER_INPUT = `{ "items": [{ "a": 1 }, { "a": 2 }] }`;

const WRAPPER_OUTPUT = `a
1
2`;

const TWO_ARRAYS_INPUT = `{ "items": [{ "a": 1 }], "other": [{ "b": 2 }] }`;

const TWO_ARRAYS_OUTPUT = `items[0].a,other[0].b
1,2`;

const INJECTION_INPUT = `[{ "formula": "=1+1", "note": "a,b", "q": "say \\"hi\\"" }]`;

const INJECTION_OUTPUT = `formula,note,q
"=1+1","a,b","say ""hi"""`;

const ROUND_TRIP_INPUT = `id,user.name
1,Ada`;

const ROUND_TRIP_OUTPUT = `[
  {
    "id": 1,
    "user.name": "Ada"
  }
]`;

export const META: Record<WikiLocale, WikiMetaInput> = {
  en: {
    locale: "en",
    slug: SLUG,
    title: "Nested JSON to CSV: How Flattening Works",
    description:
      "CSV is flat and JSON is not. How nested objects become dotted columns, what happens to arrays, and which conversions you cannot reverse.",
    keywords:
      "nested JSON to CSV,JSON flatten,JSON to spreadsheet,dotted column names,CSV conversion",
    socialTitle: "Nested JSON → CSV",
    section: "Tabular data",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
  cn: {
    locale: "cn",
    slug: SLUG,
    title: "嵌套 JSON 转 CSV：扁平化是怎么做的",
    description:
      "CSV 是平的，JSON 不是。嵌套对象如何变成带点号的列名，数组会发生什么，以及哪些转换是回不去的。",
    keywords: "嵌套 JSON 转 CSV, JSON 扁平化, JSON 转表格, 点号列名, CSV 转换",
    socialTitle: "嵌套 JSON → CSV",
    section: "表格数据",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
  es: {
    locale: "es",
    slug: SLUG,
    title: "JSON anidado a CSV: cómo funciona el aplanado",
    description:
      "CSV es plano y JSON no. Cómo los objetos anidados se vuelven columnas con puntos, qué pasa con los arrays y qué conversiones no puedes revertir.",
    keywords:
      "JSON anidado a CSV,aplanar JSON,JSON a hoja de cálculo,columnas con puntos,conversión CSV",
    socialTitle: "JSON anidado → CSV",
    section: "Datos tabulares",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
  pt: {
    locale: "pt",
    slug: SLUG,
    title: "JSON aninhado para CSV: como o achatamento funciona",
    description:
      "CSV é plano e JSON não é. Como objetos aninhados viram colunas com pontos, o que acontece com arrays e quais conversões você não pode reverter.",
    keywords:
      "JSON aninhado para CSV,achatar JSON,JSON para planilha,colunas com pontos,conversão CSV",
    socialTitle: "JSON aninhado → CSV",
    section: "Dados tabulares",
    publishedTime: "2026-08-03",
    modifiedTime: REVISED,
  },
};

const EN: WikiArticleContent = {
  eyebrow: "Tabular data",
  heading: "Nested JSON to CSV",
  standfirst:
    "CSV has exactly two dimensions: rows and columns. JSON nests to any depth. Every conversion between them has to answer the same question — what becomes a column — and the answer is where the data gets lost.",
  contentsLabel: "On this page",
  sections: [
    {
      id: "flattening",
      heading: "Nested objects become dotted columns",
      body: [
        "The conversion walks down to each leaf value and names the column after the path it took. A `city` inside `addr` inside `user` becomes one column called `user.addr.city`. There is no depth limit, so the column count grows with the shape of your data rather than with the number of keys at the top level.",
        "This part is well behaved and reversible in principle: the dots record the structure you started with.",
      ],
      sample: {
        inputLabel: "Input JSON",
        input: NESTED_INPUT,
        outputLabel: "Output CSV",
        output: NESTED_OUTPUT,
        note: "Real output from `/json-to-csv/`. Three leaf values, three columns, whatever the nesting depth was.",
      },
    },
    {
      id: "arrays",
      heading: "Arrays are the hard part",
      body: [
        "An array has no name for its members, only positions, so there is no honest column name to derive. The converter handles the two cases differently, and the split is worth knowing before you trust the output.",
        "An array of plain values collapses into one cell, joined with a semicolon and a space:",
      ],
      sample: {
        inputLabel: "Input JSON",
        input: SCALAR_ARRAY_INPUT,
        outputLabel: "Output CSV",
        output: SCALAR_ARRAY_OUTPUT,
        note: "Convenient to read, but ambiguous: a tag that already contains `; ` is now indistinguishable from two tags.",
      },
    },
    {
      id: "object-arrays",
      heading: "Arrays of objects get indexed columns",
      body: [
        "When the array holds objects, each position gets its own set of columns, numbered by index. This is faithful — nothing is merged — but the column count is set by the longest row in your whole dataset.",
        "Look at row 2: it has one item, so four of its cells are empty. With one order of 50 line items in a file of 10,000 orders, every other row carries 49 sets of blank columns.",
      ],
      sample: {
        inputLabel: "Input JSON",
        input: OBJECT_ARRAY_INPUT,
        outputLabel: "Output CSV",
        output: OBJECT_ARRAY_OUTPUT,
        note: "If your arrays vary in length, convert the array itself instead — one row per line item, with the order id repeated.",
      },
    },
    {
      id: "ragged",
      heading: "Missing keys align, they do not shift",
      body: [
        "Records in real data rarely all carry the same keys. The header is the union of every key seen, in first-seen order, and a record missing one gets an empty cell rather than a shifted row.",
        "This is the behaviour you want, and it is worth checking in any converter you use: the naive implementation takes the first record's keys as the header and silently drops every field that only appears later.",
      ],
      sample: {
        inputLabel: "Input JSON",
        input: RAGGED_INPUT,
        outputLabel: "Output CSV",
        output: RAGGED_OUTPUT,
        note: "`email` appears only in the second record and still gets a column. Nothing is dropped.",
      },
    },
    {
      id: "wrappers",
      heading: "Wrapped payloads, and when unwrapping stops",
      body: [
        "API responses usually put the rows inside an envelope. When exactly one property of the top-level object is an array, that array is treated as the rows — so you can paste a response in without reshaping it first.",
      ],
      sample: {
        inputLabel: "One array: unwrapped",
        input: WRAPPER_INPUT,
        outputLabel: "Output CSV",
        output: WRAPPER_OUTPUT,
      },
    },
    {
      id: "two-arrays",
      heading: "Two arrays means no guess",
      body: [
        "With two arrays there is no way to tell which one holds the rows, so the converter stops guessing and flattens the whole object as a single record instead. The result is one wide row, which is almost certainly not what you wanted — and that is the point: it is visibly wrong rather than quietly half right.",
        "If you see a single row of indexed columns, pick the array you meant and convert that.",
      ],
      sample: {
        inputLabel: "Two arrays: not unwrapped",
        input: TWO_ARRAYS_INPUT,
        outputLabel: "Output CSV",
        output: TWO_ARRAYS_OUTPUT,
        note: "One row, indexed columns from both arrays. Paste just `items` to get the table you were after.",
      },
    },
    {
      id: "quoting",
      heading: "Quoting, and the spreadsheet formula problem",
      body: [
        "A cell gets quoted when it contains the delimiter, a quote character, or a newline — the standard CSV rules, with embedded quotes doubled.",
        "One addition worth knowing about: a cell starting with `=`, `+`, `-`, or `@` is also quoted. Those characters make Excel and Google Sheets treat the cell as a formula, which is how a CSV export turns into code execution on someone else's machine. Quoting is the cheap half of the fix.",
      ],
      sample: {
        inputLabel: "Input JSON",
        input: INJECTION_INPUT,
        outputLabel: "Output CSV",
        output: INJECTION_OUTPUT,
        note: "`=1+1` is quoted because of the leading `=`, `a,b` because of the comma, and the inner quotes are doubled.",
      },
    },
    {
      id: "round-trip",
      heading: "What you cannot get back",
      body: [
        "Converting back produces flat keys, not the nesting you started with. The dots survive as literal characters in the key name — nothing reassembles them into objects, because a plain CSV reader has no way to know whether `user.name` was a nested field or a column that genuinely had a dot in its name.",
      ],
      sample: {
        inputLabel: "Input CSV",
        input: ROUND_TRIP_INPUT,
        outputLabel: "Output JSON",
        output: ROUND_TRIP_OUTPUT,
        note: "One flat key called `user.name`, not a `user` object. Real output from `/csv-to-json/`.",
      },
      points: [
        "**Types are re-guessed on the way back.** `01234` in a CSV cell parses as the number `1234`, the same way it does in unquoted YAML. Postcodes and account IDs are the usual casualties.",
        "**`null` and empty string become the same thing.** Both are an empty cell, and an empty cell reads back as an empty string.",
        "**Arrays do not come back.** A `a; b` cell is a string containing a semicolon, not a list.",
      ],
    },
    {
      id: "advice",
      heading: "Practical advice",
      body: [
        "Treat CSV as an export format, not a storage format. It is the right answer when the destination is a spreadsheet, a BI tool, or a person; it is the wrong answer when you plan to read the data back as JSON later.",
      ],
      points: [
        "Convert the array you actually want rows from, not the envelope around it.",
        "If arrays inside your records vary in length, flip the shape: one row per array item, parent fields repeated.",
        "Check the header row before you trust a file — it tells you exactly which leaves the flattener found.",
        "Keep the original JSON. It is the only copy that still knows the types and the structure.",
      ],
    },
  ],
  relatedLabel: "Try it, or read further",
  related: [
    {
      href: "/json-to-csv/",
      label: "JSON to CSV converter",
      detail: "Flattens nested objects to dotted columns. Delimiter is selectable.",
    },
    {
      href: "/csv-to-json/",
      label: "CSV to JSON converter",
      detail: "See exactly what a flat file reads back as.",
    },
    {
      href: "/wiki/en/json-vs-yaml/",
      label: "JSON vs YAML",
      detail: "The same type-guessing problem, in the format people hand-write.",
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
  eyebrow: "表格数据",
  heading: "嵌套 JSON 转 CSV",
  standfirst:
    "CSV 只有两个维度：行和列。JSON 可以嵌套到任意深度。两者之间的每一次转换都要回答同一个问题 —— 什么东西该变成一列 —— 而数据就是在这个答案里丢掉的。",
  contentsLabel: "本页内容",
  sections: [
    {
      id: "flattening",
      heading: "嵌套对象变成带点号的列",
      body: [
        "转换会一直往下走到每个叶子值，然后用它走过的路径给列命名。`user` 里 `addr` 里的 `city`，会变成一个叫 `user.addr.city` 的列。没有深度上限，所以列的数量取决于数据的形状，而不是顶层有几个键。",
        "这部分行为很规矩，原理上也是可逆的：点号把你原本的结构记录了下来。",
      ],
      sample: {
        inputLabel: "输入 JSON",
        input: NESTED_INPUT,
        outputLabel: "输出 CSV",
        output: NESTED_OUTPUT,
        note: "这是 `/json-to-csv/` 的真实输出。三个叶子值，三列，不管中间嵌了多少层。",
      },
    },
    {
      id: "arrays",
      heading: "数组才是难处",
      body: [
        "数组的成员没有名字，只有位置，所以推导不出一个诚实的列名。转换器对两种情况的处理不一样，在你相信输出之前值得先知道这个分界。",
        "全是普通值的数组会塌进一个格子，用分号加空格连起来：",
      ],
      sample: {
        inputLabel: "输入 JSON",
        input: SCALAR_ARRAY_INPUT,
        outputLabel: "输出 CSV",
        output: SCALAR_ARRAY_OUTPUT,
        note: "读起来方便，但有歧义：某个标签本身就含 `; ` 的话，现在跟两个标签已经分不出来了。",
      },
    },
    {
      id: "object-arrays",
      heading: "对象数组会展开成带序号的列",
      body: [
        "数组里装的是对象时，每个位置拿到自己的一组列，按下标编号。这是忠实的 —— 没有任何合并 —— 但列的数量由整个数据集里最长的那一行决定。",
        "看第二行：它只有一个 item，于是有四个格子是空的。一万条订单里只要有一条有 50 个明细，其余每一行都要背着 49 组空列。",
      ],
      sample: {
        inputLabel: "输入 JSON",
        input: OBJECT_ARRAY_INPUT,
        outputLabel: "输出 CSV",
        output: OBJECT_ARRAY_OUTPUT,
        note: "如果你的数组长度不一致，那就直接转那个数组 —— 一个明细一行，订单号重复写。",
      },
    },
    {
      id: "ragged",
      heading: "缺失的键会对齐，不会串行",
      body: [
        "真实数据里的记录很少个个都带同样的键。表头是所有出现过的键的并集，按首次出现的顺序排；某条记录缺了哪个，就给它一个空格子，而不是让整行错位。",
        "这是你想要的行为，也值得在任何转换器里都验一下：偷懒的实现会拿第一条记录的键当表头，然后不声不响地丢掉所有只在后面出现的字段。",
      ],
      sample: {
        inputLabel: "输入 JSON",
        input: RAGGED_INPUT,
        outputLabel: "输出 CSV",
        output: RAGGED_OUTPUT,
        note: "`email` 只出现在第二条记录里，一样拿到了列。什么都没丢。",
      },
    },
    {
      id: "wrappers",
      heading: "带外壳的数据，以及拆壳什么时候停下",
      body: [
        "接口返回通常会把行装在一个外壳里。当顶层对象恰好只有一个属性是数组时，那个数组就被当成行 —— 所以你可以把返回直接贴进来，不用先改形状。",
      ],
      sample: {
        inputLabel: "一个数组：会拆壳",
        input: WRAPPER_INPUT,
        outputLabel: "输出 CSV",
        output: WRAPPER_OUTPUT,
      },
    },
    {
      id: "two-arrays",
      heading: "两个数组就不猜了",
      body: [
        "有两个数组时，没办法判断哪个装的是行，于是转换器不再去猜，改成把整个对象当成一条记录来扁平化。结果是很宽的一行 —— 这几乎肯定不是你要的，而这恰恰是重点：错得明显，好过安静地对了一半。",
        "所以看到一行带序号的列时，挑出你真正想要的那个数组，单独转它。",
      ],
      sample: {
        inputLabel: "两个数组：不拆壳",
        input: TWO_ARRAYS_INPUT,
        outputLabel: "输出 CSV",
        output: TWO_ARRAYS_OUTPUT,
        note: "一行，两个数组的序号列都在。只贴 `items` 就能拿到你想要的表格。",
      },
    },
    {
      id: "quoting",
      heading: "引号，以及表格公式那个问题",
      body: [
        "格子里含有分隔符、引号或换行时会被加上引号 —— 就是标准的 CSV 规则，内部的引号写成两个。",
        "还有一条值得知道：以 `=`、`+`、`-`、`@` 开头的格子也会被加引号。这几个字符会让 Excel 和 Google Sheets 把格子当成公式，这就是一份 CSV 导出如何变成在别人机器上执行代码。加引号是这个问题里便宜的那一半解法。",
      ],
      sample: {
        inputLabel: "输入 JSON",
        input: INJECTION_INPUT,
        outputLabel: "输出 CSV",
        output: INJECTION_OUTPUT,
        note: "`=1+1` 因为开头的 `=` 被加引号，`a,b` 因为逗号，里面的引号写成了两个。",
      },
    },
    {
      id: "round-trip",
      heading: "有哪些是拿不回来的",
      body: [
        "转回去得到的是扁平的键，不是你原本的嵌套。点号作为普通字符留在键名里 —— 没有任何东西会把它们重新拼成对象，因为普通的 CSV 读取器无法知道 `user.name` 到底是个嵌套字段，还是一个名字里真的带点的列。",
      ],
      sample: {
        inputLabel: "输入 CSV",
        input: ROUND_TRIP_INPUT,
        outputLabel: "输出 JSON",
        output: ROUND_TRIP_OUTPUT,
        note: "一个叫 `user.name` 的扁平键，不是 `user` 对象。这是 `/csv-to-json/` 的真实输出。",
      },
      points: [
        "**类型会在回来的路上被重新猜一遍。** CSV 格子里的 `01234` 会解析成数字 `1234`，跟不加引号的 YAML 一模一样。邮编和账号是常见的受害者。",
        "**`null` 和空字符串变成同一个东西。** 两者都是空格子，而空格子读回来是空字符串。",
        "**数组回不来。** `a; b` 是一个含分号的字符串，不是列表。",
      ],
    },
    {
      id: "advice",
      heading: "实际建议",
      body: [
        "把 CSV 当导出格式，别当存储格式。目的地是表格软件、BI 工具或者一个人时，它是对的答案；打算之后再把数据当 JSON 读回来时，它是错的答案。",
      ],
      points: [
        "转你真正想要行的那个数组，别转它外面的壳。",
        "如果记录里的数组长度不一致，把形状翻过来：一个数组元素一行，父级字段重复写。",
        "相信一个文件之前先看表头 —— 它准确告诉你扁平化找到了哪些叶子。",
        "留着原始 JSON。它是唯一还知道类型和结构的那份。",
      ],
    },
  ],
  relatedLabel: "去试试，或者继续读",
  related: [
    {
      href: "/json-to-csv/",
      label: "JSON 转 CSV",
      detail: "把嵌套对象扁平成点号列名，分隔符可选。",
    },
    {
      href: "/csv-to-json/",
      label: "CSV 转 JSON",
      detail: "看看一个平文件读回来到底是什么。",
    },
    {
      href: "/wiki/cn/json-vs-yaml/",
      label: "JSON 与 YAML",
      detail: "同一个类型猜测问题，发生在人手写的那个格式里。",
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
  eyebrow: "Datos tabulares",
  heading: "JSON anidado a CSV",
  standfirst:
    "CSV tiene exactamente dos dimensiones: filas y columnas. JSON se anida a cualquier profundidad. Cada conversión entre ambos tiene que responder la misma pregunta — qué se convierte en columna — y en esa respuesta es donde se pierden los datos.",
  contentsLabel: "En esta página",
  sections: [
    {
      id: "flattening",
      heading: "Los objetos anidados se vuelven columnas con puntos",
      body: [
        "La conversión baja hasta cada valor hoja y nombra la columna según el camino recorrido. Un `city` dentro de `addr` dentro de `user` se convierte en una columna llamada `user.addr.city`. No hay límite de profundidad, así que el número de columnas crece con la forma de tus datos, no con la cantidad de claves del nivel superior.",
        "Esta parte se comporta bien y en principio es reversible: los puntos registran la estructura de la que partiste.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: NESTED_INPUT,
        outputLabel: "CSV de salida",
        output: NESTED_OUTPUT,
        note: "Salida real de `/json-to-csv/`. Tres valores hoja, tres columnas, sin importar la profundidad del anidamiento.",
      },
    },
    {
      id: "arrays",
      heading: "Los arrays son la parte difícil",
      body: [
        "Un array no tiene nombres para sus miembros, solo posiciones, así que no hay un nombre de columna honesto que derivar. El conversor trata los dos casos de forma distinta, y conviene conocer la diferencia antes de confiar en la salida.",
        "Un array de valores simples se colapsa en una sola celda, unido con punto y coma más espacio:",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: SCALAR_ARRAY_INPUT,
        outputLabel: "CSV de salida",
        output: SCALAR_ARRAY_OUTPUT,
        note: "Cómodo de leer, pero ambiguo: una etiqueta que ya contiene `; ` ahora es indistinguible de dos etiquetas.",
      },
    },
    {
      id: "object-arrays",
      heading: "Los arrays de objetos generan columnas indexadas",
      body: [
        "Cuando el array contiene objetos, cada posición recibe su propio conjunto de columnas, numeradas por índice. Es fiel — no se fusiona nada — pero el número de columnas lo fija la fila más larga de todo el conjunto de datos.",
        "Mira la fila 2: tiene un solo item, así que cuatro de sus celdas quedan vacías. Con un pedido de 50 líneas en un archivo de 10.000 pedidos, cada otra fila arrastra 49 grupos de columnas en blanco.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: OBJECT_ARRAY_INPUT,
        outputLabel: "CSV de salida",
        output: OBJECT_ARRAY_OUTPUT,
        note: "Si tus arrays varían de longitud, convierte el array en sí: una fila por línea de pedido, con el id repetido.",
      },
    },
    {
      id: "ragged",
      heading: "Las claves faltantes se alinean, no desplazan",
      body: [
        "En datos reales rara vez todos los registros llevan las mismas claves. La cabecera es la unión de todas las claves vistas, en orden de primera aparición, y al registro que le falte una le corresponde una celda vacía en lugar de una fila desplazada.",
        "Este es el comportamiento que quieres, y vale la pena comprobarlo en cualquier conversor: la implementación ingenua toma las claves del primer registro como cabecera y descarta en silencio todo campo que aparezca más adelante.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: RAGGED_INPUT,
        outputLabel: "CSV de salida",
        output: RAGGED_OUTPUT,
        note: "`email` solo aparece en el segundo registro y aun así obtiene columna. No se descarta nada.",
      },
    },
    {
      id: "wrappers",
      heading: "Respuestas envueltas, y cuándo se detiene el desenvuelto",
      body: [
        "Las respuestas de API suelen poner las filas dentro de un sobre. Cuando exactamente una propiedad del objeto de nivel superior es un array, ese array se toma como las filas, así que puedes pegar una respuesta sin reformarla antes.",
      ],
      sample: {
        inputLabel: "Un array: se desenvuelve",
        input: WRAPPER_INPUT,
        outputLabel: "CSV de salida",
        output: WRAPPER_OUTPUT,
      },
    },
    {
      id: "two-arrays",
      heading: "Con dos arrays no se adivina",
      body: [
        "Con dos arrays no hay forma de saber cuál contiene las filas, así que el conversor deja de adivinar y aplana el objeto entero como un único registro. El resultado es una fila muy ancha, que casi con seguridad no es lo que querías — y eso es el punto: está visiblemente mal en lugar de silenciosamente medio bien.",
        "Si ves una sola fila de columnas indexadas, elige el array que querías y convierte ese.",
      ],
      sample: {
        inputLabel: "Dos arrays: no se desenvuelve",
        input: TWO_ARRAYS_INPUT,
        outputLabel: "CSV de salida",
        output: TWO_ARRAYS_OUTPUT,
        note: "Una fila, columnas indexadas de ambos arrays. Pega solo `items` para obtener la tabla que buscabas.",
      },
    },
    {
      id: "quoting",
      heading: "Comillas y el problema de las fórmulas",
      body: [
        "Una celda se entrecomilla cuando contiene el delimitador, una comilla o un salto de línea — las reglas estándar de CSV, con las comillas internas duplicadas.",
        "Una adición que conviene conocer: una celda que empieza por `=`, `+`, `-` o `@` también se entrecomilla. Esos caracteres hacen que Excel y Google Sheets traten la celda como una fórmula, que es cómo una exportación CSV acaba ejecutando código en la máquina de otra persona. Entrecomillar es la mitad barata de la solución.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: INJECTION_INPUT,
        outputLabel: "CSV de salida",
        output: INJECTION_OUTPUT,
        note: "`=1+1` se entrecomilla por el `=` inicial, `a,b` por la coma, y las comillas internas quedan duplicadas.",
      },
    },
    {
      id: "round-trip",
      heading: "Lo que no puedes recuperar",
      body: [
        "Convertir de vuelta produce claves planas, no el anidamiento del que partiste. Los puntos sobreviven como caracteres literales en el nombre de la clave: nada los vuelve a montar como objetos, porque un lector CSV corriente no tiene forma de saber si `user.name` era un campo anidado o una columna que de verdad llevaba un punto en el nombre.",
      ],
      sample: {
        inputLabel: "CSV de entrada",
        input: ROUND_TRIP_INPUT,
        outputLabel: "JSON de salida",
        output: ROUND_TRIP_OUTPUT,
        note: "Una clave plana llamada `user.name`, no un objeto `user`. Salida real de `/csv-to-json/`.",
      },
      points: [
        "**Los tipos se vuelven a adivinar en el regreso.** Un `01234` en una celda CSV se parsea como el número `1234`, igual que en YAML sin comillas. Los códigos postales y los identificadores de cuenta son las víctimas habituales.",
        "**`null` y la cadena vacía se vuelven lo mismo.** Ambos son una celda vacía, y una celda vacía se relee como cadena vacía.",
        "**Los arrays no vuelven.** Una celda `a; b` es una cadena con un punto y coma, no una lista.",
      ],
    },
    {
      id: "advice",
      heading: "Consejo práctico",
      body: [
        "Trata CSV como formato de exportación, no de almacenamiento. Es la respuesta correcta cuando el destino es una hoja de cálculo, una herramienta de BI o una persona; es la respuesta equivocada cuando piensas releer los datos como JSON más adelante.",
      ],
      points: [
        "Convierte el array del que realmente quieres filas, no el sobre que lo envuelve.",
        "Si los arrays dentro de tus registros varían de longitud, dale la vuelta a la forma: una fila por elemento, repitiendo los campos del padre.",
        "Revisa la fila de cabecera antes de confiar en un archivo: te dice exactamente qué hojas encontró el aplanado.",
        "Conserva el JSON original. Es la única copia que todavía conoce los tipos y la estructura.",
      ],
    },
  ],
  relatedLabel: "Pruébalo, o sigue leyendo",
  related: [
    {
      href: "/json-to-csv/",
      label: "Conversor de JSON a CSV",
      detail: "Aplana objetos anidados en columnas con puntos. El delimitador es seleccionable.",
    },
    {
      href: "/csv-to-json/",
      label: "Conversor de CSV a JSON",
      detail: "Comprueba exactamente cómo se relee un archivo plano.",
    },
    {
      href: "/wiki/es/json-vs-yaml/",
      label: "JSON vs YAML",
      detail: "El mismo problema de adivinar tipos, en el formato que la gente escribe a mano.",
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
  eyebrow: "Dados tabulares",
  heading: "JSON aninhado para CSV",
  standfirst:
    "CSV tem exatamente duas dimensões: linhas e colunas. JSON aninha em qualquer profundidade. Toda conversão entre os dois precisa responder a mesma pergunta — o que vira coluna — e é nessa resposta que os dados se perdem.",
  contentsLabel: "Nesta página",
  sections: [
    {
      id: "flattening",
      heading: "Objetos aninhados viram colunas com pontos",
      body: [
        "A conversão desce até cada valor folha e nomeia a coluna pelo caminho que percorreu. Um `city` dentro de `addr` dentro de `user` vira uma coluna chamada `user.addr.city`. Não há limite de profundidade, então a quantidade de colunas cresce com a forma dos seus dados, não com o número de chaves do nível superior.",
        "Essa parte se comporta bem e em princípio é reversível: os pontos registram a estrutura de onde você partiu.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: NESTED_INPUT,
        outputLabel: "CSV de saída",
        output: NESTED_OUTPUT,
        note: "Saída real de `/json-to-csv/`. Três valores folha, três colunas, qualquer que seja a profundidade do aninhamento.",
      },
    },
    {
      id: "arrays",
      heading: "Arrays são a parte difícil",
      body: [
        "Um array não tem nomes para seus membros, apenas posições, então não há nome de coluna honesto a derivar. O conversor trata os dois casos de forma diferente, e vale conhecer essa divisão antes de confiar na saída.",
        "Um array de valores simples colapsa em uma célula só, unido com ponto e vírgula mais espaço:",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: SCALAR_ARRAY_INPUT,
        outputLabel: "CSV de saída",
        output: SCALAR_ARRAY_OUTPUT,
        note: "Conveniente de ler, mas ambíguo: uma tag que já contém `; ` agora é indistinguível de duas tags.",
      },
    },
    {
      id: "object-arrays",
      heading: "Arrays de objetos geram colunas indexadas",
      body: [
        "Quando o array contém objetos, cada posição recebe seu próprio conjunto de colunas, numeradas pelo índice. É fiel — nada é mesclado — mas a quantidade de colunas é definida pela linha mais longa de todo o conjunto de dados.",
        "Olhe a linha 2: ela tem um item, então quatro das células ficam vazias. Com um pedido de 50 itens num arquivo de 10.000 pedidos, cada outra linha carrega 49 grupos de colunas em branco.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: OBJECT_ARRAY_INPUT,
        outputLabel: "CSV de saída",
        output: OBJECT_ARRAY_OUTPUT,
        note: "Se seus arrays variam de tamanho, converta o próprio array: uma linha por item, com o id do pedido repetido.",
      },
    },
    {
      id: "ragged",
      heading: "Chaves ausentes se alinham, não deslocam",
      body: [
        "Em dados reais raramente todos os registros carregam as mesmas chaves. O cabeçalho é a união de todas as chaves vistas, na ordem de primeira aparição, e o registro que não tiver uma recebe uma célula vazia em vez de uma linha deslocada.",
        "Esse é o comportamento que você quer, e vale verificar em qualquer conversor: a implementação ingênua pega as chaves do primeiro registro como cabeçalho e descarta silenciosamente todo campo que aparece só depois.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: RAGGED_INPUT,
        outputLabel: "CSV de saída",
        output: RAGGED_OUTPUT,
        note: "`email` aparece só no segundo registro e ainda assim ganha coluna. Nada é descartado.",
      },
    },
    {
      id: "wrappers",
      heading: "Respostas embrulhadas, e quando o desembrulho para",
      body: [
        "Respostas de API normalmente colocam as linhas dentro de um envelope. Quando exatamente uma propriedade do objeto de nível superior é um array, esse array é tratado como as linhas — então você pode colar uma resposta sem remodelá-la antes.",
      ],
      sample: {
        inputLabel: "Um array: desembrulha",
        input: WRAPPER_INPUT,
        outputLabel: "CSV de saída",
        output: WRAPPER_OUTPUT,
      },
    },
    {
      id: "two-arrays",
      heading: "Com dois arrays, sem adivinhação",
      body: [
        "Com dois arrays não há como dizer qual contém as linhas, então o conversor para de adivinhar e achata o objeto inteiro como um único registro. O resultado é uma linha bem larga, que quase certamente não é o que você queria — e é esse o ponto: está visivelmente errado em vez de silenciosamente meio certo.",
        "Se você vê uma única linha de colunas indexadas, escolha o array que queria e converta ele.",
      ],
      sample: {
        inputLabel: "Dois arrays: não desembrulha",
        input: TWO_ARRAYS_INPUT,
        outputLabel: "CSV de saída",
        output: TWO_ARRAYS_OUTPUT,
        note: "Uma linha, colunas indexadas dos dois arrays. Cole só `items` para obter a tabela que você queria.",
      },
    },
    {
      id: "quoting",
      heading: "Aspas e o problema das fórmulas de planilha",
      body: [
        "Uma célula recebe aspas quando contém o delimitador, uma aspa ou uma quebra de linha — as regras padrão de CSV, com as aspas internas duplicadas.",
        "Uma adição que vale conhecer: uma célula começando com `=`, `+`, `-` ou `@` também recebe aspas. Esses caracteres fazem o Excel e o Google Sheets tratarem a célula como fórmula, que é como uma exportação CSV vira execução de código na máquina de outra pessoa. Colocar aspas é a metade barata da solução.",
      ],
      sample: {
        inputLabel: "JSON de entrada",
        input: INJECTION_INPUT,
        outputLabel: "CSV de saída",
        output: INJECTION_OUTPUT,
        note: "`=1+1` recebe aspas por causa do `=` inicial, `a,b` por causa da vírgula, e as aspas internas ficam duplicadas.",
      },
    },
    {
      id: "round-trip",
      heading: "O que você não recupera",
      body: [
        "Converter de volta produz chaves planas, não o aninhamento de onde você partiu. Os pontos sobrevivem como caracteres literais no nome da chave — nada os remonta em objetos, porque um leitor CSV comum não tem como saber se `user.name` era um campo aninhado ou uma coluna que realmente tinha um ponto no nome.",
      ],
      sample: {
        inputLabel: "CSV de entrada",
        input: ROUND_TRIP_INPUT,
        outputLabel: "JSON de saída",
        output: ROUND_TRIP_OUTPUT,
        note: "Uma chave plana chamada `user.name`, não um objeto `user`. Saída real de `/csv-to-json/`.",
      },
      points: [
        "**Os tipos são readivinhados na volta.** `01234` numa célula CSV é parseado como o número `1234`, do mesmo jeito que em YAML sem aspas. CEPs e identificadores de conta são as vítimas usuais.",
        "**`null` e string vazia viram a mesma coisa.** Ambos são uma célula vazia, e uma célula vazia é relida como string vazia.",
        "**Arrays não voltam.** Uma célula `a; b` é uma string com um ponto e vírgula, não uma lista.",
      ],
    },
    {
      id: "advice",
      heading: "Conselho prático",
      body: [
        "Trate CSV como formato de exportação, não de armazenamento. É a resposta certa quando o destino é uma planilha, uma ferramenta de BI ou uma pessoa; é a resposta errada quando você planeja reler os dados como JSON depois.",
      ],
      points: [
        "Converta o array de onde você realmente quer as linhas, não o envelope em volta dele.",
        "Se os arrays dentro dos seus registros variam de tamanho, inverta a forma: uma linha por item, com os campos do pai repetidos.",
        "Confira a linha de cabeçalho antes de confiar num arquivo — ela diz exatamente quais folhas o achatamento encontrou.",
        "Guarde o JSON original. É a única cópia que ainda conhece os tipos e a estrutura.",
      ],
    },
  ],
  relatedLabel: "Experimente, ou continue lendo",
  related: [
    {
      href: "/json-to-csv/",
      label: "Conversor de JSON para CSV",
      detail: "Achata objetos aninhados em colunas com pontos. O delimitador é selecionável.",
    },
    {
      href: "/csv-to-json/",
      label: "Conversor de CSV para JSON",
      detail: "Veja exatamente como um arquivo plano é relido.",
    },
    {
      href: "/wiki/pt/json-vs-yaml/",
      label: "JSON vs YAML",
      detail: "O mesmo problema de adivinhar tipos, no formato que as pessoas escrevem à mão.",
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
  nestedInput: NESTED_INPUT,
  nestedOutput: NESTED_OUTPUT,
  scalarArrayInput: SCALAR_ARRAY_INPUT,
  scalarArrayOutput: SCALAR_ARRAY_OUTPUT,
  objectArrayInput: OBJECT_ARRAY_INPUT,
  objectArrayOutput: OBJECT_ARRAY_OUTPUT,
  raggedInput: RAGGED_INPUT,
  raggedOutput: RAGGED_OUTPUT,
  wrapperInput: WRAPPER_INPUT,
  wrapperOutput: WRAPPER_OUTPUT,
  twoArraysInput: TWO_ARRAYS_INPUT,
  twoArraysOutput: TWO_ARRAYS_OUTPUT,
  injectionInput: INJECTION_INPUT,
  injectionOutput: INJECTION_OUTPUT,
  roundTripInput: ROUND_TRIP_INPUT,
  roundTripOutput: ROUND_TRIP_OUTPUT,
};
