import Box from '@mui/material/Box';
import LoginForm from '../../components/LoginForm'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'

const Login = () => {
const giphyFetch = new GiphyFetch("jG4BYKxt5QNeDVk0ufYIiYjU1t7lGGGe");
const searchTag = 'dogs';
const fetchGifs = (offset) => giphyFetch.search(searchTag, { offset, limit: 10 })

  return (
    <Box>
      <LoginForm />
      <Grid width={800} columns={3} gutter={6} fetchGifs={fetchGifs} key={searchTag} />
    </Box>
  )
}
export default Login