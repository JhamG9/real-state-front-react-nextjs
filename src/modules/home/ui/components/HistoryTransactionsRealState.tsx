import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { PropertyTrace } from '../../domain/entities/property';
import {
    CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { formatDate, formatPrice } from '../../../../shared/utils';

interface HistoryTransactionsRealStateProps {
    transactions: PropertyTrace[];
}

export const HistoryTransactionsRealState = ({ transactions }: HistoryTransactionsRealStateProps) => {
    return (
        <>
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                Transacciones
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column' }, gap: 3 }}>
                {transactions?.map((trace, index) => (
                    <Box key={index} sx={{ flex: 1, minWidth: 250 }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <CalendarIcon sx={{ fontSize: 16, mr: 1, color: 'grey.600' }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {formatDate(new Date(trace.dateSale))}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {trace.name}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    Valor: {formatPrice(trace.value)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Impuesto: {formatPrice(trace.tax)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </>

    )
}
