import { formatDateStringUS, formatarData, getDatesBetween, splitDateString } from "./getRangeFromDates";
import { insertValue } from "./insertValues";

export function getMonths(initialDate: Date, endDate: Date, jsonData: any[]){
  const datesAndValuesArray = getDatesBetween(initialDate, endDate);

  datesAndValuesArray.map((dateAndValueObj, indexDates) => {
    const newDateFromArray = new Date(formatDateStringUS(dateAndValueObj.data));
    jsonData.map((jsonObj, indexJson)=>{
      const inicioDate = new Date(jsonObj.dataInicio)
      if (inicioDate.getMonth() === newDateFromArray.getMonth() && inicioDate.getFullYear() === newDateFromArray.getFullYear()){
        insertValue(indexJson, indexDates, jsonData, datesAndValuesArray)
        return
      }
    })
  })

  return datesAndValuesArray;

  // return datesAndValuesArray.map((dado) => {
  //   const assinaturasFiltradas = jsonData.filter((assinatura) => {
  //     const dataInicio = new Date(assinatura.dataInicio);
  //     const dataFim = new Date(assinatura.proximoCiclo);
  //     const dataDado = new Date(dado.data);
  //     return (
  //       dataDado >= dataInicio &&
  //       dataDado < dataFim
  //     );
  //   });

  //   const valorTotal = assinaturasFiltradas.reduce((total, assinatura) => {
  //     const valor = parseFloat(assinatura.valor);
  //     if (assinatura.periodicidade === "Mensal") {
  //       return total + valor * parseInt(assinatura.quantidadeCobrancas);
  //     } else if (assinatura.periodicidade === "Anual") {
  //       return (total + (valor * assinatura.quantidadeCobrancas)) / 12;
  //     } else {
  //       return total;
  //     }
  //   }, 0);

  //   return { ...dado, valor: valorTotal };
  // });
}
