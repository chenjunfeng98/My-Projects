import axios from 'axios'

const api = {
    latest(){
        return axios.get('/api/latest');
    },
    history(time){
        return axios.get(`/api/before/${time}`);
    },
    content(id){
        return axios.get(`/api/${id}`);
    }
}

export default api