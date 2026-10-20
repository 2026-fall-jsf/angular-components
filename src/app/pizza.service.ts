import { Service } from '@angular/core';
import { PizzaToppings } from './pizza-toppings/pizza-toppings';

export type PizzaTopping = {
    name: string;
    price: number;
    checked: boolean;
};

const dummyToppingsFromApi = [
    {
        name: "Pepperoni",
        price: 3.50,
        checked: false,
    },
    {
        name: "Sausage",
        price: 4.25,
        checked: false,
    },
    {
        name: "Extra Cheese",
        price: 0.99,
        checked: true,
    },
];

@Service()
export class PizzaService {

    getAvailablePizzaToppings = (): PizzaTopping[] => {

        // make an api call here...
        // but we're gonna fake it

        // transform, or map, or shape (v) the data from
        // our api, to the shape we need!!!
        const pizzaToppingsWithCheckedProperty = dummyToppingsFromApi.map(
            x => (
                {
                    ...x,
                    checked: false
                }
            )
        );

        return [];
    };
}
