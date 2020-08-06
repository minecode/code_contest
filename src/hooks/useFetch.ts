import useSWR from 'swr'
import apiCodeContest from '../services/apiCodeContest'

export function useFetch<Data = any, Error = any> (url: string) {
    const { data, error, mutate } = useSWR<Data, Error>(url, async url => {
        const config = {
            headers: {
                Authorization: `token ${process.env.REACT_APP_TOKEN}`,
                Accept: 'application/vnd.github.preview+json'
            }
        }
        const response = await apiCodeContest.get(url, config)
        return response.data
    }, {
        revalidateOnFocus: true
    })

    return { data, error, mutate }
}
