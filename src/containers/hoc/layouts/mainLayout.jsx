import React from 'react'
import Header from "./header/header"

const MainLayout = props => {

    return (
        <div>
            <Header/>
            <main>
                {props.children}
            </main>
        </div>
    )
};

export default MainLayout