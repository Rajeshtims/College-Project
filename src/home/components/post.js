import React from 'react';
import '../css/post.css'
import '../css/comment.css';
export class Post extends React.Component{
    render(){
        return <div id="post">
            <div className="postItem">
                <div id="info">
                    <img src="src/home/images/sideProfile/girl.jpg"/>
                    <span id="name">Shures Nepali</span>
                    <span id="username">@shures.nepali</span>
                    <span id="task">looking for job at Kathmandu</span><br/><br/>
                    <span id="date">2012-12-23</span>
                </div>
                <div id="content">
                    <div id="status">
                        <span>hey this is the short infomation about how can we do the best ever  </span>
                    </div>
                    <img src="src/home/images/post/mustang.jpg"/>
                </div>
                <div id="action">
                    <ul>
                        <li><img src="src/home/icons/004-like.png"/><span><i>20</i> interested</span></li>
                        <li><img src="src/home/icons/002-paper-plane.png"/><span><i>25</i> engagements</span></li>
                        <li><img src="src/home/icons/003-chat.png"/></li>
                        <li><img src="src/home/icons/001-bookmark.png"/></li>
                    </ul>
                </div>
                <div className="sectionBreak"></div>
                <div className="comment">
                    <div className="item">
                        <div id="img">
                            <img src="src/home/images/sideProfile/girl.jpg"/>
                        </div>
                        <div id="right">
                            <ul id="up">
                                <li><span>Shures Nepali</span></li>
                                <li><span>Hey how can i meet you in pokhara valley kanxi hai kanxi kanxi ko gita vananan</span></li>
                            </ul>
                            <ul id="down">
                                <li><img src="src/home/icons/004-like.png"/><b>25</b></li>
                                <li><img src="src/home/icons/reply.png"/><b>277</b></li>
                                <li><span>16 hours ago</span></li>
                            </ul>
                            <div id="reply">
                                <div className="item">
                                    <div id="img">
                                        <img src="src/home/images/sideProfile/girl.jpg"/>
                                    </div>
                                    <div id="right">
                                        <ul id="up">
                                            <li>Asmita kadka</li>
                                            <li>where have you been yet</li>
                                        </ul>
                                        <ul id="down">
                                            <li><img src="src/home/icons/004-like.png"/><b>25</b></li>
                                            <li>2 hrs ago</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div id="write_reply">
                                <div id="img">
                                    <img src="src/home/images/sideProfile/girl.jpg"/>
                                </div>
                                <input type="text" placeholder="type a comment....."/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

