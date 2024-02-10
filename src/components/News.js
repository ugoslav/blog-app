import React from 'react'

const Article = ({article}) => {
    return(
        <div id="article">
            <a href={article.link}><img src={article.pic} alt={article.altText} id="news-image"></img></a>
            <h2 style={{textAlign: 'justify',padding: "0px 20px"}}>{article.text}</h2>
        </div>

    )
}

const News = ({newsObject}) => {
    const data = newsObject
  return (
    <div id="news-section">
        <h1 style={{textAlign: "center",fontFamily: 'cursive',backgroundColor: "rgb(352,255,190"}}>Some news...</h1>
        <div id="division-line"></div>
        <div id="news">
            {data.map(article => {
                return <Article article={article} key={article.id}/>
            })}
        </div>
    </div>
  )
}

export default News