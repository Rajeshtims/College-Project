import React from 'react';
import {SideAbout} from './sideAbout';
import Firebase from 'firebase';
export class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            emailOrPhone:"shures.nepali@gmail.com",
            password:"mustang666",
            isLogin:false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logIn= this.logIn.bind(this);
    }
    handleInputChange(e){
        if(e.target.name==="emailOrPhone"){
            this.setState({emailOrPhone:e.target.value});
        }else if(e.target.name==="password"){
            this.setState({password:e.target.value});
        }
    }

    handleSubmit(e){
        e.preventDefault();
    }

    logIn(){
        Firebase.auth().signInWithEmailAndPassword(this.state.emailOrPhone, this.state.password).then((hey)=>{
            Firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    //this.props.isLogin;
                    //alert(user.uid);

                }
            });
        }).catch(function(error) {
               alert(error);
        });
    }


    render(){
        return(
                <div id="about">
                    <div id="right_panel">
                        <form onSubmit={this.handleSubmit}>
                            <div id="title">
                                <center id="app_name">App Name</center><br/>
                                <center id="dis">Log in to your account</center>
                            </div><br/>
                            <input type="text" name="emailOrPhone" value={this.state.emailOrPhone} onChange={this.handleInputChange}/><br/>
                            <input type="text" name="password" value={this.state.password} onChange={this.handleInputChange}/><br/>
                            <button onClick={()=>this.props.isLogin(this.state.emailOrPhone,this.state.password)}>Log in</button>
                            <div id="condition">
                                <center>By signing up, you agree to our Terms & Privacy Policy.</center>
                            </div>
                        </form>
                        <SmallLoginLink switchForm = {this.props.switchForm}/>
                    </div>
                    <SideAbout />
                </div>
        )
    }
}
class Home extends React.Component{
    render(){
        return <div>hello world</div>
    }
}

class SmallLoginLink extends React.Component{
    render(){
        return(
            <div id="login_link">
                <center>Don't have an account ? <u onClick={this.props.switchForm}>Sing Up</u></center>
            </div>
        )
    }
}