import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'


export default function FormulatedItem() {
    const history = useHistory()
    const location = useLocation()
    return (
        <div style={{padding:"144px 18px 8px"}} >
            {location.pathname}
        </div>
    )
}
