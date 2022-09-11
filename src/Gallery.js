import React from "react";

function displayImg(img) {
  if(img.imgtype.split("/")[0]==='video') {
    return (
      <div className="box">
          <div className="content"> {img.title}</div>
          <div className="account"> by {img.account}</div>
          <video className="format" controls>
          <source src={img.imglink} type="video/mp4"></source>
          </video>
        </div>
    )
  } else {
    return (
      <div className="box">
          <div className="content"> {img.title}</div>
          <div className="account"> by {img.account}</div>
          <img className="format" src={img.imglink} alt={img.imglink}></img>
          </div>
    )
  }
}

export function renderData(data) {
  
  return(
    
      <div className="gallery">
      {data.map(img => (
        displayImg(img)
      ))}
      </div>
    
  )
}
