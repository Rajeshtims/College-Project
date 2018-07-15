import React from 'react';
import ReactDom from 'react-dom';
import {IndexContainer} from "./src/index/components/container";
import {IndexHeader} from "./src/index/components/header";
import {IndexFooter} from "./src/index/components/footer";
import {HomeHeader} from './src/home/components/header';
import {Post} from './src/home/components/post';
import {HomeSide} from './src/home/components/homeSide';
import './src/index/index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Home} from './src/home/components/home';
import {Poster} from './src/home/components/poster';
import {FileUpload} from './src/home/components/axios';
import {Filter} from './src/home/components/filter';
import {Database} from './src/home/components/test';
import NextStage from './src/index/components/nextStage';
import Auth from './src/home/components/container';

class App extends React.Component{
    constructor(){
        super();
        this.state={
            signUp:false,
            isLogin:false,
            emailOrPhone:'',
            password:''
        };

        this.switchForm = this.switchForm.bind(this);
        this.isLogin = this.isLogin.bind(this);
    }
    isLogin(emailOrPhone,password){
        this.setState({emailOrPhone:emailOrPhone,password:password});
        this.setState({isLogin:true});
    }
    switchForm(){
        this.setState({signUp:!this.state.signUp});
    }
    render(){
        if(this.state.isLogin===false){
            return <div>
                <IndexHeader switchForm = {this.switchForm}/>
                <IndexContainer switchForm = {this.switchForm} signUp = {this.state.signUp} isLogin={this.isLogin} />
                <IndexFooter/>
            </div>
        }else{
            return <Home emailOrPhone={this.state.emailOrPhone} password={this.state.password} />
        }
    }
}

ReactDom.render(<App/>,document.getElementById('app'));
//ReactDom.render(<Database/>,document.getElementById('app'));
//ReactDom.render(<div><HomeHeader/><HomeSide/><Post/><Poster/></div>,document.getElementById('app'));
//ReactDom.render(<Poster/>,document.getElementById('app'));