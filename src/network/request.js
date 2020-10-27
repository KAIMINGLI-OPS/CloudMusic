import axios from 'axios'

export function request(config)
{
  const instance = axios.create({
    baseURL: '/api',
    timeout: 3000
})
  instance.interceptors.request.use(config =>
  {
    return config;
  },
  err => {}
        )
    instance.interceptors.response.use(response=>
    {
        return response.data;
    },
    err=>{}
    )
    return instance(config);
}
