export function formatarVariavel(frase) {
  const semCaracteresEspeciais = frase
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .toLowerCase();

  const palavrasFormatadas = semCaracteresEspeciais
    .split(/\s+/)
    .map((palavra, index) => {
      return index === 0 ? palavra : palavra.charAt(0).toUpperCase() + palavra.slice(1);
    });

  const resultado = palavrasFormatadas.join("");

  return resultado;
}