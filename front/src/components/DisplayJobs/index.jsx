import Card from '@mui/material/Card';
import ListItem from '@mui/material/ListItem';
const DisplayJobs = () => {
  
  const jobs = [
    'Job 1',
    'Job 2',
    'Job 3',
    'Job 4',
    'Job 5',
  ]

  const styles = {
    card: {
      width:'30vw',
      height:'80vh',
    },
    listItem: {
      border:'1px solid red',
      borderRadius:'5px',
      margin:'1rem',
      padding:'1rem',
      width:'90%',
      height:'10%',
    }
  }

  return(
    <Card sx={styles.card}>
      {jobs.map((job) => (
        <ListItem sx={styles.listItem}>{job}</ListItem>
      ))}
    </Card>
  )
}

export default DisplayJobs;