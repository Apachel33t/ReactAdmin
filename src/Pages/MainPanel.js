import React, {Component} from 'react'
import HumburgerBtn from './../Components/HumburgerBtn'
import FormUpload from './../Components/FormUpload'
import Reports from './../Components/Reports'


class MainPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            btnIsActive: false,
            Panel: true,
            Upload: false,
            Logout: false
        }

        this.toggleValue = this.toggleValue.bind(this)
        this.switching = this.switching.bind(this)
    }

    toggleValue = (obj) => {
        this.setState({btnIsActive: obj.btnIsActive})
    }

    switching (e) {
        switch (e.type) {
            case "Panel":
                this.setState({Panel: true, Upload: false})
                break;
            case "Upload":
                this.setState({Panel: false, Upload: true})
                break;
            case "Logout":
                console.log("Logout action")
                this.props.logout({isAuth: false})
                break;
            default:
                console.log("Something is wrong")
                break;
        }
    }

    render() {
        return (
            <div className="main-panel">
                <div className="top-bar">
                    <HumburgerBtn click={this.toggleValue}/>
                    <div style={{width: '100%'}}>
                        <p style={{float: 'right', fontSize: '20px'}}>{this.props.login.username}</p>
                    </div>
                </div>
                <div className="main-bar">
                    <div className="left-bar" style={this.state.btnIsActive ? {display: 'block'} : {display: 'none'}}>
                        <ul>
                            <li className="menu" onClick={(e) => this.switching({type: "Panel"})}>Panel</li>
                            <li className="menu" onClick={(e) => this.switching({type: "Upload"})}>Upload</li>
                            <li className="menu" onClick={(e) => this.switching({type: "Logout"})}>Logout</li>
                        </ul>
                    </div>
                    <div className="right-bar" style={this.state.btnIsActive ? {width:'80vw'} : {width:'100%'}}>
                        {this.state.Panel && <Reports sessionData={this.props.login}/>}
                        {this.state.Upload && <FormUpload sessionData={this.props.login}/>}           
                    </div>
                </div>
            </div>
        )
    }
}


export default MainPanel