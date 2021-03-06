import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@redwoodjs/web'

export type InfiniteSuccessProps<T> = {
  items: T[]
  loadMore: () => void
  hasMore: boolean
}

export function createInfiniteCell({
  QUERY,
  Failure,
  Success,
  Loading,
  Empty,
  beforeQuery = (props) => ({
    variables: props,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  }),
  afterQuery = (data) => ({ ...data }),
  displayName,
  listKey,
  take = 10,
}) {
  function InfiniteCell({ variables }) {
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
      setHasMore(true)
    }, [variables])

    const options = useMemo(
      () =>
        beforeQuery({
          take,
          cursor: null,
          skip: 0,
          ...variables,
        }),
      [variables]
    )

    const { data, error, loading, fetchMore } = useQuery(QUERY, options)

    const items = useMemo(() => (data ? afterQuery(data)[listKey] : []), [data])

    const loadMore = useCallback(() => {
      if (hasMore)
        fetchMore({
          variables: {
            cursor: items[items.length - 1].id,
            skip: 1,
          },
        }).then((res) => {
          if (res.data[listKey].length === 0) {
            setHasMore(false)
          }
        })
    }, [items, hasMore, fetchMore])

    if (error) {
      if (Failure) {
        return <Failure error={error} />
      } else {
        console.error(displayName, error)
      }
    } else if (items.length > 0) {
      return <Success items={items} hasMore={hasMore} loadMore={loadMore} />
    } else if (loading) {
      if (Loading) {
        return <Loading />
      } else {
        console.log(displayName, 'loading')
      }
    } else if (!loading) {
      if (Empty) {
        return <Empty />
      } else {
        console.log(displayName, 'empty')
      }
    } else {
      throw 'Cannot render Infinite Cell: zarbi'
    }
  }

  InfiniteCell.displayName = displayName

  return InfiniteCell
}
