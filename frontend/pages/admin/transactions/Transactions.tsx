import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TransactionsTable from 'components/admin/transactions/TransactionsTable'

interface TransactionType{
    id: number
    username:string
    email:string
    course:string
    fees:string
    createdAt:string
}

interface TransactionProps{
    accessToken: string
}

const Transactions: React.FC<TransactionProps>= ({accessToken}) => {


    const [transactions, setTransactions]= useState<TransactionType | any>(null)

    const retrieveTransactions= () => {
        API({
            method: 'GET',
            url: '/transaction',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                userType: 'admin'
            }
        })
        .then( response => {
            console.log(response.data)
            setTransactions(response.data)

        })
        .catch (err => {
            console.log('Error')
        })
    }

    useEffect( () => {
        retrieveTransactions()
    }, [])


    return (
        <Container maxWidth="xl">

            <Box mb={10} mt={5}>
                <Typography variant="h4" color="primary">Transactions</Typography>
            </Box>

            {
                transactions && transactions.length > 0 ? (
                    <TransactionsTable transactions={transactions} />
                ) : null
            }

        </Container>
    )
}

export default Transactions
