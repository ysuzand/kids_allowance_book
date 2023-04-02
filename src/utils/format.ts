export const getFormValueObject = (formTarget: HTMLFormElement) => {
    const formData = new FormData(formTarget as HTMLFormElement)
    const formValue = Object.fromEntries(formData.entries())

    return { formValue }
}