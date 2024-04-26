import { encoded, translations } from "./data.js";

function decodable(key, value) {
  const exceptions = new Set(["groupId", "service", "formatSize", "ca"]);
  return (
    key.endsWith("Id") && !exceptions.has(key) && value !== null && value !== ""
  );
}

function decode(encoded, translations) {
  const uniqueIds = new Set();

  const decodedList = encoded.map((item) => {
    const newItem = { ...item };
    for (const key in item) {
      if (decodable(key, item[key])) {
        uniqueIds.add(item[key]);
        newItem[key] = translations[item[key]] || item[key];
      }
    }
    return newItem;
  });

  return { decodedList, uniqueIds };
}

const decoded = decode(encoded, translations);
console.log(decoded);
