export function convertToObject(data) {
  if (!Array.isArray(data)) return {};

  const result = {};

  data.forEach((item, idx) => {
    const key = item._id;

    result[key] = { ...item, _id: idx };
  });

  return result;
}
export function convertToOptions(data) {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    value: item._id,
    label: item.name,
  }));
}
