import React, { Component } from 'react'

const wasDeleted = false

class MainPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            object: {},
            wasDeleted: false,
            order: false
        }

        this.delete = this.delete.bind(this)
        this.order = this.order.bind(this)
        this.accept = this.accept.bind(this)
        this.decline = this.decline.bind(this)
    }

    delete(e) {
        let object = this.state.items.find(function (obj) {
            if (obj["file_id"] === e.target.name) {
                return obj
            }
        })
        console.log(e.target.name)
        this.setState({object: object, wasDeleted: true})
    }

    accept(e) {
        let data = {
            id: e.target.name
        }
        fetch('http://test.ru/accept/'+JSON.stringify(data), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        let object = this.state.items.find(function (obj) {
            if (obj["id"] === e.target.name) {
                return obj.state = 'Accept'
            }
        })
        this.setState({object: object})
    }
    decline(e) {
        let data = {
            id: e.target.name
        }
        fetch('http://test.ru/decline/'+JSON.stringify(data), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        let object = this.state.items.find(function (obj) {
            if (obj["id"] === e.target.name) {
                return obj.state = 'Decline'
            }
        })
        this.setState({object: object})
    }

    componentDidUpdate() {
        if (this.state.wasDeleted !== wasDeleted) {
            let items = this.state.items
            let object = this.state.object
            let json = {
                object: this.state.object,
                rights: 1
            }
            let jsonOnject = JSON.stringify(json)
            jsonOnject = jsonOnject.replace(/\\\\/g, ";;")
            fetch('http://test.ru/deletereport/'+jsonOnject, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((res=>res.json()))
            .then((data) => {
                if (data === "file is delete") {
                    items = items.filter(function (obj) {
                        return obj.id !== object.id
                    })
                    this.setState({wasDeleted: false, items: items})
                } else {
                    console.log("Something is wrong")
                }
            })
        }
    }

    order() {
        this.setState({order: !this.state.order})
        let sessionData = {
            login: this.props.sessionData.login,
            rights: this.props.sessionData.rights,
            order: this.state.order
        }
        fetch('http://test.ru/getreports/'+JSON.stringify(sessionData))
        .then((res => res.json()))
        .then((data) => {
            this.setState({items: data})
        })
    }

    componentDidMount() {
        const sessionData = {
            login: this.props.sessionData.login,
            rights: this.props.sessionData.rights,
            order: this.state.order
        }
        console.log(sessionData)
        fetch('http://test.ru/getreports/' + JSON.stringify(sessionData), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res=>res.json()))
        .then((data) => {
            this.setState({items: data})
            console.log(data)
        })
    }    
    render() {
        return (
            <>
                <h2>Reports by users</h2>
                <li className="barside">
                    <div style={{width: '20%', fontSize: '14px'}}>Purpose</div>
                    <div style={{width: '38%', fontSize: '14px'}}>Comment</div>
                    <div style={{width: '10%', fontSize: '14px'}}>State</div>
                    <div onClick={this.order} style={{width: '15%', fontSize: '14px', cursor: 'pointer', backgroundColor: this.state.order ? 'limegreen' : 'lightgray'}}>Date&Time</div>
                    <div style={{width: '15%', border: 'none', fontSize: '14px'}}>Action</div>
                </li>
                <ul>
                    {this.state.items ?
                        this.state.items.map((item) => 
                        <li className="items" key={item.id}>
                            <div style={{width: '20%'}}>{item.purpose}</div>
                            <div style={{width: '38%'}}>{item.comment}</div>
                            <div style={{width: '10%'}}>{item.state}</div>
                            <div style={{width: '15%', fontSize: '12px'}}>{item.date + " " + item.time}</div>
                            <div style={{width: '15%'}}>
                                <a href={"http://test.ru/download/"+JSON.stringify(item.id)} name={item.id} style={{color: "greenyellow"}} download>&dArr;</a>
                                <button name={item.file_id} onClick={this.delete} style={{color: "red"}}>&#9746;</button>
                                <a name={item.id} onClick={this.accept} style={{color: "green"}}>&#10004;</a>
                                <a name={item.id} onClick={this.decline} style={{color: "red"}}>&#10008;</a>
                            </div>
                        </li>
                        )
                        : <li style={{listStyle: 'none', width: '100%', textAlign: 'center'}}><p>Nothing to show.</p></li>
                    }
                </ul>
            </>
        )
    }
}


export default MainPanel