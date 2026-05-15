export const parseBio = (text: string | null | undefined) => {
  if (!text) return { especialidade: "Especialista", descricao: "" };
  if (text.includes("|")) {
    const parts = text.split("|");
    return {
      especialidade:
        parts[0]?.replace(/especialista:\s*/i, "").trim() || "Especialista",
      descricao: parts[1]?.replace(/bio:\s*/i, "").trim() || "",
    };
  }
  return { especialidade: "Especialista", descricao: text.trim() };
};
