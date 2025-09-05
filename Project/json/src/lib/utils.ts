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
  } catch (error) {
    throw new Error("Invalid JSON format");
  }
}

// JSON压缩工具函数
export function minifyJSON(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 0);
  } catch (error) {
    throw new Error("Invalid JSON format");
  }
}

// JSON验证工具函数
export function validateJSON(jsonString: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (error: any) {
    return { valid: false, error: error.message };
  }
}

// JSON转XML工具函数
export function jsonToXML(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString);
    function convert(obj: any, rootName: string = "root"): string {
      if (obj === null) return `<${rootName} null="true"/>`;
      if (typeof obj === "boolean") return `<${rootName}>${obj}</${rootName}>`;
      if (typeof obj === "number") return `<${rootName}>${obj}</${rootName}>`;
      if (typeof obj === "string") return `<${rootName}>${obj}</${rootName}>`;
      if (Array.isArray(obj)) {
        let result = `<${rootName}>`;
        obj.forEach((item, index) => {
          result += convert(item, `item`);
        });
        result += `</${rootName}>`;
        return result;
      }
      if (typeof obj === "object") {
        let result = `<${rootName}>`;
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            result += convert(obj[key], key);
          }
        }
        result += `</${rootName}>`;
        return result;
      }
      return `<${rootName}/>`;
    }
    return convert(parsed);
  } catch (error) {
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
    parsed.forEach(item => {
      if (typeof item === "object" && item !== null) {
        Object.keys(item).forEach(key => allKeys.add(key));
      }
    });
    
    const headers = Array.from(allKeys);
    const csvRows = [headers.join(",")];
    
    parsed.forEach(item => {
      const values = headers.map(header => {
        const value = item[header];
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
  } catch (error) {
    throw new Error("Invalid JSON format or structure for CSV conversion");
  }
}