import React from 'react';
import '../css/sideProfile.css';
import '../css/trending.css';
import '../css/homeSide.css';
export class HomeSide extends React.Component{
    render() {
        return <div id="homeSide">
            <div id="sideProfile">
                <div id="header">
                    <div id="title">
                        <center>पेशाघर</center>
                    </div>
                    <div id="profile">
                        <img src="src/home/images/sideProfile/girl.jpg"/>
                        <div id="profileInfo">
                            <b>Shures Nepali</b><br/>
                            <span>@shures.nepali</span>
                        </div>
                    </div>
                </div>
                <div id="status">
                    <div id="about">
                        Hey guys I am new here !!! let's see can i update it or not
                    </div>
                    <section>
                        <b>Posts</b><br/>
                        <div>251</div>
                    </section>
                    <section>
                        <b>Savings</b><br/>
                        <div>222</div>
                    </section>
                    <section>
                        <b>Followings</b><br/>
                        <div>1251</div>
                    </section>
                </div>
            </div>
            <div id="trending">
                <div id="title">
                    Trendings for you
                </div>
                <ul>
                    <li>
                        <b>Mustang Job</b>
                        <div>your job area with vacations</div>
                    </li>
                    <li>
                        <b>Skill Matched</b>
                        <div>computer operator, teacher, medical field</div>
                    </li>
                    <li>
                        <b>Job near Your</b>
                        <div>lete ,ghasa, xairo</div>
                    </li>
                </ul>
            </div>
        </div>
    }
}