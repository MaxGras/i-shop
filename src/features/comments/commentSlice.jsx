   import{ createEntityAdapter, createSlice, createAsyncThunk}  from '@reduxjs/toolkit'

const commentAdapt = createEntityAdapter({
    selectId: (products) => products.id
});

const initialState = commentAdapt.getInitialState({
    status:'idle',
    error: null
})

const commentSlice = createSlice({
    name:"comments",
    initialState,
    reducers:{
        deleteOneCM(state,action){
          
            const idDeleted = action.payload;
            commentAdapt.removeOne(state,idDeleted);
          
        },
        addOneCM(state,action){
           const newAdding = action.payload;
          
           commentAdapt.addOne(state , newAdding); 
        
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getProductsListCM.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getProductsListCM.fulfilled, (state, action) => {
                state.status = "succeeded"

                commentAdapt.upsertMany(state, action.payload)

            })
            .addCase(getProductsListCM.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error;
            })

    }
});

export const getProductsListCM = createAsyncThunk(
    'comment/fetchComment',
    async () => {
        const response = await fetch('http://localhost:3000/comments');
        const products = await response.json();
    
        return products;
    }
);

export default commentSlice.reducer;
export const {
    selectAll: selectAllComments,
    selectById: selectCommentById,
    selectIds: selectCommentIds

} = commentAdapt.getSelectors(state => state.comments);
export const {addOneCM,deleteOneCM} = commentSlice.actions