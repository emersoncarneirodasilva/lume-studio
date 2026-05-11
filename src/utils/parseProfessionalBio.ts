export function parseProfessionalBio(fullBio: string) {
  const parts = fullBio.split(" | ");
  const role = parts[0]?.replace("Especialista: ", "").trim() || "Especialista";
  const bio = parts[1]?.replace("Bio: ", "").trim() || "";

  return { role, bio };
}
