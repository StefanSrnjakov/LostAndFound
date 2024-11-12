import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Container, Grid, Pagination } from '@mui/material';
import { itemService } from '../services/itemService';
import { Item } from '../models/Item';
import MyItemCard from '../components/item/MyItemCard';

const MyItems: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch items based on filters and pagination
    useEffect(() => {
        const getItems = async () => {
            setLoading(true);
            try {
                const { items: fetchedItems, totalPages } = await itemService.fetchItemsByUser({ page });
                setItems(fetchedItems);
                setTotalPages(totalPages);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };

        getItems();
    }, [page]);

    // Update item in state and call update service
    const onUpdateItem = async (itemId: string, updatedItem: Partial<Item>) => {
        try {
            const formData = new FormData();
            Object.entries(updatedItem).forEach(([key, value]) => {
                if (value !== null) {
                    if (value instanceof Date) {
                        formData.append(key, value.toISOString());
                    } else if (value instanceof File) {
                        formData.append(key, value);
                    } else {
                        formData.append(key, value as string);
                    }
                }
            });
            const updatedData = await itemService.updateItem(itemId, formData);
            setItems((prevItems) =>
                prevItems.map((item) => (item._id === itemId ? { ...item, ...updatedData } : item))
            );
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };
    
    return (
        <Container maxWidth="lg" sx={{ mt: 8, py: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h4" align="center" gutterBottom>
                My Items
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                Here, you can view and manage all the items you've reported as lost or found. Use the pagination to browse through your collection, and click on an item to update its details.
            </Typography>

            {!loading && (
                <Box textAlign="center" color="text.secondary" mb={4}>
                    <Typography variant="body1">
                        Showing {items.length} items{totalPages > 1 && ` on page ${page} of ${totalPages}`}
                    </Typography>
                </Box>
            )}
            {/* Items Grid */}
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : items.length > 0 ? (
                <>
                    <Grid container spacing={4}>
                        {items.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item._id}>
                                <MyItemCard item={item} onUpdate={onUpdateItem} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination Control */}
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(event, value) => setPage(value)}
                            color="primary"
                        />
                    </Box>
                </>
            ) : (
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
                    You currently have no items listed. Use the "Report Lost Item" button on the home page to add your first item.
                </Typography>
            )}
        </Container>
    );
};

export default MyItems;
