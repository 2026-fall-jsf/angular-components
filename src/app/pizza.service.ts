import { Service } from '@angular/core';

export type PizzaTopping = {
    name: string;
    price: number;
    checked: boolean;
};

const dummyToppingsFromApi = [
    {
        name: "Peperoni",
        price: 3.50,
    },
    {
        name: "Sausage",
        price: 4.25,
    },
    {
        name: "Extra Cheese",
        price: 0.99,
    },
];

@Service()
export class PizzaService {

    getAvailableToppings = (): PizzaTopping[] => {

        // Make an API call here.. 
        // But we are gonna fake it.. 

        // transform, or map, or shape (v) the data from
        // our api, to the shape we need ! ! ! 
        const pizzaToppingsWithCheckedProperty = dummyToppingsFromApi.map(
            x => (
                {
                    ...x,
                    checked: false,
                }
            )
        );

        return pizzaToppingsWithCheckedProperty;


    };

}
