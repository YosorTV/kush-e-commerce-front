export const inputFieldAdapter = (input: any, state: any) => ({ ...input, defaultValue: state[input.name] });
