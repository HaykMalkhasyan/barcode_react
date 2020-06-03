import React from 'react'
import { Chart } from 'react-charts'
import Translate from "../../../../Translate";

function MyChart() {
    const data = React.useMemo(
        () => [
            {
                label: <Translate name={`Menu`}/>,
                data: [['', 9]]
            },
            {
                label: <Translate name={`Products`}/>,
                data: [['', 42]]
            },
            {
                label: <Translate name={'Groups'}/>,
                data: [['', 2]]
            },
            {
                label: <Translate name={'Subgroups'}/>,
                data: [['', 14]]
            },
            {
                label: <Translate name={'Users'}/>,
                data: [['', 10]]
            },
            {
                label: <Translate name={'AmWord'}/>,
                data: [['', 49]]
            },
            {
                label: <Translate name={'RuWord'}/>,
                data: [['', 30]]
            },
            {
                label: <Translate name={'EnWord'}/>,
                data: [['', 3]]
            }
        ],
        []
    )

    const series = React.useMemo(
        () => ({
            type: 'bar'
        }),
        []
    )

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'ordinal', position: 'bottom' },
            { position: 'right', type: 'linear', stacked: false }
        ],
        []
    )

    return (
        // A react-chart hyper-responsively and continuusly fills the available
        // space of its parent element automatically
        <div
            style={{
                width: '100%',
                height: '300px',
                position: 'relative',
                zIndex: 10
            }}
        >
            <Chart data={data} series={series} axes={axes} tooltip />
        </div>
    )
}

export default MyChart