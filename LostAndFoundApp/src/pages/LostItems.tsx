import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Container, Grid, TextField, Autocomplete, Pagination, Collapse, IconButton, Alert } from '@mui/material';
import { itemService } from '../services/itemService';
import { Item } from '../models/Item';
import FoundItemCard from '../components/item/ItemCard';
import { CATEGORIES, LOCATIONS } from '../constants/common';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const LostItems: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Fetch items based on filters and pagination
    useEffect(() => {
        const getItems = async () => {
            setLoading(true);
            try {
                const { items: fetchedItems, totalPages } = await itemService.fetchLostItems({
                    locations,
                    categories,
                    page,
                });
                setItems(fetchedItems);
                setTotalPages(totalPages);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };
        getItems();
    }, [locations, categories, page]);

    return (
        <Container maxWidth="lg" sx={{ mt: 8, py: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Lost Items
            </Typography>

            {/* Descriptive Section */}
            <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4, px: 2 }}>
                Browse through items that have been reported as lost. Use the filters to narrow down the list by location or category, and find what you're looking for more efficiently.
            </Typography>

            {/* Toggle Button for Filters */}
            <Box textAlign="center" mb={3}>
                <IconButton onClick={() => setFiltersOpen(!filtersOpen)} aria-label="toggle filters">
                    <FilterListIcon color="primary" />
                    {filtersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <Typography variant="h6" color="text.secondary" display="inline" sx={{ ml: 1 }}>
                    Filters
                </Typography>
            </Box>

            {/* Collapsible Filters Section */}
            <Collapse in={filtersOpen}>
                <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" mb={4}>
                    <Autocomplete
                        multiple
                        options={LOCATIONS}
                        value={locations}
                        onChange={(event, newValue) => setLocations(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Filter by Location" variant="outlined" />
                        )}
                        sx={{ minWidth: 200, maxWidth: 300 }}
                    />
                    <Autocomplete
                        multiple
                        options={CATEGORIES}
                        value={categories}
                        onChange={(event, newValue) => setCategories(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Filter by Category" variant="outlined" />
                        )}
                        sx={{ minWidth: 200, maxWidth: 300 }}
                    />
                </Box>
            </Collapse>
            
             {/* Display Count and Instructions */}
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
            ) : (
                <>
                    {items.length > 0 ? (
                        <Grid container spacing={4}>
                            {items.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item._id}>
                                    <FoundItemCard item={item} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Alert severity="info" sx={{ mt: 4 }}>
                            No items found. Try adjusting the filters or check back later for new listings.
                        </Alert>
                    )}

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
            )}
        </Container>
    );
};

export default LostItems;
