import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


// const tweetBtn = document.getElementById('tweet-btn')


// tweetBtn.addEventListener('click',function (){
//     console.log(tweetInput.value)
// })

document.addEventListener('click',function (e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id==='tweet-btn'){
        handleTweetBtnClick()
    }
})

function handleLikeClick(tweetId){
    const targetTweetObj = tweetsData.filter(function (tweet){
        return tweet.uuid === tweetId
    })[0]
    if(targetTweetObj.isLiked){
        targetTweetObj.likes --
    }
    else{
    targetTweetObj.likes ++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked //here the magic of color change happens
    render()
}
function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]// it is being accepted for one object because uuid is unique it holds an object
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
    
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value) {
        // console.log(tweetInput.value)
        tweetsData.unshift({
                handle: `@Scrimba💎`,
                profilePic: `images/scrimbalogo.png`,
                likes: 0,
                retweets: 0,
                tweetText: tweetInput.value,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: uuidv4()
            }
        )
        render()
        tweetInput.value = '' // to keep the box empty after rendering
    }
}

function getFeedHtml() {
    let feedHtml = ''
    tweetsData.forEach(function (tweet){
        let likeIconClass = ''
        let RetweetIconClass= ''
        if(tweet.isLiked){
            likeIconClass = 'liked'
        }
        let retweetClass = ''
        if(tweet.isRetweeted){
            retweetClass = 'retweeted'
        }
        let repliesHTML = ''
        if(tweet.replies.length>0){
            tweet.replies.forEach(function (reply){
                repliesHTML+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
        <div>
        <p class = "handle">${reply.handle}</p>
        <p class = "tweet-text">${reply.tweetText}</p>
            </div>
            </div>
            </div>
`
            })
        }


        feedHtml += `
<div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots"
                data-reply="${tweet.uuid}"
                ></i>
                    ${tweet.replies.length}
                </span>
                            <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}"
                            data-like = "${tweet.uuid}"
                            ></i>
                    ${tweet.likes}
                </span>
                            <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetClass}"
                            data-retweet="${tweet.uuid}" 
                            ></i>
                    ${tweet.retweets}
                </span>
            </div>
        </div>
    </div>s
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHTML}
    </div>

</div>`
    })
    return feedHtml
}
function render(){
    document.getElementById('feed').innerHTML=getFeedHtml()
}
render()
  

