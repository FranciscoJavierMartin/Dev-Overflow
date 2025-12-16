// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isInvalidInput(field: any): boolean {
  return field.state.meta.isTouched && !field.state.meta.isValid;
}
