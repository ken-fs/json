import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// JSON格式化工具函数
export function formatJSON(jsonString: string, indent: number = 2): string {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, indent);
  } catch {
    throw new Error("Invalid JSON format");
  }
}

// JSON压缩工具函数
export function minifyJSON(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 0);
  } catch {
    throw new Error("Invalid JSON format");
  }
}

// JSON验证工具函数
export function validateJSON(jsonString: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (error: unknown) {
    return { valid: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// JSON转XML工具函数
export function jsonToXML(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString);
    function convert(obj: unknown, rootName: string = "root"): string {
      if (obj === null) return `<${rootName} null="true"/>`;
      if (typeof obj === "boolean") return `<${rootName}>${obj}</${rootName}>`;
      if (typeof obj === "number") return `<${rootName}>${obj}</${rootName}>`;
      if (typeof obj === "string") return `<${rootName}>${obj}</${rootName}>`;
      if (Array.isArray(obj)) {
        let result = `<${rootName}>`;
        obj.forEach((item) => {
          result += convert(item, `item`);
        });
        result += `</${rootName}>`;
        return result;
      }
      if (typeof obj === "object") {
        let result = `<${rootName}>`;
        const objRecord = obj as Record<string, unknown>;
        for (const key in objRecord) {
          if (objRecord.hasOwnProperty(key)) {
            result += convert(objRecord[key], key);
          }
        }
        result += `</${rootName}>`;
        return result;
      }
      return `<${rootName}/>`;
    }
    const xmlContent = convert(parsed);
    return `<?xml version="1.0" encoding="UTF-8"?>\n${xmlContent}`;
  } catch {
    throw new Error("Invalid JSON format");
  }
}

// JSON转CSV工具函数
export function jsonToCSV(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      throw new Error("JSON must be an array of objects");
    }
    
    if (parsed.length === 0) {
      return "";
    }
    
    // 获取所有可能的列名
    const allKeys = new Set<string>();
    parsed.forEach((item: unknown) => {
      if (typeof item === "object" && item !== null) {
        Object.keys(item as Record<string, unknown>).forEach(key => allKeys.add(key));
      }
    });
    
    const headers = Array.from(allKeys);
    const csvRows = [headers.join(",")];
    
    parsed.forEach((item: unknown) => {
      const values = headers.map(header => {
        const value = (item as Record<string, unknown>)[header];
        if (value === null || value === undefined) {
          return "";
        }
        if (typeof value === "string" && (value.includes(",") || value.includes('"') || value.includes("\n"))) {
          // 转义包含特殊字符的字符串
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvRows.push(values.join(","));
    });
    
    return csvRows.join("\n");
  } catch {
    throw new Error("Invalid JSON format or structure for CSV conversion");
  }
}

// JSON转义工具函数
export function escapeJSON(jsonString: string): string {
  try {
    // 先解析确保是有效的JSON
    const parsed = JSON.parse(jsonString);
    // 将JSON对象转换为字符串
    const jsonAsString = JSON.stringify(parsed);
    // 再次转义，使其成为一个被转义的字符串
    return JSON.stringify(jsonAsString);
  } catch {
    throw new Error("Invalid JSON format for escaping");
  }
}

// JSON取消转义工具函数
export function unescapeJSON(escapedJsonString: string): string {
  try {
    // 先尝试解析转义的字符串
    let unescapedString: string;
    try {
      unescapedString = JSON.parse(escapedJsonString);
    } catch {
      // 如果解析失败，可能已经是普通JSON
      unescapedString = escapedJsonString;
    }
    
    // 确保结果是有效的JSON并格式化
    const parsed = JSON.parse(unescapedString);
    return JSON.stringify(parsed, null, 2);
  } catch {
    throw new Error("Invalid escaped JSON format");
  }
}

// 检测是否为转义的JSON
export function isEscapedJSON(str: string): boolean {
  try {
    // 尝试解析字符串
    const parsed = JSON.parse(str);
    // 如果解析结果是字符串，再次尝试解析这个字符串
    if (typeof parsed === 'string') {
      JSON.parse(parsed);
      return true; // 如果两次解析都成功，那么这是一个转义的JSON
    }
    return false; // 如果第一次解析的结果不是字符串，那么这不是转义的JSON
  } catch {
    return false; // 解析失败，不是有效的JSON
  }
}

// JSON转TypeScript接口工具函数
export function jsonToTypeScript(jsonString: string, interfaceName: string = "RootObject"): string {
  try {
    const parsed = JSON.parse(jsonString);

    function getTypeFromValue(value: unknown, key?: string): string {
      if (value === null) return "null";
      if (typeof value === "boolean") return "boolean";
      if (typeof value === "number") return "number";
      if (typeof value === "string") return "string";
      if (Array.isArray(value)) {
        if (value.length === 0) return "unknown[]";
        const firstElementType = getTypeFromValue(value[0]);
        return `${firstElementType}[]`;
      }
      if (typeof value === "object" && value !== null) {
        return key ? `${capitalize(key)}Interface` : "object";
      }
      return "unknown";
    }

    function capitalize(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function generateInterface(obj: unknown, name: string): string[] {
      if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
        return [];
      }

      const interfaces: string[] = [];
      const objRecord = obj as Record<string, unknown>;
      const properties: string[] = [];

      for (const key in objRecord) {
        if (objRecord.hasOwnProperty(key)) {
          const value = objRecord[key];
          const type = getTypeFromValue(value, key);

          // 如果是嵌套对象，生成子接口
          if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            const childInterfaceName = `${capitalize(key)}Interface`;
            const childInterfaces = generateInterface(value, childInterfaceName);
            interfaces.push(...childInterfaces);
          }

          properties.push(`  ${key}: ${type};`);
        }
      }

      const interfaceDefinition = `interface ${name} {\n${properties.join('\n')}\n}`;
      interfaces.push(interfaceDefinition);

      return interfaces;
    }

    const interfaces = generateInterface(parsed, interfaceName);
    return interfaces.join('\n\n');
  } catch {
    throw new Error("Invalid JSON format for TypeScript conversion");
  }
}

// JSON转Java类工具函数
export function jsonToJava(jsonString: string, className: string = "RootObject"): string {
  try {
    const parsed = JSON.parse(jsonString);

    function getJavaTypeFromValue(value: unknown, key?: string): string {
      if (value === null) return "Object";
      if (typeof value === "boolean") return "boolean";
      if (typeof value === "number") {
        return Number.isInteger(value as number) ? "int" : "double";
      }
      if (typeof value === "string") return "String";
      if (Array.isArray(value)) {
        if (value.length === 0) return "List<Object>";
        const firstElementType = getJavaTypeFromValue(value[0]);
        return `List<${firstElementType}>`;
      }
      if (typeof value === "object" && value !== null) {
        return key ? capitalize(key) : "Object";
      }
      return "Object";
    }

    function capitalize(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function generateClass(obj: unknown, name: string): string[] {
      if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
        return [];
      }

      const classes: string[] = [];
      const objRecord = obj as Record<string, unknown>;
      const fields: string[] = [];
      const getters: string[] = [];
      const setters: string[] = [];

      for (const key in objRecord) {
        if (objRecord.hasOwnProperty(key)) {
          const value = objRecord[key];
          const type = getJavaTypeFromValue(value, key);

          // 如果是嵌套对象，生成子类
          if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            const childClassName = capitalize(key);
            const childClasses = generateClass(value, childClassName);
            classes.push(...childClasses);
          }

          // 生成字段
          fields.push(`    private ${type} ${key};`);

          // 生成getter
          const getterName = `get${capitalize(key)}`;
          getters.push(`    public ${type} ${getterName}() {\n        return ${key};\n    }`);

          // 生成setter
          const setterName = `set${capitalize(key)}`;
          setters.push(`    public void ${setterName}(${type} ${key}) {\n        this.${key} = ${key};\n    }`);
        }
      }

      const imports = fields.some(field => field.includes('List<'))
        ? 'import java.util.List;\n\n'
        : '';

      const classDefinition = `${imports}public class ${name} {
${fields.join('\n')}

${getters.join('\n\n')}

${setters.join('\n\n')}
}`;

      classes.push(classDefinition);
      return classes;
    }

    const classes = generateClass(parsed, className);
    return classes.join('\n\n');
  } catch {
    throw new Error("Invalid JSON format for Java conversion");
  }
}