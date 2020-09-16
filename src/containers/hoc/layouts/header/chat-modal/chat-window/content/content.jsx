import React from 'react';
import classes from './content.module.css';
import MessageIn from "./message-in/message-in";
import MessageOut from "./message-out/message-out";

const Content = props => {

    const data = [
        {id: 1, type: 'in', time: '11:05', message: 'Բարև Ձեզ'},
        {id: 2, type: 'in', time: '11:05', message: 'Ինրպես եք, Ձեր դիմումը հասել է'},
        {id: 3, type: 'in', time: '11:05', message: 'Սկսած 1500-ականներից` Lorem Ipsum-ը հանդիսացել է տպագրական արդյունաբերության ստանդարտ մոդելային տեքստ, ինչը մի անհայտ տպագրիչի կողմից տարբեր տառատեսակների օրինակների գիրք ստեղծելու ջանքերի արդյունք է:'},
        {id: 4, type: 'out', time: '11:05', message: 'Բարև Ձեզ'},
        {id: 5, type: 'out', time: '11:05', message: 'Ինրպես եք, Ձեր դիմումը հասել է'},
        {id: 6, type: 'in', time: '11:05', message: 'Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության համար նախատեսված մոդելային տեքստ է:'},
        {id: 7, type: 'out', time: '11:05', message: 'Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության համար նախատեսված մոդելային տեքստ է:'},
        {id: 8, type: 'out', time: '11:05', message: 'Սկսած 1500-ականներից` Lorem Ipsum-ը հանդիսացել է տպագրական արդյունաբերության ստանդարտ մոդելային տեքստ, ինչը մի անհայտ տպագրիչի կողմից տարբեր տառատեսակների օրինակների գիրք ստեղծելու ջանքերի արդյունք է:'},
        {id: 9, type: 'in', time: '11:05', message: 'Բարև Ձեզ'},
        {id: 10, type: 'in', time: '11:05', message: 'Ինրպես եք, Ձեր դիմումը հասել է'},
        {id: 11, type: 'in', time: '11:05', message: 'Սկսած 1500-ականներից` Lorem Ipsum-ը հանդիսացել է տպագրական արդյունաբերության ստանդարտ մոդելային տեքստ, ինչը մի անհայտ տպագրիչի կողմից տարբեր տառատեսակների օրինակների գիրք ստեղծելու ջանքերի արդյունք է:'},
        {id: 12, type: 'out', time: '11:05', message: 'Բարև Ձեզ'},
        {id: 13, type: 'out', time: '11:05', message: 'Ինրպես եք, Ձեր դիմումը հասել է'},
        {id: 14, type: 'in', time: '11:05', message: 'Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության համար նախատեսված մոդելային տեքստ է:'},
        {id: 15, type: 'out', time: '11:05', message: 'Lorem Ipsum-ը տպագրության և տպագրական արդյունաբերության համար նախատեսված մոդելային տեքստ է:'},
        {id: 16, type: 'out', time: '11:05', message: 'Սկսած 1500-ականներից` Lorem Ipsum-ը հանդիսացել է տպագրական արդյունաբերության ստանդարտ մոդելային տեքստ, ինչը մի անհայտ տպագրիչի կողմից տարբեր տառատեսակների օրինակների գիրք ստեղծելու ջանքերի արդյունք է:'},
    ];

    const messageRender = (item, index) => {

        switch (item.type) {
            case 'in':
                return (
                    <div key={'chat-' + item.id}>
                        <MessageIn
                            className={classes.messageWindow/*classRender(index, item.type).join(' ')*/}
                            time={item.time}
                            message={item.message}
                        />
                    </div>
                );
            case 'out':
                return (
                    <div key={'chat-' + item.id}>
                        <MessageOut
                            className={classes.messageWindowOut/*classRender(index, item.type).join(' ')*/}
                            time={item.time}
                            message={item.message}
                        />
                    </div>
                );
            default:
                return
        }
    };

    return (
        <section className={classes.content}>
            {
                data && data.length ?
                    data.map(
                        (item, index) => {

                            return messageRender(item, index)
                        }
                    )
                    :
                    null
            }
        </section>
    )
};

export default Content;