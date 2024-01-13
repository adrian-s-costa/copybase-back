import { formatDateStringUS, getDate, getDatesBetween } from 'src/common/getRangeFromDates';
import { formatarVariavel } from 'src/common/variableFormatter';
import * as xlsx from 'xlsx';

export class ChurnRateUsecases {
  async execute(file: Buffer){
    const workbook = xlsx.read(file.buffer, { 
      type: 'buffer', 
      cellDates: true,
      cellNF: false,
      cellText: false
    });
  
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const propertiesNames = jsonData[0] as string[];
    propertiesNames.map((propertiesName, index)=> jsonData[0][index] = formatarVariavel(propertiesName))
    const newWorksheet = xlsx.utils.aoa_to_sheet(jsonData as any[][]);
    workbook.Sheets[sheetName] = newWorksheet;
  
    const options = {
      raw: false,
      dateNF: 'dd-mm-yyyy'
    };
  
    const jsonDataWithVariablesNamesFormatted = xlsx.utils.sheet_to_json(newWorksheet, options);
  
    const jsonDataWithVariablesNamesAndDatesFormatted = jsonDataWithVariablesNamesFormatted.map((obj: any) => {
      const objWithDatesFormatted: any = {
        ...obj,
        proximoCiclo: getDate(obj.proximoCiclo)
      };
      return objWithDatesFormatted;
    });
  
    let maxDate = new Date(0);
    let menorDate: Date;
    
    jsonDataWithVariablesNamesAndDatesFormatted.forEach((obj) => {
      const months = obj.periodicidade === "Anual" ? 12 : 1;
      const dataInicio = new Date(obj.dataInicio);
      const chargesAmount = Number(obj.quantidadeCobrancas);
  
      dataInicio.setMonth(dataInicio.getMonth() + (chargesAmount * months));
  
      if (dataInicio > maxDate) {
        maxDate = dataInicio;
        menorDate = dataInicio;
      }
    });
    
    jsonDataWithVariablesNamesAndDatesFormatted.forEach((obj) => {
      const data: Date = new Date(obj.dataInicio);
      if (data.getTime() < menorDate.getTime()) {
        menorDate = data;
      }
    });
  
    const rangeArray = getDatesBetween(menorDate, maxDate)
  
    rangeArray.forEach((objDate, indexDates) => {
      const newDateFromArray = new Date(formatDateStringUS(objDate.data));
      jsonDataWithVariablesNamesAndDatesFormatted.forEach((objJson, indexJson) => {
        const inicioDate = new Date(objJson.dataInicio)
        const cancelDate = new Date(objJson.dataCancelamento)
        if (inicioDate.getMonth() === newDateFromArray.getMonth() && inicioDate.getFullYear() === newDateFromArray.getFullYear()){
          switch (objJson.periodicidade){
            case 'Anual':
              const CHARGES_AMOUNT = Number(objJson.quantidadeCobrancas)
              const CHARGES_AMOUNT_YEARLY = 12 * CHARGES_AMOUNT
              for(let i = 0; i < CHARGES_AMOUNT_YEARLY; i++){
                rangeArray[indexDates + i].active += 1;
              }
            break
            case 'Mensal':
              for(let i = 0; i < objJson.quantidadeCobrancas; i++){
                rangeArray[indexDates + i].active += 1;
              }
            break
          }
          return
        } 
        else if (cancelDate && cancelDate.getMonth() === newDateFromArray.getMonth() && cancelDate.getFullYear() === newDateFromArray.getFullYear()){
          objDate.inative += 1;
          return
        }
      })
      objDate.valor = (objDate.inative/objDate.active) * 100
    })
    console.log(rangeArray);
    return rangeArray;
  }
}