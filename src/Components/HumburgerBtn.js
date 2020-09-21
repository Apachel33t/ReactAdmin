import React, {Component} from 'react'


class HumburgerBtn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            btnIsActive: true
        }

        this.activeBtn = this.activeBtn.bind(this)
    }

    activeBtn() {
        this.setState({btnIsActive: !this.state.btnIsActive})
        this.props.click({btnIsActive: this.state.btnIsActive})
    }

    render() {
        return (
            <>
                <div className={this.state.btnIsActive ? "btn":"change btn"} onClick={this.activeBtn}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
            </>
        )
    }
}


export default HumburgerBtn