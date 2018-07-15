import React from 'react';
import './../css/nextStage.css'
export default class NextState extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        if(this.props.nextStage===true){
            return (<div id="nextStage">
                <form >
                    Your Job Address<br/> <input type="text"/><br/><br/>
                    Interested In<br/> <input type="email"/><br/><br/>
                    Academic qualification <br/><input type="password"/><br/><br/>
                    your skill <br/>
                    <select>
                        <option>Web designing</option>
                        <option>Drawing and Art</option>
                    </select><br/><br/>
                    <button>Done</button>
                </form>
            </div> )
        }else return null;
    }
}