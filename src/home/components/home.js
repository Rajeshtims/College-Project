import React from 'react';
import Firebase from 'firebase';
import {HomeHeader} from './../../home/components/header';
import {Post} from './../../home/components/post';
import {HomeSide} from './../../home/components/homeSide';
import {Poster} from './../../home/components/poster';
export class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAuth:false,
            isAuthErr:false,
            addPost:false
        };
        this.addPost= this.addPost.bind(this);
        Firebase.auth().signInWithEmailAndPassword(this.props.emailOrPhone, this.props.password).then((hey)=>{
            Firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.setState({isAuth:true});
                    //alert(user.uid);
                }
            });
        }).catch((error)=> {
            alert(error);
            this.setState({isAuthErr:true});
        });
    }
    addPost(){
        this.setState({addPost:!this.state.addPost});
    }
    render(){
        if(this.state.isAuthErr===true){
            return  <div> Error in login</div>
        }
        if(this.state.isAuth===false){
            return <div>Loading</div>
        }else{
            return <div>
                    <HomeHeader addPost = {this.addPost}/>
                    <HomeSide/>
                    <Post/>
                    <Poster addPost={this.state.addPost} removePost={this.addPost}/>
            </div>
        }

    }
}


