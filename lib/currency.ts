import currency from 'currency.js';

export const VND = (v: number) =>
  currency(v, { symbol: 'đ', decimal: '.', separator: ',' ,  pattern: `# !`, precision:0});
