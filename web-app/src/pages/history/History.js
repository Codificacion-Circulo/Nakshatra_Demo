import React,{Fragment, useEffect,useState} from 'react'
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import HistoryCard from '../../components/HistoryCard/HistoryCard'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
toast.configure();
function History() {
    const [loading, setLoading] = useState(false)
    const [details,setDetails]=useState({})

    useEffect(() => {
        const getTodo = () => {
        setLoading(true);

            const token=localStorage.getItem('token');
            axios
                .get('https://nakshatra-demo.herokuapp.com/api/reports', { headers: {"Authorization" : `Bearer ${token}`} ,withCredentials: true })
                .then((response) => {
                    console.log(response.status);
                    setDetails(response)
                    setLoading(false)
                })
                .catch((e) => {
                    console.log('something went wrong :(', e);
                    toast.error(e.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    setLoading(false)
                });
        };
        getTodo();
    }, []);
  return (
    <Fragment>
        {loading && <LoadingSpinner />}
        {details&&details.results &&<HistoryCard></HistoryCard>}
    </Fragment>
  )
}

History.propTypes = {}

export default History
