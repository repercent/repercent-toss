export const getRandomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const floorToThousand = (value: number) => Math.floor(value / 1000) * 1000;
