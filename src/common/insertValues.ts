export function insertValue(indexJson, indexDates, jsonData, datesAndValuesArray){
  switch (jsonData[indexJson].periodicidade){
    case 'Anual':
      const CHARGES_AMOUNT = Number(jsonData[indexJson].quantidadeCobrancas)
      const CHARGES_AMOUNT_YEARLY = 12 * CHARGES_AMOUNT

      for(let i = 0; i < CHARGES_AMOUNT_YEARLY; i++){
        try{
          let floatValue = parseFloat(jsonData[indexJson].valor) * CHARGES_AMOUNT;
          datesAndValuesArray[indexDates + i].valor += floatValue/CHARGES_AMOUNT_YEARLY;
        }catch(error){
          console.log('erro: ', indexDates + i )
        }
      }
    break
    case 'Mensal':
      for(let i = 0; i < jsonData[indexJson].quantidadeCobrancas; i++){
        try{
          let floatValue = parseFloat(jsonData[indexJson].valor);
          datesAndValuesArray[indexDates + i].valor += floatValue
        }catch(error){
          console.log('erro: ', indexDates)
        }
      }
    break
  }
}