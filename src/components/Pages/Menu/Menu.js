import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../../store/actions/actions'

import Spinner from '../../UI/Spinner/Spinner'
import Item from './Category/Item.js/Item' 
import Sidebar from './Sidebar/Sidebar.js'
import PageTitle from '../../UI/PageTitle/PageTitle'
import ErrorDisplay from '../../Util/ErrorDisplay/ErrorDisplay'

import commonStyle from '../../../static/style/common.module.css'

function Menu(props) {
    const { menu, error, isLoading, initMenu } = props
    const [list, setList] = useState([])
    const [currentFil, setCurrentFil] = useState('all')
    const [filterlist, setFilterList] = useState([])
    console.log(props)
    useEffect(() => {
        if (menu.length === 0) { initMenu() }
    }, [initMenu, menu])
    useEffect(() => {
        let li = []
        for(let i=0; i< menu.length; i++ ){
            li = [...li, ...menu[i].items] 
        }
        setList(li)
        setFilterList(li)
    },[menu])
    const display = filterlist.map(item => <Item
        key={item.id}
        name={item.name}
        desc={item.desc}
        price={item.price}
        imgLink={item.img}
        id={item.id}
    />)
    const filter = (fil) => {
        if(fil === 'all') {
            setCurrentFil('all')
            setFilterList(list)
        }
        else {
            let fl = menu.filter(m => m.name === fil) 
            setCurrentFil(fil)
            setFilterList(fl[0].items)
        }
    }

    return (
        <>
            <div className={`container mt-5 pt-2 ${commonStyle.PageBody}`}>
                <PageTitle>
                    Menu
                </PageTitle>
                <div className="row">
                    <div className="col-lg-2 mb-5">
                        {/* <Cart /> */}
                        <Sidebar currentFil={currentFil} filter={(fil) => filter(fil)}/>
                    </div>
                    <div className="col-lg-10">
                        {error ?
                            <ErrorDisplay>
                                {error}
                            </ErrorDisplay>
                            : isLoading ?
                                <Spinner />
                                : display}
                    </div>
                </div>
            </div>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu)