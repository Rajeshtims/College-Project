import React, { Component } from 'react';
import firebase from 'firebase';
export class Database extends React.Component{
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
        firebase.initializeApp(config);
        let newPostKey = firebase.database().ref().child('posts').push().key;
        firebase.database().ref('post/'+newPostKey).set({
            name:'hello'
        })



    }
    render(){
        return <div>hello world</div>;
    }
}