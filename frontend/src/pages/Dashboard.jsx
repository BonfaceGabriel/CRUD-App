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
  console.log('Use effect triggered:', {
    user: !user,
    isError,
    message
  })
  if (isError) {
    console.log(message)
  }

  if (!user) {
    console.log('No user found, navigating to login')
    navigate('/login')
  }
  const fetchGoals = async () => {
    try {
      console.log('Dispatching getGoals')
      const result = await dispatch(getGoals()).unwrap()
      console.log('GetGoals result:', result)
    } catch (error) {
      console.error('GetGoals error:', error)
      toast.error(error.toString())
    }
  }

  fetchGoals()
  
  return () => {
    console.log('Cleanup: resetting goals state')
    dispatch(reset())
  }
}, [user, navigate, dispatch])
    
console.log('Current goals state:', {
  goals,
  isLoading,
  isError,
  message
})

  if(isLoading){
      return <Spinner />
  }

  
  return  (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
      </section>
      <GoalForm />

      <div>
        {goals?.length > 0 ? (
          goals.map(goal => <div key={goal._id}>{goal.text}</div>)
        ) : (
          <p>No goals found</p> 
         
        )} </div>
    </>
  )
}

export default Dashboard
