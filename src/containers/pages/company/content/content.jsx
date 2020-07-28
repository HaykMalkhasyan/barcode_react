import React from 'react'
import PageContentItem from "./contentItem/contentItem";

const CompanyContent = props => {
    
    return (
        <>
            <PageContentItem
                url={process.env.PUBLIC_URL + 'images/company-1.png'}
                alt={'company-logo'}
                name={'Հայսել'}
                hvhh={'00832415'}
                bank={'"ՅՈՒՆԻՍՈՖԹ" ՍՊԸ'}
            />
            <PageContentItem
                url={process.env.PUBLIC_URL + 'images/company-2.png'}
                alt={'company-logo'}
                name={'Աբովյանի կրպակ'}
                hvhh={'0152426'}
                bank={'"ՄԱԿԻՉՅԱՆ ՔՈՆՍԱԼԹԻՆԳ" ՓԲԸ'}
            />
            <PageContentItem
                url={process.env.PUBLIC_URL + 'images/company-3.png'}
                alt={'company-logo'}
                name={'Անվանում'}
                hvhh={'ՀՎՀՀ'}
                bank={'Իրավաբանական անվանում'}
            />
        </>
    )
}

export default CompanyContent