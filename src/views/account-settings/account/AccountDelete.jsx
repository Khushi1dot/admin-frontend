// MUI Imports
'use client'

import { useState } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'

import { injectModels } from '@/Redux/injectModel'

const AccountDelete = (props) => {
const[confirm,setConfirm] = useState(false);
const [loading,setLoading]=useState(false);

  console.log(props,'props');

   const handleDelete = async () => {
    if (!confirm) return alert('Please confirm deletion.')

    if (!id) return alert('ID not found.')

    setLoading(true)
    const res = await props.auth.delete(id)

    setLoading(false)

    if (res?.success) {
      alert('Account deleted successfully!')

      // ✅ Redirect to login or home
      router.push('/login')
    } else {
      alert('Failed to delete account.')
    }
  }

  return (
    <Card>
      <CardHeader title='Delete Account' />
      <CardContent className='flex flex-col items-start gap-6'>
        <FormControlLabel control={<Checkbox checked={confirm} onChange={e => setConfirm(e.target.checked)}/>} label='I confirm my account deactivation' />
        <Button variant='contained' color='error'  disabled={!confirm || loading}
          onClick={handleDelete} type='submit'>
  {loading ? 'Deleting...' : 'Deactivate Account'}
        </Button>
      </CardContent>
    </Card>
  )
}

export default injectModels(['auth'])(AccountDelete)