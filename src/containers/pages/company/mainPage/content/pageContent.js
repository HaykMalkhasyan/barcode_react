import React from "react";
import cls from './pageContent.module.css';
import PageContentItem from "./pageContentItem/pageContentItem";

const PageContent = props => {

    return (
        <div className={cls.pageContent}>
            <PageContentItem
                url={process.env.PUBLIC_URL + 'company-1.png'}
                alt={'company-logo'}
                name={'Հայսել'}
                hvhh={'00832415'}
                bank={'"ՅՈՒՆԻՍՈՖԹ" ՍՊԸ'}
            />
            <PageContentItem
                url={process.env.PUBLIC_URL + 'company-2.png'}
                alt={'company-logo'}
                name={'Աբովյանի կրպակ'}
                hvhh={'0152426'}
                bank={'"ՄԱԿԻՉՅԱՆ ՔՈՆՍԱԼԹԻՆԳ" ՓԲԸ'}
            />
            <PageContentItem
                url={process.env.PUBLIC_URL + 'company-3.png'}
                alt={'company-logo'}
                name={'Անվանում'}
                hvhh={'ՀՎՀՀ'}
                bank={'Իրավաբանական անվանում'}
            />
        </div>
    )
}

export default PageContent