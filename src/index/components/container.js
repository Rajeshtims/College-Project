import React from 'react';
import Firebase from 'firebase';
import {SignUp} from './signUp';
import {SignIn} from './signIn';
export class IndexContainer extends React.Component{
    constructor(){
        super();
        let config = {
            apiKey: "AIzaSyCBCM5colION5bSz9gZ6uMst1hIGZXeHc4",
            authDomain: "project-43f8b.firebaseapp.com",
            databaseURL: "https://project-43f8b.firebaseio.com",
            projectId: "project-43f8b",
            storageBucket: "project-43f8b.appspot.com",
            messagingSenderId: "368619453998"
        };
        Firebase.initializeApp(config);
    }
    render(){
        if(this.props.signUp===true){
            return(<SignUp/>)
        }else{
            return(<SignIn isLogin = {this.props.isLogin} switchForm = {this.props.switchForm}/>)
        }
    }
}

