import {Fragment} from 'react'
import AvailableMeal from './AvailableMeal'
import MealsSummary from './MealsSummary'

const Meal=() => {
    return (
        <Fragment>
            <AvailableMeal />
            <MealsSummary />
        </Fragment>
    )
}

export default Meal