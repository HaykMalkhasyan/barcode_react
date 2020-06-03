import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Translate from "../../Translate";
import cls from './tableUi.module.css'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        width: '100%'
    },
});

export default function CustomizedTables(props) {
    const classes = useStyles();

    return (
        <TableContainer
            className={cls.table}
        >
            <Table stickyHeader  className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell style={{background: 'rgb(119, 123, 243)'}}><Translate name={'name'}/></StyledTableCell>
                        <StyledTableCell align="right" style={{background: 'rgb(119, 123, 243)'}}><Translate name={'value'}/></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.data ?
                            props.data.map(
                                row => (
                                    <StyledTableRow key={row.id}>
                                        <StyledTableCell align="left">{row.name}</StyledTableCell>
                                        <StyledTableCell align="right">{row.value}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            )
                            :
                            <StyledTableRow>
                                <StyledTableCell align="left"><Translate name={'empty'}/></StyledTableCell>
                                <StyledTableCell align="right"></StyledTableCell>
                            </StyledTableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
