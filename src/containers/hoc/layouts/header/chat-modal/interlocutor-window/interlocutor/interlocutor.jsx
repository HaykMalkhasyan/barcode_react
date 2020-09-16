import React, {useState} from 'react'
import classes from './interlocutor.module.css'
import Item from "./item/item";

const Interlocutor = props => {
    const [scrollTop, setScrollTop] = useState(false);
    const [scrollBottom, setScrollBottom] = useState(true);

    const scrollHandler = event => {
        if (event.target.scrollTop + event.target.offsetHeight === event.target.scrollHeight) {
            setScrollBottom(false)
        } else {
            setScrollBottom(true)
        }

        if (event.target.scrollTop === 0) {
            setScrollTop(false)
        } else {
            setScrollTop(true)
        }
    };

    return (
        <div className={`${classes.interlocutor} ${scrollTop ? classes.topShadow : ''} ${scrollBottom ? classes.bottomShadow : ''}`}>
            <div className={classes.interlocutorList} onScroll={scrollHandler}>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={true}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
                <div className={classes.item}>
                    <Item
                        active={false}
                        owner={'Անուն Ազգանուն'}
                        status={
                            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ducimus eligendi explicabo minima praesentium voluptate! Architecto deserunt enim illo, labore laborum, nam natus non obcaecati odit quia, quis reprehenderit voluptatem?'
                        }
                    />
                </div>
            </div>
        </div>
    )
};

export default Interlocutor;