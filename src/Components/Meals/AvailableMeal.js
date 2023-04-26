import { useState,useEffect ,useCallback} from "react";
import classes from "./AvailableMeal.module.css";
import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Analdeep",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Satyam",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Divyam",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Akash",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeal = () => {
  const [meals, setmeals] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [Error,seterror]=useState(null)


  const fetchHandler =useCallback(async () => {
    seterror(null)

    try{
      const response = await fetch("http://localhost:5000/meal");
      if(!response.ok){
        throw new Error('semthing went wrong')
      }
      const data = await response.json();
      const loadmeals = [];
      for (const key in data) {
        loadmeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setmeals(loadmeals);
    }catch(error) {
      seterror(error.message)
    }
    setisLoading(false)
    
  },[]);
  useEffect(() => {
    fetchHandler();
  },[fetchHandler]);

  if(isLoading){
    return <section className={classes.mealLoading}>Loading.......</section>
  }
  if(Error){
    return <section className={classes.mealLoading}>
      {Error}
    </section>
  }

  const MealList=meals.map((data) => {
    return (
      <MealItem
        id={data.id}
        key={data.id}
        name={data.name}
        description={data.description}
        price={data.price}
      />
    );
  })

  return (
    <Card className={classes.meals}>
      <ul>
        {MealList}
      </ul>
    </Card>
  );
};

export default AvailableMeal;
