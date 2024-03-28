export const getParams = (options?: any) => {
  return {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options,
    },
  };
};


export const postParams = ({ data, options }: any) => {
  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options,
    },
    body: JSON.stringify(data),
  };
};

export const putParams = (options: any, body: any) => {
  return {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options,
    },
    body: JSON.stringify(body),
  };
};

export const patchParams = (options: any, body: any) => {
  return {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options,
    },
    body: JSON.stringify(body),
  };
};

export const deleteParams = (options: any, body: any) => {
  return {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options,
    },
    body: JSON.stringify(body),
  };
};

export const PRICE_LOCALE = {
  USD: {
    style: 'currency',
    currency: 'USD',
  },
};
