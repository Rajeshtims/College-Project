import React from 'react';
import'../css/header.css';
export class HomeHeader extends React.Component{
    render(){
        return <header id="home">
            <div id="title">
                JobNetwork
            </div>
            <div id="left_items">
                <ul>
                    <li>
                        <span>
                            Filter Post
                        </span>
                        <div>

                        </div>
                    </li>
                    <li>Notification</li>
                    <li>Message</li>
                    <li onClick={this.props.addPost}>Add a Post</li>
                </ul>
            </div>
            <div id="profile">
                <img src="src/home/images/post.jpg"/>
            </div>
            <div id="search">
                <input placeholder="Search" type="search"/>
            </div>
        </header>
    }
}