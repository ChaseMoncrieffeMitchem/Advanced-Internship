import RecommendedBooks from '@/components/bookApis/RecommendedBooks'
import SelectedBooks from '@/components/bookApis/SelectedBooks'
import SuggestedBooks from '@/components/bookApis/SuggestedBooks'
import React from 'react'

export default function forYou() {
  
  
  return (
    <>
    <h1>This is the For You page</h1>
    <div className='row'>
      <div className='container'>
        <div className='for-you__wrapper'>
        <SelectedBooks/>
        <RecommendedBooks />
        <SuggestedBooks />
        </div>
      </div>
    </div>
    </>
  )
}
