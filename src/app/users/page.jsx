// MUI Imports
import Grid from '@mui/material/Grid'

// Components Imports

import Table from '@views/users/Table'

const UserAnalytics = () => {
  
  return (
    <Grid container spacing={6}>
     
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default UserAnalytics
