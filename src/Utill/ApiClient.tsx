import axio, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

export const BaseUrl = "http://18.219.165.61:3604";

const responseInterceptor = (value: AxiosResponse) => {
    window.localStorage.removeItem('hc-authToken');
    if(!!value.data['user']){
        localStorage.setItem('hc-user', JSON.stringify(value.data['user']));
    }
    if(!!value.headers['authorization']){
        window.localStorage.setItem('hc-authToken', value.headers['authorization']);
    }
    return value;
};


const ApiClient = (options?: any): AxiosInstance => {
    let config: AxiosRequestConfig;
    const authToken = window.localStorage.getItem('hc-authToken');
    config = {
        baseURL: BaseUrl,
    };
    if (!!options) {
        config = {...config, ...options}
    }
    if (!!authToken) {
        config.headers = {
            authorization: `Bearer ${authToken}`,
        };
        if( !!options && !!options.headers){
            config.headers = {
                ...config.headers,
                ...options.headers
            };
        }
    }
    const client = axio.create(config);
    client.interceptors.response.use(responseInterceptor);
    return client;

};

export default ApiClient;

