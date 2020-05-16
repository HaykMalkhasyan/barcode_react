import React from "react";
import {CardFooter} from "reactstrap";
import ButtonUi from "../../../../components/buttons/buttonUi";
import BackupIcon from '@material-ui/icons/Backup';
import Translate from "../../../../Translate";

const FooterComponent = props => {

    return (
        <CardFooter>
            <span
                className='pull-right'
            >
                <ButtonUi
                    width={'auto'}
                    height={'auto'}
                    color={'primary'}
                    padding={'5px 15px'}
                    variant={'outlined'}
                    onClick={() => props.checkFormValidate()}
                >
                    <BackupIcon
                        className='mr-1'
                    />
                    <Translate name={'Upload'}/>
                </ButtonUi>
            </span>
        </CardFooter>
    )
}

export default FooterComponent