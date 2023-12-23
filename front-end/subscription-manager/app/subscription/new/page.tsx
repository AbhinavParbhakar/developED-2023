
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import SubscriptionForm from '@/components/SubmissionForm';
import { getServerSession } from 'next-auth';


async function AddSubscription() {
  const session = await getServerSession(authOptions)
  return (
    <div className='flex flex-col  h-screen mt-3'>
      <h1 className="text-4xl font-bold text-center ">Add Subscription</h1>
      <SubscriptionForm session={session} />
    </div>
  )
}

export default AddSubscription;
