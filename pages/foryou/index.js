import SelectedBooks from '@/components/bookApis/SelectedBooks'
import React from 'react'

export default function forYou() {
  
  
  return (
    <>
    <h1>This is the For You page</h1>
    <div className='row'>
      <div className='container'>
        <div className='for-you__wrapper'>
        <SelectedBooks 
        // data={data}
        />
        </div>
      </div>
    </div>
    </>
  )
}
