import { AppProps } from 'next/app'
import 'antd/dist/reset.css';
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import store from '../redux/store'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp