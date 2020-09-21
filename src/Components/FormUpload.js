import React, {Component} from 'react'


class FormUpload extends Component {
    constructor(props) {
        super()
        this.state = {
            obj: null,
            selectedFile: null,
            purpose: '',
            comment: ''
        }

        this.send = this.send.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const name = e.target.name
        this.setState({[name]: e.target.value})
    }

    send (data) {
        data.preventDefault()
        if (this.state.selectedFile !== null) {
            const formData = new FormData()
            formData.append('file', this.state.selectedFile)
            const sessionData = {
                login: this.props.sessionData.login,
                purpose: this.state.purpose,
                comment: this.state.comment
            }
            this.setState({selectedFile: null, purpose: '', comment: ''})
            fetch('http://test.ru/uploadfile/'+JSON.stringify(sessionData), {
                method: 'POST',
                body: formData
            })
        }
    }

    fileSelecthandler = (event) => {
        let file = event.target.files[0]
        this.setState({selectedFile: file})
    }

    render() {
        return (
            <>
                <h2>Upload Report</h2>
                <form className="form-upload">
                    <input type="text" name="purpose" className="input-text" value={this.state.purpose} placeholder="Purpose" style={{marginLeft: '0'}} onChange={this.handleChange} required/>
                    <input type="text" name="comment" className="input-text" value={this.state.comment} placeholder="Comment" onChange={this.handleChange} required/>
                    <div>
                        <input type="file" name="file" id="file" className="input-file" onChange={this.fileSelecthandler} required/>
                        <label for="file">Choose a file</label>
                        <input type="submit" className="input-btn" value="Send" style={{marginTop: '15px'}} onClick={this.send}/>
                    </div>
                </form>
            </>
        )
    }
}


export default FormUpload