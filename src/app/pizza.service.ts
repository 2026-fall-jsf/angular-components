import { Service } from '@angular/core';

export type PizzaTopping = {
  name: string;
  price: number;
  checked: boolean;
};

const dummyToppingsFromApi = [
  {
    name: 'Pepperoni',
    price: 3.5,
  },
  {
    name: 'Sausage',
    price: 4.25,
  },
  {
    name: 'Cheese',
    price: 0.99,
  },
];

@Service()
export class PizzaService {
  getAvailablePizzaToppings = (): PizzaTopping[] => {
    // make an aop call here, but we're going to fake it.

    //transform, or map, or shape (v) the data from our api, to the shape we need

    const pizzaToppingsWithCheckedProperty = dummyToppingsFromApi.map((x) => ({
      ...x,
      checked: false,
    }));

    return [];
  };
}
