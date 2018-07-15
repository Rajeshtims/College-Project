import React from 'react';
export class IndexHeader extends React.Component{
    render(){
        return(
            <header id="index">
                <div id="left">
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Download</li>
                    </ul>
                </div>
                <div id="right">
                    <ul>
                        <li>More</li>
                        <li onClick={this.props.switchForm}>Login</li>
                        <li>Help</li>
                    </ul>
                </div>
            </header>
        )
    }
}