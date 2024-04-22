import React from 'react'
import Link from 'next/link'

export default function SelectedBooks({data}) {
  return (
    <>
        <div className='for-you__title'>Selected just for you</div>
        <Link className='selected__book' href="/book/f9gy1gpai8"> 
            <div className='selected__book--sub-title'>How Constant Innovation Creates Radically Successful Businesses</div>
            <div className='selected__book--line'></div>
            <div className='selected__book--content'>
                <figure className='book__image--wrapper' 
                // style={height: 140, width: 140, min-width:140}
                >
                    <img className='book__image' 
                    // style={"display: block"} 
                    src='https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2'></img>
                </figure>
                <div className='selected__book--text'>
                    <div className='selected__book--title'>{data}</div>
                    <div className='selected__book--author'>eric Ries</div>
                    <div className='selected__book--duration-wrapper'>
                        <div className='selected__book--icon'></div>
                    </div>
                    <div className='selected__book--duration'>3 min 23 secs</div>
                </div>
            </div>
        </Link>
    </>
  )
}
