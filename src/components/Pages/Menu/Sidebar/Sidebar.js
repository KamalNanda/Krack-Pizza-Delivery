import React from 'react'
import './style.css'
import { connect } from 'react-redux'

import * as actions from '../../../../store/actions/actions'

function Sidebar(props){
    const { menu, initMenu } = props

    React.useEffect(() => {
        if (menu.length === 0) { initMenu() }
    }, [initMenu, menu])

    return(
        <div className="side-bar">
            {
                menu.length!== 0 
                    ? <p style={{ borderBottom : props.currentFil === 'all' ? '2px solid blue' : ''}} onClick={() => props.filter("all")}>All Category</p>
                    : <></>
            } 
            {
                menu.map((m,i) => {
                    return <p  style={{ borderBottom : props.currentFil === m.name ? '2px solid blue' : ''}} onClick={() => props.filter(m.name)} key={i}>{m.name}</p>
                })
            }
        </div>
    )
}
const mapStateToProps = state => ({
    menu: state.menu.menu,
    isLoading: state.menu.isLoading,
    error: state.menu.error
})

const mapDispatchToProps = dispatch => ({
    initMenu: () => dispatch(actions.initMenu())
})
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)