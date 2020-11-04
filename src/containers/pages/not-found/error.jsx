import React, {useState} from 'react'
import classes from './error.module.css'
import NotFoundHeader from "./not-found-header/not-found-header";
import CustomButton from "../../../components/UI/button/customButton/customButton";
import CachedIcon from '@material-ui/icons/Cached';
import CloseIcon from '@material-ui/icons/Close';

function createData() {

    return [
        [
            {id: 1, i: 0, j: 0, text: 1},
            {id: 2, i: 0, j: 1, text: 2},
            {id: 3, i: 0, j: 2, text: 3}
        ],
        [
            {id: 4, i: 1, j: 0, text: 4},
            {id: 5, i: 1, j: 1, text: 5},
            {id: 6, i: 1, j: 2, text: 6}
        ],
        [
            {id: 7, i: 2, j: 0, text: 7},
            {id: 8, i: 2, j: 1, text: 8},
            {id: 9, i: 2, j: 2, text: 0}
        ]
    ]
}

const Error = props => {
    const [game, setGame] = useState(false);
    const [select, setSelect] = useState(null);
    const [data, setData] = useState(createData());

    const selectHandler = (i, j) => {
        setSelect({i: i, j: j})
    }

    const changeHandler = (i, j) => {
        if (select !== null && ((select.i === i && Math.abs(select.j - j) === 1) || (select.j === j && Math.abs(select.i - i) === 1))) {
            const change_data = [...data];
            let change_item = change_data[select.i][select.j];
            change_item.i = i;
            change_item.j = j;
            let select_item = change_data[i][j];
            select_item.i = select.i;
            select_item.j = select.j;
            change_data[select.i][select.j] = select_item;
            change_data[i][j] = change_item;
            setData(change_data)
            setSelect(null)
        }
    }

    const startHandler = () => {
        const random_data = [...data]
        random_data.sort(() => {
            return Math.random() - 0.5;
        })
        random_data.map(
            item => {

                return item.sort(() => {
                    return Math.random() - 0.5;
                })
            }
        )
        setData(random_data)
        setGame(true)
    }

    const endHandler = () => {
        setGame(false)
        setSelect(null)
        setData(createData())
    }

    return (
        <>
            <NotFoundHeader/>
            <div className={classes.errorPage}>
                <div className={classes.gameWindow}>
                    {
                        game ?
                            <div className={classes.controllers}>
                                <CustomButton
                                    className={classes.controllersButton}
                                    children={<CachedIcon/>}
                                    onClick={startHandler}
                                />
                                <CustomButton
                                    className={classes.controllersButton}
                                    children={<CloseIcon/>}
                                    onClick={endHandler}
                                />
                            </div>
                            :
                            null
                    }
                    {
                        !game ?
                            <div className={classes.gameButtonWindow}>
                                <CustomButton
                                    className={classes.gameButton}
                                    children={"Start"}
                                    onClick={startHandler}
                                />
                            </div>
                            :
                            null
                    }
                    {
                        data.map(
                            (item, i) => {

                                return item.map(
                                    (elem, j) => {

                                        return elem.text !== 0 ?
                                            <div
                                                key={elem.id}
                                                className={`${classes.gameItem} ${select && select.i === i && select.j === j ? classes.elemActive : ''}`}
                                                onClick={() => {
                                                    selectHandler(i, j)
                                                }}
                                            >
                                                {elem.text}
                                            </div>
                                            :
                                            <div
                                                key={elem.id}
                                                className={`${classes.gameItem} ${classes.emptyItem}`}
                                                onClick={() => {
                                                    changeHandler(i, j)
                                                }}
                                            />
                                    }
                                )
                            }
                        )
                    }
                </div>
                <div>
                    <div className={classes.puzzle}>
                        <img
                            src="https://cdn.iconscout.com/icon/free/png-256/page-not-found-5-530376.png"
                            alt="puzzle"
                        />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Error