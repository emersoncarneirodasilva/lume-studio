export const formatDetails = (rawDescription: string | null | undefined) => {
  if (!rawDescription) return { type: null, description: "" };

  if (rawDescription.includes("|")) {
    const parts = rawDescription.split("|");

    // Limpa os prefixos "Tipo:" e "Descrição:" ignorando maiúsculas/minúsculas
    const extractedType = parts[0].replace(/tipo:\s*/i, "").trim();
    const extractedDesc = parts[1].replace(/descrição:\s*/i, "").trim();

    return { type: extractedType, description: extractedDesc };
  }

  // Se não houver a barra '|', assume que o texto inteiro é a descrição
  return { type: null, description: rawDescription.trim() };
};
