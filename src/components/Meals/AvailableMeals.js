import React,{ useEffect, useState} from 'react';
import classes from './AvailableMeals.module.css'
import { Card } from '../UI/Card';
import { MealItem } from './MealItem/MealItem';

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

export const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(false);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://mealplanner-9e0bb-default-rtdb.firebaseio.com/meals.json')
            const responseData = await response.json();

            const loadedMeals = [];
            console.log("In the Available Meal 1");
            console.log(response);
            if(!response.ok){
                throw new Error('Something Went Wrong');
            }
            console.log("In the Available Meal 2");

            for(const key in responseData){
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if(isLoading){
        return <section className={classes.MealsLoading}>
            <p>...Loading</p>
        </section>
    }

    if(httpError){
        return <section className={classes.MealsError}>
            <p>{httpError}</p>
        </section>
    }

    const mealsList = meals.map((meal) => <MealItem key={meal.id} meal={meal}/>)

    return (
        <section className={classes.meals}>
            