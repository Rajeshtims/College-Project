import React from 'react';
import axios from 'axios';
import firebase from 'firebase';
export class FileUpload extends React.Component{
    constructor(){
        super();
        this.state={
            selectedFile:''
        };
        let config = {
            apiKey: "AIzaSyCBCM5colION5bSz9gZ6uMst1hIGZXeHc4",
            authDomain: "project-43f8b.firebaseapp.com",
            databaseURL: "https://project-43f8b.firebaseio.com",
            projectId: "project-43f8b",
            storageBucket: "project-43f8b.appspot.com",
            messagingSenderId: "368619453998"
        };
        firebase.initializeApp(config);
        this.fileSelected = this.fileSelected.bind(this);
        this.handleUpload=this.handleUpload.bind(this);
    }
    // componentDidMount(){
    //     axios.get('https://jsonplaceholder.typicode.com/users5').then(function (res) {
    //         console.log(res);
    //     }).catch(function (error) {
    //         console.log(error);
    //     })
    // }
    handleUpload(event) {
        event.preventDefault();
        let storageRef = firebase.storage().ref('images');
        let file = this.state.selectedFile;
        let uploadTask = storageRef.child(this.state.selectedFile.name).put(file);
        uploadTask.on('state_changed', function(snapshot){
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        });
    }

    fileSelected(event){
        console.log(event.target.files[0]);
        this.setState({selectedFile:event.target.files[0]})
    }
    render(){
        return <form>
            <input type="file" name="file" onChange={this.fileSelected}/>
            <input type="button" value="upload" onClick={this.handleUpload}/>
        </form>
    }
}