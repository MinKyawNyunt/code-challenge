export const tokenNameImageMapper = (currency: string) => {
  const data: { [key: string]: string } = {
    'RATOM': 'rATOM',
    'STATOM': 'stATOM',
    'STEVMOS': 'stEVMOS',
    'STLUNA': 'stLUNA',
    'STOSMO': 'stOSMO',
  }

  if(data[currency] !== undefined) {
    return data[currency]
  }

  return currency;
}
