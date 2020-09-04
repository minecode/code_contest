import useSWR from 'swr'
import { config } from '../components/Utils'
import apiCodeContest from '../services/apiCodeContest'

export function useFetch<Data = any, Error = any> (url: string) {
	console.log('useFecth', url)
    const { data, error, mutate } = useSWR<Data, Error>(url, async url => {
        const response = await apiCodeContest.get(url, config)
        return response.data
    }, {
        revalidateOnFocus: true
    })
	console.log(data)
	console.log(error)
    return { data, error, mutate }
}
