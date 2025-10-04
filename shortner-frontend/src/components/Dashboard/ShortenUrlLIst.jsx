import React from 'react'
import ShortenUrlListItem from './ShortenUrlListItem'

const ShortenUrlLIst = ({shortenUrlData}) => {
  return (
    <div className='my-4 space-y-4 '>
      {shortenUrlData.map((item) => (
            <ShortenUrlListItem key={item.id} {...item} />
      ))}
    </div>
  )
}

export default ShortenUrlLIst
