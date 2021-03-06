const processDataRaw = (data) => {
  
};

export const filterDataStatement = ({ data, term }) => {
  const result = {
    statementList: [],
    toltalAmount: 0,
    toltalAmountRefund: 0,
    toltalAmountNoRefund: 0
  };
  let toltal = 0;
  let toltalRefund = 0;
  let toltalNoRefund = 0;
  if (data) {
    result.statementList = data.filter(item => item.item_id && String(item.item_id).includes(term));
  }
  if (result.statementList.length > 0) {
    result.statementList.forEach(item => {
      toltal += item.amount;
      if (item.type.includes('Refund')) {
        toltalRefund += item.amount;
      } else {
        toltalNoRefund += item.amount;
      }
    });
  }
  result.toltalAmount = parseFloat(toltal.toFixed(2));
  result.toltalAmountRefund = parseFloat(toltalRefund.toFixed(2));
  result.toltalAmountNoRefund = parseFloat(toltalNoRefund.toFixed(2));
  return result;
};

export const filterDataStatementCompact = ({ data, term }) => {
  const result = {
    statementList: [],
    numberSales: 0,
    toltal: 0,
    toltalAmount: 0,
    toltalUsTax: 0,
    toltalAmountNoRefund: 0,
    toltalExtendsSupport: 0,
    toltalNoExtendsSupport: 0,
    toltalAmountRefund: 0
  };
  if (data) {
    const dataRaw = data.filter(item => item.item_id && String(item.item_id).includes(term));
    const orderIdList = [];
    const dataByOrderId = [];
    let numberSales = 0;
    let toltal = 0;
    let toltalUsTax = 0;
    let toltalRefund = 0;
    let toltalNoRefund = 0;
    let toltalExtendsSupport = 0;
    let toltalNoExtendsSupport = 0;
    dataRaw.forEach(item => {
      if (!orderIdList.includes(item.order_id)) {
        orderIdList.push(item.order_id);
        const lineItem = {
          date: item.date,
          order_id: item.order_id,
          type: '',
          detail: '',
          item_id: item.item_id,
          price: 0,
          au_gst: 0,
          eu_vat: 0,
          us_rwt: 0,
          us_bwt: 0,
          amount: 0,
          amount_extends_support: 0,
          other_party_country: item.other_party_country,
          other_party_region: item.other_party_region,
          other_party_city: item.other_party_city,
          other_party_zipcode: item.other_party_zipcode
        }
        const arrayByOrderId = dataRaw.filter(itemOrderId => itemOrderId.order_id === item.order_id);
        let amount = 0;
        let auGst = 0;
        let euVat = 0;
        let usRwt = 0;
        let usBwt = 0;
        let amountExtendsSupport = 0;
        let isRefund = false;
        let isReverse = false;
        arrayByOrderId.forEach(element => {
          // TOTAL ALL MONEY
          toltal += element.amount;

          // TOTAL REFUND
          if (element.type === 'Sale Refund' || element.type === 'Author Fee Refund') {
            toltalRefund += element.amount;
            isRefund = true;
          } else {
            toltalNoRefund += element.amount;
          }

          // TOTAL AMOUND NO EXTENDS SUPPORT
          if (!element.detail.includes('6 months extended support') && !element.detail.includes('Author Fee for extended support')) {
            amount += element.amount;
            toltalNoExtendsSupport += element.amount;
          } else {
            amountExtendsSupport += element.amount;
            toltalExtendsSupport += element.amount;
          }

          // TOTAL TAX
          if (element.au_gst != null) auGst += element.au_gst;
          if (element.eu_vat != null) euVat += element.eu_vat;
          if (element.us_rwt != null) usRwt += element.us_rwt;
          if (element.us_bwt != null) usBwt += element.us_bwt;

          // TYPE ITEM NAME
          if (element.detail.includes('Regular License')) {
            lineItem.detail = element.detail.replace(' (Regular License)', '');
            lineItem.type = element.type;
          }
          if (element.type === 'Sale Reversal') {
            isReverse = true;
          }
        });
        if (!isRefund && !isReverse) {
          numberSales += 1;
        }
        if (isRefund) {
          if (!(lineItem.type === 'Sale')) {
            numberSales -= 1;
          }
          lineItem.type = `Refund + ${lineItem.type}`;
        }
        if (isReverse) {
          if (!(lineItem.type === 'Sale')) {
            numberSales -= 1;
          }
          lineItem.type = `Reverse + ${lineItem.type}`;
        }
        if (auGst !== 0) lineItem.au_gst = parseFloat(auGst.toFixed(2));
        if (euVat !== 0) lineItem.eu_vat = parseFloat(euVat.toFixed(2));
        if (usRwt !== 0) {
          lineItem.us_rwt = parseFloat(usRwt.toFixed(2));
          toltalUsTax += usRwt;
        }
        if (usBwt !== 0) lineItem.us_bwt = parseFloat(usBwt.toFixed(2));
        lineItem.amount_extends_support = parseFloat(amountExtendsSupport.toFixed(2));
        lineItem.amount = parseFloat(amount.toFixed(2));
        dataByOrderId.push(lineItem);
      }
    });
    result.toltal = parseFloat(toltal.toFixed(2));
    result.toltalAmountRefund = parseFloat(toltalRefund.toFixed(2));
    result.toltalAmountNoRefund = parseFloat(toltalNoRefund.toFixed(2));
    result.toltalAmount = parseFloat(toltalNoExtendsSupport.toFixed(2));
    result.toltalExtendsSupport = parseFloat(toltalExtendsSupport.toFixed(2));
    result.toltalUsTax = parseFloat(toltalUsTax.toFixed(2));
    result.numberSales = numberSales;

    result.statementList = dataByOrderId;
  }
  return result;
};
