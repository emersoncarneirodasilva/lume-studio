export function parseServiceDescription(description: string) {
  const parts = description.split(" | ");

  const type = parts[0]?.replace("Tipo: ", "").trim() || "";

  const desc = parts[1]?.replace("Descrição: ", "").trim() || "";

  return { type, desc };
}
