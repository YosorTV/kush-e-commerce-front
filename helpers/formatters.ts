export const formatPrice = (
  amount: number,
  locale: string,
  currency: number
) => {
  const formattedAmount = new Intl.NumberFormat(
    locale === 'uk' ? 'uk-UA' : 'en-US',
    {
      style: 'currency',
      currency: locale === 'uk' ? 'UAH' : 'USD',
    }
  ).format(locale === 'uk' ? Number(currency) * amount : amount);

  const [integerPart, fractionalPart] = formattedAmount.split('.');

  return fractionalPart === '00' ? integerPart : formattedAmount;
};

export const formatTotalAmount = (data: any[]) => {
  if (!data) return null;

  const totalPrice = data.reduce((prev, item) => {
    return prev + item.quantity * item.unit_amount;
  }, 0);

  return { totalPrice };
};

export const formatDate = (date: Date) => {
  const fullDate = new Date(date);

  const day = String(fullDate.getDate()).padStart(2, '0'); // Get the day and pad with leading zeros if necessary
  const month = String(fullDate.getMonth() + 1).padStart(2, '0'); // Get the month (0-based) and pad with leading zeros if necessary
  const year = fullDate.getFullYear();

  return `${month}/${day}/${year}`;
};

export const formatBySlug = (data: any[], slug: string) => {
  if (!data) return [];

  return data.filter((element) => element?.slug === slug);
};
