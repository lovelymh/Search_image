import React, { Component } from 'react'
import './ImageList.css'
import Image from './Image'

class ImageList extends Component {
  render() {
    const { imagelist, userID } = this.props

    const _imagelist = imagelist.map((image, idx) => (
      <Image
        pageURL={image.pageURL}
        webformatURL={image.webformatURL}
        largeImageURL={image.largeImageURL}
        title={image.tags}
        id={image.id}
        key={image.id}
        userimgflag={image.userimgflag}
        userID={userID}
      />
    ))

    return <div className="imagelist-wrapper">{_imagelist}</div>
  }
}

export default ImageList
