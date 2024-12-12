import { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getGoals } from "../features/goals/goalSlice"
import { reset } from "../features/auth/authSlice"
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner'
import GoalForm from "../components/GoalForm";


function Dashboard() {
  
  const navigate = useNavigate()

  const dispatch  = useDispatch()

  const { user } = useSelector(
    (state) => state.auth
  )

  const {goals, isLoading, isError, message} = useSelector(
    (state) => state.goals
)

 
useEffect(() => {
  console.log('Start of use effect')
  if (isError) {
    console.log(message)
  }

  if (!user) {
    navigate('/login')
  }
  console.log('get goals')
  dispatch(getGoals())

}, [navigate, user, isError, dispatch])
    
console.log('Rendering component');

  if(isLoading){
      return <Spinner />
  }

  
  return  (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
      </section>
      <GoalForm />
    </>
  )
}

export default Dashboard
