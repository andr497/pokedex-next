export const extractIdFromUrl = (url: string): number =>
    Number(url.split("/").filter(Boolean).pop());
