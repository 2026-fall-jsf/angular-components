import { Service } from '@angular/core';

export type PizzaTopping = {
    name: string;
    price: number;
    checked: boolean;
};

const dummyToppingsFromApi = [
    {
        name: "Pepperoni",
        price: 3.50,
    },
    {
        name: "Sausage",
        price: 4.20,
    },
    {
        name: "Extra Cheese",
        price: 0.99,
    },
];

@Service()
export class PizzaService {
    getAvailablePizzaToppings = (): PizzaTopping[] => {
       
        const pizzaToppingsWithCheckedProperty = dummyToppingsFromApi.map(
            (x: any) => (
                {
                ...x,
                checked: false,
                }
            )
        );

        return pizzaToppingsWithCheckedProperty;
};
