import pLimit from "p-limit";

export const limitConcurrency = pLimit(5);
