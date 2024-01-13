export function getDate(proxCiclo){
  const [dia, mes, ano] = proxCiclo.split('/');
  
  if(ano == '22' || ano == '2022'){
    return new Date(proxCiclo)
  }
  
  return new Date(`${mes}/${dia}/${ano}`);
}

export function formatDateStringUS(date){
  const [dia, mes, ano] = date.split('/');
  return `${mes}/${dia}/${ano}`;
}

export function getDatesBetween(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  endDate.setFullYear(endDate.getFullYear());

  while (currentDate <= endDate) {
    const newDate = new Date(currentDate);
    dates.push({ data: formatarData(newDate), valor: 0, active: 0, inative: 0 });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return dates;
}

export function formatarData(data){
  return data.toLocaleDateString('pt-BR', { day:'2-digit', month: '2-digit', year: '2-digit' });
}

export function splitDateString(date){
  const [dia, mes, ano] = date.split('/');
  return { dia, mes, ano }; 
}