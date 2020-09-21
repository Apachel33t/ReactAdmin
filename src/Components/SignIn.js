import React, {Component} from 'react'

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const name = e.target.name
        this.setState({[name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.send({login: this.state.login, password: this.state.password, type: "signin"})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="registration">
                <h3>Sign In</h3>
                <input  type="login" 
                        className="input-text" 
                        name="login"
                        placeholder="Login" 
                        style={{marginTop: '50px'}} 
                        value={this.state.login} 
                        onChange={this.handleChange}
                        required />
                <input  type="password" 
                        className="input-text"
                        name="password"
                        placeholder="Password" 
                        value={this.state.password} 
                        onChange={this.handleChange}
                        required />
                <div className="block-f-btn">
                    <input type="submit" className="input-btn" value="Send"/>
                </div>
            </form>
        )
    }
}

export default SignIn
